"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentOutputPath = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("../config/constants");
const getContentOutputPath = (filePath, section) => {
    let rewritePath = path_1.default.normalize(filePath);
    if (typeof section?.markdown.options.url === 'string' &&
        section.markdown.options.url.length > 0) {
        const sectionPath = path_1.default
            .parse(path_1.default.normalize(section.filePath))
            .dir.split(path_1.default.sep)
            .slice(1)
            .join(path_1.default.sep);
        if (section.markdown.options.url === '/') {
            rewritePath = rewritePath.replace(`/${sectionPath}/`, '/');
        }
        else {
            rewritePath = rewritePath.replace(`/${sectionPath}/`, `/${section.markdown.options.url}/`);
        }
    }
    rewritePath = rewritePath
        .replace(new RegExp(`^${path_1.default.normalize(constants_1.DIRECTORIES.CONTENT)}`), path_1.default.normalize(constants_1.DIRECTORIES.BUILD))
        .replace(/_index\.md$/, 'index.md')
        .replace(/\.md$/, '.html');
    if (!rewritePath.endsWith('/index.html')) {
        return rewritePath.replace(/(\w*)\.html$/, '$1/index.html');
    }
    return rewritePath;
};
exports.getContentOutputPath = getContentOutputPath;
//# sourceMappingURL=getContentOutputPath.js.map