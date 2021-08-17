"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentOutputPath = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("../config/constants");
const getContentOutputPath = (filePath, section) => {
    let rewritePath = filePath;
    if (typeof section?.markdown.options.url === 'string' &&
        section.markdown.options.url.length > 0) {
        // Convert `./content/directory/page` to `directory/page`.
        const sectionPath = path_1.default
            .parse(section.filePath)
            .dir.split(path_1.default.sep)
            .slice(2)
            .join(path_1.default.sep);
        if (section.markdown.options.url === '/') {
            rewritePath = filePath.replace(`/${sectionPath}/`, '/');
        }
        else {
            rewritePath = filePath.replace(`/${sectionPath}/`, `/${section.markdown.options.url}/`);
        }
    }
    rewritePath = rewritePath
        .replace(constants_1.DIRECTORIES.CONTENT, constants_1.DIRECTORIES.BUILD)
        .replace(/_index\.md$/, 'index.md')
        .replace(/\.md$/, '.html');
    if (!rewritePath.endsWith('/index.html')) {
        return rewritePath.replace(/(\w*)\.html$/, '$1/index.html');
    }
    return rewritePath;
};
exports.getContentOutputPath = getContentOutputPath;
