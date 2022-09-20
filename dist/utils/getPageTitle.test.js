"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const getPageTitle_1 = require("./getPageTitle");
const _fixtures_1 = require("../_fixtures");
(0, tape_1.default)('`getPageTitle`', (t) => {
    const page = {
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
    t.equal((0, getPageTitle_1.getPageTitle)(page, section), 'Page / Section', "builds a page title using a page's section data");
    t.equal((0, getPageTitle_1.getPageTitle)(section, section), 'Section', 'builds a page title even if the content and section are identical');
    t.equal((0, getPageTitle_1.getPageTitle)(page, null), 'Page', 'builds a page title if no section is specified');
    t.end();
});
