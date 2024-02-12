"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const readFile = async (file, defaultValue, callback) => {
    try {
        const data = await fs_1.default.promises.readFile(file, 'utf8');
        return callback ? callback(data) : data;
    }
    catch {
        return defaultValue || null;
    }
};
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map