"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const fs_1 = __importDefault(require("fs"));
const postcss_1 = __importDefault(require("postcss"));
const MarkdownParser_1 = require("./MarkdownParser");
const Renderer_1 = require("./Renderer");
const config_1 = require("./config");
const copyFiles_1 = require("./utils/copyFiles");
const findFiles_1 = require("./utils/findFiles");
const getPartialTemplates_1 = require("./utils/getPartialTemplates");
const formatOutputFilePath_1 = require("./utils/formatOutputFilePath");
const readFile_1 = require("./utils/readFile");
const getShortcodeTemplates_1 = require("./utils/getShortcodeTemplates");
const saveContentToFile_1 = require("./utils/saveContentToFile");
const parseContent_1 = require("./parseContent");
const prepareContent_1 = require("./prepareContent");
const renderContent_1 = require("./renderContent");
async function generateContent(props) {
    const { markdownParser, renderer } = props;
    const parsedContent = await parseContent_1.parseContent({
        directory: config_1.config.DIRECTORIES.CONTENT,
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
    const cssFiles = findFiles_1.findFiles(config_1.config.DIRECTORIES.ASSETS, {
        match: /\.css$/,
        recursive: true,
    });
    cssFiles.forEach(async (cssFile) => {
        const outputCssFile = formatOutputFilePath_1.formatOutputFilePath(cssFile, config_1.config.DIRECTORIES.BUILD);
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
    const staticFiles = findFiles_1.findFiles(config_1.config.DIRECTORIES.STATIC, { recursive: true });
    copyFiles_1.copyFiles(staticFiles, config_1.config.DIRECTORIES.BUILD);
}
async function generate404(props) {
    const { renderer } = props;
    const templateFile = `${config_1.config.DIRECTORIES.TEMPLATES}_404.hbs`;
    const content = (await readFile_1.readFile(templateFile));
    fs_1.default.writeFileSync(`${config_1.config.DIRECTORIES.BUILD}404.html`, renderer.render({
        content,
    }));
}
function clean() {
    fs_1.default.rmdirSync(config_1.config.DIRECTORIES.BUILD, { recursive: true });
    fs_1.default.mkdirSync(config_1.config.DIRECTORIES.BUILD);
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
    await generate404({ renderer });
    await generateStatic();
    await generateAssets();
};
exports.generate = generate;
