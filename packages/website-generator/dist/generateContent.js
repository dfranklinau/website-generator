"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContent = void 0;
const constants_1 = require("./config/constants");
const parseContent_1 = require("./parseContent");
const prepareContent_1 = require("./prepareContent");
const renderContent_1 = require("./renderContent");
async function generateContent(props) {
    const { markdownParser, renderer } = props;
    const parsedContent = await (0, parseContent_1.parseContent)({
        directory: constants_1.DIRECTORIES.CONTENT,
        markdownParser,
        renderer,
    });
    (0, renderContent_1.renderContent)({
        content: (0, prepareContent_1.prepareContent)({ content: parsedContent }).tree,
        globalMatter: {
            menus: {},
        },
        renderer,
    });
}
exports.generateContent = generateContent;
//# sourceMappingURL=generateContent.js.map