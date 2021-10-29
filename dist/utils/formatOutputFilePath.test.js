"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const formatOutputFilePath_1 = require("./formatOutputFilePath");
tape_1.default('`formatOutputFilePath`', (t) => {
    const outputDirs = ['./build/', 'build', './build', '/build/'];
    outputDirs.forEach((outputDir) => {
        t.equal(formatOutputFilePath_1.formatOutputFilePath('./content/blog-post.md', outputDir), './build/blog-post.md', `replaces the root directory with the supplied output directory "${outputDir}"`);
    });
    t.equal(formatOutputFilePath_1.formatOutputFilePath('./content/directory/blog-post.md', './build/'), './build/directory/blog-post.md', `replaces the root directory with the supplied output directory for a nested file`);
    t.end();
});
