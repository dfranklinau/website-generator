"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const findFiles = (directory, options) => {
    let results = [];
    const files = fs_1.default.readdirSync(directory, { withFileTypes: true });
    files.forEach((item) => {
        if (item.isFile()) {
            if ((options?.match && item.name.match(options.match)) ||
                typeof options?.match === 'undefined') {
                results.push(`${directory}${item.name}`);
            }
        }
        else if (options?.recursive && item.isDirectory()) {
            results = results.concat(exports.findFiles(`${directory}${item.name}/`, options));
        }
    });
    return results;
};
exports.findFiles = findFiles;
