"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticFiles = void 0;
const constants_1 = require("./config/constants");
const copyFiles_1 = require("./utils/copyFiles");
const findFiles_1 = require("./utils/findFiles");
function generateStaticFiles() {
    const staticFiles = (0, findFiles_1.findFiles)(constants_1.DIRECTORIES.STATIC, {
        recursive: true,
    });
    (0, copyFiles_1.copyFiles)(staticFiles, constants_1.DIRECTORIES.BUILD);
}
exports.generateStaticFiles = generateStaticFiles;
//# sourceMappingURL=generateStaticFiles.js.map