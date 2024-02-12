"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOutputFilePath = void 0;
const path_1 = __importDefault(require("path"));
const formatOutputFilePath = (filePath, outputDir) => {
    const outputDirBase = path_1.default.parse(outputDir).base;
    return filePath.replace(/^\.?\/?\w*\//, `./${outputDirBase}/`);
};
exports.formatOutputFilePath = formatOutputFilePath;
//# sourceMappingURL=formatOutputFilePath.js.map