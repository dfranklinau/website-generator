"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./config/constants");
const findFiles_1 = require("./utils/findFiles");
const source = path_1.default.resolve(__dirname, '../init');
const target = process.cwd();
const init = async () => {
    const reserved = [
        ...(0, findFiles_1.findFiles)(constants_1.DIRECTORIES.ASSETS),
        ...(0, findFiles_1.findFiles)(constants_1.DIRECTORIES.CONTENT),
        ...(0, findFiles_1.findFiles)(constants_1.DIRECTORIES.HELPERS),
        ...(0, findFiles_1.findFiles)(constants_1.DIRECTORIES.SHORTCODES),
        ...(0, findFiles_1.findFiles)(constants_1.DIRECTORIES.STATIC),
        ...(0, findFiles_1.findFiles)(constants_1.DIRECTORIES.TEMPLATES),
    ];
    if (reserved.length > 0) {
        console.warn(`A website-generator structure already exists.`);
        return;
    }
    fs_1.default.promises.cp(source, target, {
        recursive: true
    });
    console.info("Created a website-generator structure.");
};
exports.init = init;
//# sourceMappingURL=init.js.map