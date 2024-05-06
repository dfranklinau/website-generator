"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const fs_1 = __importDefault(require("fs"));
const postcss_1 = __importDefault(require("postcss"));
const constants_1 = require("./config/constants");
const MarkdownParser_1 = require("./MarkdownParser");
const Renderer_1 = require("./Renderer");
const cleanDirectory_1 = require("./utils/cleanDirectory");
const copyFiles_1 = require("./utils/copyFiles");
const findFiles_1 = require("./utils/findFiles");
const formatOutputFilePath_1 = require("./utils/formatOutputFilePath");
const getHelpers_1 = require("./utils/getHelpers");
const getPartialTemplates_1 = require("./utils/getPartialTemplates");
const getShortcodeTemplates_1 = require("./utils/getShortcodeTemplates");
const parseContent_1 = require("./parseContent");
const prepareContent_1 = require("./prepareContent");
const readFile_1 = require("./utils/readFile");
const renderContent_1 = require("./renderContent");
const saveContentToFile_1 = require("./utils/saveContentToFile");
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
async function generateAssets() {
    const cssFiles = (0, findFiles_1.findFiles)(constants_1.DIRECTORIES.ASSETS, {
        match: /\.css$/,
        recursive: true,
    });
    cssFiles.forEach(async (cssFile) => {
        const outputCssFile = (0, formatOutputFilePath_1.formatOutputFilePath)(cssFile, constants_1.DIRECTORIES.BUILD);
        const data = (await (0, readFile_1.readFile)(cssFile));
        (0, postcss_1.default)([])
            .process(data, {
            from: cssFile,
            to: outputCssFile,
        })
            .then((result) => {
            (0, saveContentToFile_1.saveContentToFile)(result.css, outputCssFile);
        });
    });
}
function generateStatic() {
    const staticFiles = (0, findFiles_1.findFiles)(constants_1.DIRECTORIES.STATIC, {
        recursive: true,
    });
    (0, copyFiles_1.copyFiles)(staticFiles, constants_1.DIRECTORIES.BUILD);
}
async function generateErrorDocuments(props) {
    const { config, renderer } = props;
    const templateFile = `${constants_1.DIRECTORIES.TEMPLATES}_404.hbs`;
    const content = (await (0, readFile_1.readFile)(templateFile));
    fs_1.default.writeFileSync(`${constants_1.DIRECTORIES.BUILD}404.html`, renderer.render({
        content,
        head: {
            title: config.errorDocument404Title || '404',
        },
    }));
}
const generate = async () => {
    (0, cleanDirectory_1.cleanDirectory)(constants_1.DIRECTORIES.BUILD);
    const config = await (0, readFile_1.readFile)('./website-generator.config.json', '{}');
    let configJSON;
    try {
        if (config) {
            configJSON = JSON.parse(config);
        }
        else {
            configJSON = {};
        }
    }
    catch {
        configJSON = {};
    }
    const baseTemplate = (await (0, readFile_1.readFile)('./templates/_base.hbs', ''));
    const helpers = (0, getHelpers_1.getHelpers)();
    const partials = await (0, getPartialTemplates_1.getPartialTemplates)();
    const shortcodes = await (0, getShortcodeTemplates_1.getShortcodeTemplates)();
    const renderer = new Renderer_1.Renderer({
        baseTemplate,
        config: configJSON,
        helpers,
        partials,
    });
    const markdownParser = new MarkdownParser_1.MarkdownParser(renderer, shortcodes);
    await generateContent({ markdownParser, renderer });
    await generateErrorDocuments({ config: configJSON, renderer });
    await generateStatic();
    await generateAssets();
};
exports.generate = generate;
//# sourceMappingURL=index.js.map