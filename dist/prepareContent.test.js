"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const _fixtures_1 = require("./_fixtures");
const prepareContent_1 = require("./prepareContent");
tape_1.default('`prepareContent`', (t) => {
    const prepared = prepareContent_1.prepareContent({
        content: _fixtures_1.mockParsedContent,
    });
    t.deepEqual(prepared.list, _fixtures_1.mockPreparedContent.list, 'prepares a list of all content');
    t.deepEqual(prepared.tree, _fixtures_1.mockPreparedContent.tree, 'prepares a content tree');
    t.deepEqual(prepareContent_1.prepareContent({
        content: {
            ..._fixtures_1.mockParsedContent,
            children: {
                ..._fixtures_1.mockParsedContent.children,
                directory: {
                    // @ts-expect-error: `mockPreparedContent.tree.children.directory` is defined and never `null`.
                    ..._fixtures_1.mockParsedContent.children.directory,
                    section: {
                        filePath: './content/directory/_index.md',
                        markdown: {
                            ..._fixtures_1.mockParsedMarkdown,
                            options: {
                                menu: false,
                                toc: false,
                                url: '/',
                            },
                        },
                        name: '_index.md',
                    },
                },
            },
        },
    }).list, [
        _fixtures_1.mockPreparedContent.list[0],
        _fixtures_1.mockPreparedContent.list[1],
        {
            ..._fixtures_1.mockPreparedContent.list[2],
            markdown: {
                ..._fixtures_1.mockParsedMarkdown,
                options: {
                    menu: false,
                    toc: false,
                    url: '/',
                },
            },
            outputPath: './build/index.html',
            outputURL: '/',
        },
        {
            ..._fixtures_1.mockPreparedContent.list[3],
            outputPath: './build/page/index.html',
            outputURL: '/page/',
        },
        {
            ..._fixtures_1.mockPreparedContent.list[4],
            outputPath: './build/nested/index.html',
            outputURL: '/nested/',
        },
        {
            ..._fixtures_1.mockPreparedContent.list[5],
            outputPath: './build/nested/page/index.html',
            outputURL: '/nested/page/',
        },
    ], 'prepares a list of all content where a section has a URL removal');
    t.deepEqual(prepareContent_1.prepareContent({
        content: {
            ..._fixtures_1.mockParsedContent,
            children: {
                ..._fixtures_1.mockParsedContent.children,
                directory: {
                    // @ts-expect-error: `mockPreparedContent.tree.children.directory` is defined and never `null`.
                    ..._fixtures_1.mockParsedContent.children.directory,
                    section: {
                        filePath: './content/directory/_index.md',
                        markdown: {
                            ..._fixtures_1.mockParsedMarkdown,
                            options: {
                                menu: false,
                                toc: false,
                                url: 'override',
                            },
                        },
                        name: '_index.md',
                    },
                },
            },
        },
    }).list, [
        _fixtures_1.mockPreparedContent.list[0],
        _fixtures_1.mockPreparedContent.list[1],
        {
            ..._fixtures_1.mockPreparedContent.list[2],
            markdown: {
                ..._fixtures_1.mockParsedMarkdown,
                options: {
                    menu: false,
                    toc: false,
                    url: 'override',
                },
            },
            outputPath: './build/override/index.html',
            outputURL: '/override/',
        },
        {
            ..._fixtures_1.mockPreparedContent.list[3],
            outputPath: './build/override/page/index.html',
            outputURL: '/override/page/',
        },
        {
            ..._fixtures_1.mockPreparedContent.list[4],
            outputPath: './build/override/nested/index.html',
            outputURL: '/override/nested/',
        },
        {
            ..._fixtures_1.mockPreparedContent.list[5],
            outputPath: './build/override/nested/page/index.html',
            outputURL: '/override/nested/page/',
        },
    ], 'prepares a list of all content where a section has a URL replacement');
    t.end();
});
