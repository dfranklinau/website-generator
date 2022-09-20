"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const removeTrailingSlash_1 = require("./removeTrailingSlash");
(0, tape_1.default)('`removeTrailingSlash`', (t) => {
    t.equal((0, removeTrailingSlash_1.removeTrailingSlash)('./content/'), './content', 'removes the trailing slash from a directory path');
    t.equal((0, removeTrailingSlash_1.removeTrailingSlash)('./content'), './content', 'does not alter a directory path without a trailing slash');
    t.equal((0, removeTrailingSlash_1.removeTrailingSlash)('./content/file.md'), './content/file.md', 'does not alter a file path to a file');
    t.end();
});
