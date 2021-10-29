"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const MarkdownParser_1 = require("./MarkdownParser");
const Renderer_1 = require("./Renderer");
const _fixtures_1 = require("./_fixtures");
tape_1.default('`MarkdownParser`', (t) => {
    const renderer = new Renderer_1.Renderer({ baseTemplate: '', config: {}, partials: {} });
    const markdownParser = new MarkdownParser_1.MarkdownParser(renderer, _fixtures_1.mockShortcodes);
    t.test('`MarkdownParser.getOptions`', (t) => {
        t.deepEqual(markdownParser.getOptions(_fixtures_1.mockMarkdown, {
            menu: {
                name: 'main',
                order: 1,
            },
            toc: true,
            url: 'url',
        }), {
            menu: {
                name: 'main',
                order: 1,
            },
            toc: '<ol>\n<li><a href="#heading">Heading</a>\n<ol>\n<li><a href="#heading-1">Heading</a></li>\n</ol></li>\n</ol>',
            url: 'url',
        }, 'parses front-matter containing all supported options');
        t.deepEqual(markdownParser.getOptions(_fixtures_1.mockMarkdown, {
            menu: {
                name: 'main',
            },
        }), {
            menu: {
                name: 'main',
                order: null,
            },
            toc: false,
            url: false,
        }, 'parses front-matter containing an incomplete menu declaration');
        t.deepEqual(markdownParser.getOptions(_fixtures_1.mockMarkdown, {
            url: '/',
        }), {
            menu: false,
            toc: false,
            url: '/',
        }, 'parses front-matter containing a URL removal');
        t.deepEqual(markdownParser.getOptions(_fixtures_1.mockMarkdown, {
            url: '/replacement/',
        }), {
            menu: false,
            toc: false,
            url: 'replacement',
        }, 'parses front-matter containing a URL replacement, removing any slashes');
        t.deepEqual(markdownParser.getOptions(_fixtures_1.mockMarkdown, {}), {
            menu: false,
            toc: false,
            url: false,
        }, 'parses front-matter containing no supported options');
        t.end();
    });
    t.test('`MarkdownParser.parse`', (t) => {
        const parsed = markdownParser.parse(_fixtures_1.mockMarkdown);
        /**
         * @TODO: the table of content's anchors will not match the auto-generated
         * IDs on duplicate headings (this is due to the ID generation in
         * `heading_open` not being aware of other headings).
         */
        t.equal(parsed.content, `<h2 id="heading">Heading</h2>\n<p>This is some Markdown content.</p>\n<h3 id="heading">Heading</h3>\n<p>There are a few Markdown elements in here:</p>\n<ul>\n<li>such</li>\n<li>as</li>\n<li>lists</li>\n</ul>`, 'parses the contents of a Markdown file');
        t.equal(parsed.matter.title, 'Markdown Title', 'parses a string from a file with front-matter');
        t.equal(parsed.matter.date, '1979-05-27', 'parses a date from a file with front-matter');
        t.equal(parsed.matter.toc, true, 'parses a boolean from a file with front-matter');
        t.deepEqual(parsed.options, {
            menu: false,
            toc: '<ol>\n<li><a href="#heading">Heading</a>\n<ol>\n<li><a href="#heading-1">Heading</a></li>\n</ol></li>\n</ol>',
            url: false,
        }, 'generates an `options` object containing data for special properties');
        t.end();
    });
    t.end();
});
