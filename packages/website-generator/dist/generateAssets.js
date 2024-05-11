"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAssets = void 0;
const postcss_1 = __importDefault(require("postcss"));
const constants_1 = require("./config/constants");
const findFiles_1 = require("./utils/findFiles");
const formatOutputFilePath_1 = require("./utils/formatOutputFilePath");
const readFile_1 = require("./utils/readFile");
const saveContentToFile_1 = require("./utils/saveContentToFile");
async function generateAssets() {
    const cssFiles = (0, findFiles_1.findFiles)(constants_1.DIRECTORIES.ASSETS, {
        match: /\.css$/,
        recursive: true,
    });
    await Promise.all(cssFiles.map(async (cssFile) => {
        const outputCssFile = (0, formatOutputFilePath_1.formatOutputFilePath)(cssFile, constants_1.DIRECTORIES.BUILD);
        const data = (await (0, readFile_1.readFile)(cssFile));
        if (!data)
            return;
        return (0, postcss_1.default)([])
            .process(data, {
            from: cssFile,
            to: outputCssFile,
        })
            .then((result) => {
            (0, saveContentToFile_1.saveContentToFile)(result.css, outputCssFile);
        });
    }));
}
exports.generateAssets = generateAssets;
//# sourceMappingURL=generateAssets.js.map