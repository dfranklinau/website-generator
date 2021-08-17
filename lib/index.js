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
const copyFiles_1 = require("./utils/copyFiles");
const findFiles_1 = require("./utils/findFiles");
const formatOutputFilePath_1 = require("./utils/formatOutputFilePath");
const getPartialTemplates_1 = require("./utils/getPartialTemplates");
const getShortcodeTemplates_1 = require("./utils/getShortcodeTemplates");
const parseContent_1 = require("./parseContent");
const prepareContent_1 = require("./prepareContent");
const readFile_1 = require("./utils/readFile");
const renderContent_1 = require("./renderContent");
const saveContentToFile_1 = require("./utils/saveContentToFile");
async function generateContent(props) {
    const { markdownParser, renderer } = props;
    const parsedContent = await parseContent_1.parseContent({
        directory: constants_1.DIRECTORIES.CONTENT,
        markdownParser,
        renderer,
    });
    renderContent_1.renderContent({
        content: prepareContent_1.prepareContent({ content: parsedContent }).tree,
        globalMatter: {
            menus: {},
        },
        renderer,
    });
}
async function generateAssets() {
    const cssFiles = findFiles_1.findFiles(constants_1.DIRECTORIES.ASSETS, {
        match: /\.css$/,
        recursive: true,
    });
    cssFiles.forEach(async (cssFile) => {
        const outputCssFile = formatOutputFilePath_1.formatOutputFilePath(cssFile, constants_1.DIRECTORIES.BUILD);
        const data = (await readFile_1.readFile(cssFile));
        postcss_1.default([])
            .process(data, {
            from: cssFile,
            to: outputCssFile,
        })
            .then((result) => {
            saveContentToFile_1.saveContentToFile(result.css, outputCssFile);
        });
    });
}
function generateStatic() {
    const staticFiles = findFiles_1.findFiles(constants_1.DIRECTORIES.STATIC, {
        recursive: true,
    });
    copyFiles_1.copyFiles(staticFiles, constants_1.DIRECTORIES.BUILD);
}
async function generateErrorDocuments(props) {
    const { config, renderer } = props;
    const templateFile = `${constants_1.DIRECTORIES.TEMPLATES}_404.hbs`;
    const content = (await readFile_1.readFile(templateFile));
    fs_1.default.writeFileSync(`${constants_1.DIRECTORIES.BUILD}404.html`, renderer.render({
        content,
        head: {
            title: config.errorDocument404Title || '404',
        },
    }));
}
function clean() {
    fs_1.default.rmdirSync(constants_1.DIRECTORIES.BUILD, { recursive: true });
    fs_1.default.mkdirSync(constants_1.DIRECTORIES.BUILD);
}
const generate = async () => {
    clean();
    const config = (await readFile_1.readFile('./website-generator.config.json', {}, (data) => {
        try {
            return JSON.parse(data);
        }
        catch {
            return {};
        }
    }));
    const baseTemplate = (await readFile_1.readFile('./templates/_base.hbs', ''));
    const partials = await getPartialTemplates_1.getPartialTemplates();
    const shortcodes = await getShortcodeTemplates_1.getShortcodeTemplates();
    const renderer = new Renderer_1.Renderer({ baseTemplate, config, partials });
    const markdownParser = new MarkdownParser_1.MarkdownParser(renderer, shortcodes);
    await generateContent({ markdownParser, renderer });
    await generateErrorDocuments({ config, renderer });
    await generateStatic();
    await generateAssets();
};
exports.generate = generate;
