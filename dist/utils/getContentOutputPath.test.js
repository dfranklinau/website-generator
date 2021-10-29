"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const getContentOutputPath_1 = require("./getContentOutputPath");
tape_1.default('`getContentOutputPath`', (t) => {
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/_index.md', null), './build/index.html', 'gets the content output path for a section');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/index.md', null), './build/index.html', 'gets the content output path for an index page');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/page.md', null), './build/page/index.html', 'gets the content output path for a page');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/section/_index.md', null), './build/section/index.html', 'gets the content output path for a nested section');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/section/index.md', null), './build/section/index.html', 'gets the content output path for a nested index page');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/section/page.md', null), './build/section/page/index.html', 'gets the content output path for a nested page');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/section/page.md', {
        filePath: './content/section/_index.md',
        markdown: {
            content: '',
            matter: {},
            options: {
                menu: false,
                toc: false,
                url: '',
            },
        },
        name: '_index.md',
        outputPath: './build/index.html',
        outputURL: '/build/',
    }), './build/section/page/index.html', 'gets the content output path for a nested page with a section whose url is empty');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/section/page.md', {
        filePath: './content/section/_index.md',
        markdown: {
            content: '',
            matter: {},
            options: {
                menu: false,
                toc: false,
                url: '/',
            },
        },
        name: '_index.md',
        outputPath: './build/index.html',
        outputURL: './build/',
    }), './build/page/index.html', 'gets the content output path for a nested page in a section whose url is a trailing slash');
    t.equal(getContentOutputPath_1.getContentOutputPath('./content/section/page.md', {
        filePath: './content/section/_index.md',
        markdown: {
            content: '',
            matter: {},
            options: {
                menu: false,
                toc: false,
                url: 'override',
            },
        },
        name: '_index.md',
        outputPath: './build/index.html',
        outputURL: './build/',
    }), './build/override/page/index.html', 'gets the content output path for a nested page in a section whose url is a replacement string');
    t.end();
});
