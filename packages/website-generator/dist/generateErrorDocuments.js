"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorDocuments = void 0;
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./config/constants");
const readFile_1 = require("./utils/readFile");
async function generateErrorDocuments(props) {
    const { config, renderer } = props;
    const templateFile = `${constants_1.DIRECTORIES.TEMPLATES}_404.hbs`;
    const content = (await (0, readFile_1.readFile)(templateFile));
    fs_1.default.writeFileSync(`${constants_1.DIRECTORIES.BUILD}404.html`, renderer.render({
        content,
        head: {
            title: config.errorDocument404Title || '404',
        },
    }));
}
exports.generateErrorDocuments = generateErrorDocuments;
//# sourceMappingURL=generateErrorDocuments.js.map