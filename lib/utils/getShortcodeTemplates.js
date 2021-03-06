"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortcodeTemplates = void 0;
const path_1 = __importDefault(require("path"));
const findFiles_1 = require("./findFiles");
const readFile_1 = require("./readFile");
const config_1 = require("../config");
const getShortcodeTemplates = async () => {
    const shortcodeTemplates = findFiles_1.findFiles(config_1.config.DIRECTORIES.SHORTCODES, {
        match: /^.*\.hbs/,
    });
    return Promise.all(shortcodeTemplates.map(async (file) => {
        const name = path_1.default.parse(file).name;
        const template = `${config_1.config.DIRECTORIES.SHORTCODES}${name}.hbs`;
        try {
            return {
                template: (await readFile_1.readFile(template)),
                name,
            };
        }
        catch (error) {
            throw new Error('Shortcode template file does not exist.');
        }
    }));
};
exports.getShortcodeTemplates = getShortcodeTemplates;
