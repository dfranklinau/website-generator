"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const cleanDirectory = (dir) => {
    fs_1.default.rmSync(dir, { force: true, recursive: true });
    fs_1.default.mkdirSync(dir);
};
exports.cleanDirectory = cleanDirectory;
