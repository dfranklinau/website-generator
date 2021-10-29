"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const getPageTitle_1 = require("./getPageTitle");
const _fixtures_1 = require("../_fixtures");
tape_1.default('`getPageTitle`', (t) => {
    const content = {
        filePath: '/section/page.md',
        markdown: {
            ..._fixtures_1.mockParsedMarkdown,
            matter: {
                title: 'Page',
            },
        },
        name: 'page.md',
        outputPath: '/section/page/index.html',
        outputURL: '/section/page/',
    };
    const section = {
        filePath: '/section/_index.md',
        markdown: {
            ..._fixtures_1.mockParsedMarkdown,
            matter: {
                title: 'Section',
            },
        },
        name: '_index.md',
        outputPath: '/section/index.html',
        outputURL: '/section/',
    };
    // @TODO: write more tests here to cover more cases.
    t.equal(getPageTitle_1.getPageTitle(content, section), 'Page / Section', 'gets a page title');
    t.equal(getPageTitle_1.getPageTitle(section, section), 'Section', 'gets a page title');
    t.end();
});
