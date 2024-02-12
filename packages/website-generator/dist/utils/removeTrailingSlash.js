"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrailingSlash = void 0;
const path_1 = __importDefault(require("path"));
const removeTrailingSlash = (filePath) => {
    if (filePath.charAt(filePath.length - 1) === path_1.default.sep) {
        return filePath.slice(0, filePath.length - 1);
    }
    return filePath;
};
exports.removeTrailingSlash = removeTrailingSlash;
//# sourceMappingURL=removeTrailingSlash.js.map