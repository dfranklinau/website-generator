"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveContentToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const saveContentToFile = (content, filePath) => {
    const directory = path_1.default.parse(filePath).dir;
    fs_1.default.mkdirSync(directory, { recursive: true });
    fs_1.default.writeFileSync(filePath, content);
};
exports.saveContentToFile = saveContentToFile;
