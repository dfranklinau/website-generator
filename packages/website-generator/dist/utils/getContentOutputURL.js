"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentOutputURL = void 0;
const constants_1 = require("../config/constants");
const getContentOutputPath_1 = require("./getContentOutputPath");
const getContentOutputURL = (filePath, section) => {
    const contentOutputPath = (0, getContentOutputPath_1.getContentOutputPath)(filePath, section);
    return contentOutputPath
        .replace(constants_1.DIRECTORIES.BUILD, '/')
        .replace('index.html', '');
};
exports.getContentOutputURL = getContentOutputURL;
//# sourceMappingURL=getContentOutputURL.js.map