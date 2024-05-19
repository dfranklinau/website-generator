"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const constants_1 = require("./config/constants");
const MarkdownParser_1 = require("./MarkdownParser");
const Renderer_1 = require("./Renderer");
const cleanDirectory_1 = require("./utils/cleanDirectory");
const generateContent_1 = require("./generateContent");
const generateErrorDocuments_1 = require("./generateErrorDocuments");
const generateStaticFiles_1 = require("./generateStaticFiles");
const generateAssets_1 = require("./generateAssets");
const getHelpers_1 = require("./utils/getHelpers");
const getPartialTemplates_1 = require("./utils/getPartialTemplates");
const getShortcodeTemplates_1 = require("./utils/getShortcodeTemplates");
const getWebsiteGeneratorConfig_1 = require("./utils/getWebsiteGeneratorConfig");
const readFile_1 = require("./utils/readFile");
const generate = async () => {
    (0, cleanDirectory_1.cleanDirectory)(constants_1.DIRECTORIES.BUILD);
    const config = await (0, getWebsiteGeneratorConfig_1.getWebsiteGeneratorConfig)();
    const baseTemplate = (await (0, readFile_1.readFile)('./templates/_base.hbs', ''));
    const helpers = (0, getHelpers_1.getHelpers)();
    const partials = await (0, getPartialTemplates_1.getPartialTemplates)();
    const shortcodes = await (0, getShortcodeTemplates_1.getShortcodeTemplates)();
    const renderer = new Renderer_1.Renderer({
        baseTemplate,
        config,
        helpers,
        partials,
    });
    const markdownParser = new MarkdownParser_1.MarkdownParser(renderer, shortcodes);
    await (0, generateContent_1.generateContent)({ markdownParser, renderer });
    await (0, generateErrorDocuments_1.generateErrorDocuments)({ config, renderer });
    (0, generateStaticFiles_1.generateStaticFiles)();
    await (0, generateAssets_1.generateAssets)();
};
exports.generate = generate;
//# sourceMappingURL=generate.js.map