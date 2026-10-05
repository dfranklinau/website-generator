"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentOutputURL = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("../config/constants");
const getContentOutputPath_1 = require("./getContentOutputPath");
const getContentOutputURL = (filePath, section) => {
    const contentOutputPath = (0, getContentOutputPath_1.getContentOutputPath)(filePath, section);
    return contentOutputPath
        .replace(path_1.default.normalize(constants_1.DIRECTORIES.BUILD), '/')
        .replace('index.html', '');
};
exports.getContentOutputURL = getContentOutputURL;
//# sourceMappingURL=getContentOutputURL.js.map