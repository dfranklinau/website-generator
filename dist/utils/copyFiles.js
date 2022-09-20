"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const formatOutputFilePath_1 = require("./formatOutputFilePath");
const copyFiles = (files, dest, callback) => {
    files.forEach((file) => {
        const fileOutputPath = (0, formatOutputFilePath_1.formatOutputFilePath)(callback ? callback(file) : file, dest);
        const fileOutputDir = path_1.default.parse(fileOutputPath).dir;
        fs_1.default.mkdirSync(fileOutputDir, { recursive: true });
        fs_1.default.copyFileSync(file, fileOutputPath);
    });
};
exports.copyFiles = copyFiles;
