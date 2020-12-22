"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentOutputURL = void 0;
const config_1 = require("../config");
const getContentOutputPath_1 = require("./getContentOutputPath");
const getContentOutputURL = (filePath, section) => {
    const contentOutputPath = getContentOutputPath_1.getContentOutputPath(filePath, section);
    return contentOutputPath
        .replace(config_1.config.DIRECTORIES.BUILD, '/')
        .replace('index.html', '');
};
exports.getContentOutputURL = getContentOutputURL;
