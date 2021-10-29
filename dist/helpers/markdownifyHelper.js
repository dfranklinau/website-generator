"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownifyHelper = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const MarkdownParser_1 = require("../MarkdownParser");
const markdownParser = new MarkdownParser_1.MarkdownParser(null, []);
const markdownifyHelper = (value) => {
    const parsedMarkdown = markdownParser.parse(value);
    return new handlebars_1.default.SafeString(parsedMarkdown.content);
};
exports.markdownifyHelper = markdownifyHelper;
