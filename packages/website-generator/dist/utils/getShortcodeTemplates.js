"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortcodeTemplates = void 0;
const path_1 = __importDefault(require("path"));
const findFiles_1 = require("./findFiles");
const readFile_1 = require("./readFile");
const constants_1 = require("../config/constants");
const getShortcodeTemplates = async () => {
    const shortcodeTemplates = (0, findFiles_1.findFiles)(constants_1.DIRECTORIES.SHORTCODES, {
        match: /^.*\.hbs/,
    });
    return Promise.all(shortcodeTemplates.map(async (file) => {
        const name = path_1.default.parse(file).name;
        const template = `${constants_1.DIRECTORIES.SHORTCODES}${name}.hbs`;
        try {
            return {
                template: (await (0, readFile_1.readFile)(template)),
                name,
            };
        }
        catch (error) {
            throw new Error('Shortcode template file does not exist.');
        }
    }));
};
exports.getShortcodeTemplates = getShortcodeTemplates;
//# sourceMappingURL=getShortcodeTemplates.js.map