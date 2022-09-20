"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownParser = void 0;
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = __importDefault(require("jsdom"));
const remarkable_1 = require("remarkable");
const linkify_1 = require("remarkable/linkify");
const gray_matter_1 = __importDefault(require("gray-matter"));
const path_1 = __importDefault(require("path"));
const markdown_toc_1 = __importDefault(require("markdown-toc"));
const j_toml_1 = __importDefault(require("@ltd/j-toml"));
const removeTrailingSlash_1 = require("./utils/removeTrailingSlash");
const parseShortcodes_1 = require("./parseShortcodes");
const formatSectionUrl = (url) => {
    let formattedUrl = url;
    if (url === path_1.default.sep) {
        return formattedUrl;
    }
    if (url.charAt(0) === path_1.default.sep) {
        formattedUrl = formattedUrl.slice(1);
    }
    return (0, removeTrailingSlash_1.removeTrailingSlash)(formattedUrl);
};
class MarkdownParser {
    constructor(renderer, shortcodes) {
        const { JSDOM } = jsdom_1.default;
        this._md = new remarkable_1.Remarkable({ html: true });
        this._md.use(linkify_1.linkify);
        this._md.block.ruler.enable(['deflist']); // Enable the rendering of description lists in Markdown.
        this._md.use((remarkable) => {
            remarkable.renderer.rules.footnote_ref = (tokens, idx) => {
                const level = tokens[idx].level + 1;
                return `<sup><a id="fnref${level}" href="#fn${level}">${level}</a></sup>`;
            };
            /**
             * Override remarkable's `heading_open` rule to add an `id` attribute to
             * headings.
             */
            remarkable.renderer.rules.heading_open = (tokens, idx) => `<h${tokens[idx].hLevel} id="${markdown_toc_1.default.slugify(
            // @ts-expect-error the idx + 1 isn't a heading_open token.
            tokens[idx + 1].content)}">`;
        });
        this._renderer = renderer;
        this._shortcodes = shortcodes;
        this._window = new JSDOM('').window;
        // @ts-expect-error: Argument of type 'DOMWindow' is not assignable to parameter of type 'Window'.
        this._DOMPurify = (0, dompurify_1.default)(this._window);
    }
    getOptions(content, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data) {
        const options = {
            menu: false,
            toc: false,
            url: false,
        };
        if (!data) {
            return options;
        }
        if (typeof data.menu?.name === 'string') {
            options.menu = {
                name: data.menu.name,
                order: typeof data.menu.order === 'number' ? data.menu.order : null,
            };
        }
        if (typeof data.toc === 'boolean') {
            options.toc = this.parse((0, markdown_toc_1.default)(content, {
                bullets: ['1.'],
                maxdepth: 3,
            }).content.replace(/ {2}/g, '    ')).content;
        }
        if (typeof data.url === 'string') {
            options.url = formatSectionUrl(data.url);
        }
        return options;
    }
    parse(content) {
        const file = (0, gray_matter_1.default)(content, {
            delimiters: '+++',
            engines: {
                toml: (source) => {
                    try {
                        return j_toml_1.default.parse(source, 1.0, '\n');
                    }
                    catch {
                        throw new Error(`Invalid TOML: ${source}`);
                    }
                },
            },
            language: 'toml',
        });
        const prepared = this.prepare(file.content);
        const parsed = this._md.render(prepared).trim();
        const options = this.getOptions(file.content, file.data);
        return {
            content: this._DOMPurify.sanitize(parsed),
            matter: file.data,
            options,
        };
    }
    parseInline(content) {
        return this._md
            .renderInline(content, {
            headerIds: false,
        })
            .trim();
    }
    prepare(content) {
        if (!this._renderer) {
            return content;
        }
        let prepared = content;
        prepared = (0, parseShortcodes_1.parseShortcodes)({
            content: prepared,
            markdownParser: this,
            renderer: this._renderer,
            shortcodes: this._shortcodes,
        });
        /**
         * Remove any HTML indentation so that it isn't interpreted as indented code
         * blocks when parsed as Markdown.
         *
         * TODO: optimise this fix for HTML indentation to support tabs (or find
         * another fix).
         */
        return prepared.replace(/^[ ]{2,}/g, '');
    }
}
exports.MarkdownParser = MarkdownParser;
