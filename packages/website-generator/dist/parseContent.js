"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseContent = void 0;
const fs_1 = __importDefault(require("fs"));
const readFile_1 = require("./utils/readFile");
const parseContent = async (props) => {
    const { directory, markdownParser, renderer, shortcodes } = props;
    const parsedContent = {
        assets: [],
        children: null,
        data: null,
        pages: [],
        section: null,
    };
    const files = await fs_1.default.promises.readdir(directory, {
        withFileTypes: true,
    });
    await Promise.all(files.map(async (item) => {
        const itemPath = `${directory}${item.name}`;
        if (item.isFile()) {
            if (item.name.match(/\.md$/)) {
                const data = (await (0, readFile_1.readFile)(`${directory}/${item.name}`, ''));
                const markdown = markdownParser.parse(data);
                const contentItem = {
                    markdown,
                    name: item.name,
                    filePath: itemPath,
                };
                if (!contentItem.markdown.matter.draft) {
                    if (item.name === '_index.md') {
                        parsedContent.section = contentItem;
                    }
                    else {
                        parsedContent.pages.push(contentItem);
                    }
                }
            }
            else if (item.name === '_data.json') {
                const data = (await (0, readFile_1.readFile)(`${directory}/${item.name}`, {}, (data) => JSON.parse(data)));
                try {
                    parsedContent.data = {
                        json: data,
                        filePath: itemPath,
                    };
                }
                catch {
                    throw new Error('Error parsing JSON data file.');
                }
            }
            else {
                parsedContent.assets.push({ filePath: itemPath });
            }
        }
        else if (item.isDirectory()) {
            if (parsedContent.children === null) {
                parsedContent.children = {};
            }
            const parsedChildContent = await (0, exports.parseContent)({
                directory: `${itemPath}/`,
                markdownParser,
                renderer,
                shortcodes,
            });
            parsedContent.children[item.name] = parsedChildContent;
        }
    }));
    return parsedContent;
};
exports.parseContent = parseContent;
//# sourceMappingURL=parseContent.js.map