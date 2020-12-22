"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const getContentTemplate = (template, directories) => {
    const section = directories.join(path_1.default.sep);
    const templatePath = section.length > 0
        ? `${config_1.config.DIRECTORIES.TEMPLATES}${section}${path_1.default.sep}${template}.hbs`
        : `${config_1.config.DIRECTORIES.TEMPLATES}${template}.hbs`;
    try {
        return fs_1.default.readFileSync(templatePath, 'utf8');
    }
    catch {
        if (directories.length > 0) {
            return exports.getContentTemplate(template, directories.slice(0, directories.length - 1));
        }
        return '';
    }
};
exports.getContentTemplate = getContentTemplate;
