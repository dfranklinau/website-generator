"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../config/constants");
const getContentTemplate = (template, directories, filename) => {
    const section = directories.join(path_1.default.sep);
    const templatePath = section.length > 0
        ? `${constants_1.DIRECTORIES.TEMPLATES}${section}${path_1.default.sep}`
        : `${constants_1.DIRECTORIES.TEMPLATES}`;
    let content = null;
    if (template === 'index' && section.length === 0) {
        try {
            content = fs_1.default.readFileSync(`${templatePath}_index.${constants_1.EXTENSIONS.TEMPLATES}`, 'utf8');
        }
        catch {
            content = null;
        }
        if (!content) {
            try {
                content = fs_1.default.readFileSync(`${templatePath}section.${constants_1.EXTENSIONS.TEMPLATES}`, 'utf8');
            }
            catch {
                content = null;
            }
        }
    }
    else {
        if (template === "page" && filename) {
            try {
                content = fs_1.default.readFileSync(`${templatePath}${filename}.${constants_1.EXTENSIONS.TEMPLATES}`, 'utf8');
            }
            catch {
                content = null;
            }
        }
        if (!content) {
            try {
                content = fs_1.default.readFileSync(`${templatePath}${template}.${constants_1.EXTENSIONS.TEMPLATES}`, 'utf8') || null;
            }
            catch {
                content = null;
            }
        }
    }
    if (content) {
        return content;
    }
    if (directories.length > 0) {
        return (0, exports.getContentTemplate)(template, directories.slice(0, directories.length - 1), directories[directories.length - 1]);
    }
    return '';
};
exports.getContentTemplate = getContentTemplate;
