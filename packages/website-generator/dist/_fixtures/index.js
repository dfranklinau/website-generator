"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockShortcodes = exports.mockParsedMarkdown = exports.mockPreparedContent = exports.mockParsedContent = exports.mockMarkdown = exports.mockMarkdownContent = exports.mockContent = void 0;
const mockParsedMarkdown = {
    content: '<p>Markdown</p>',
    matter: {},
    options: {
        menu: false,
        toc: false,
        url: false,
    },
};
exports.mockParsedMarkdown = mockParsedMarkdown;
exports.mockContent = {
    filePath: './content/directory/index.md',
    markdown: mockParsedMarkdown,
    name: 'index',
};
exports.mockMarkdownContent = `## Heading
This is some Markdown content.

### Heading
There are a few Markdown elements in here:

- such
- as
- lists`;
exports.mockMarkdown = `+++
title = "Markdown Title"
date = "1979-05-27"
toc = true
+++

${exports.mockMarkdownContent}
`;
exports.mockParsedContent = {
    assets: [{ filePath: './content/asset.jpg' }],
    children: {
        directory: {
            assets: [{ filePath: './content/directory/asset.jpg' }],
            children: {
                nested: {
                    assets: [{ filePath: './content/directory/nested/asset.jpg' }],
                    children: null,
                    data: {
                        json: { key: 'value' },
                        filePath: './content/directory/nested/_data.json',
                    },
                    pages: [
                        {
                            filePath: './content/directory/nested/index.md',
                            markdown: mockParsedMarkdown,
                            name: 'index.md',
                        },
                        {
                            filePath: './content/directory/nested/page.md',
                            markdown: mockParsedMarkdown,
                            name: 'page.md',
                        },
                    ],
                    section: null,
                },
            },
            data: {
                json: { key: 'value' },
                filePath: './content/directory/_data.json',
            },
            pages: [
                {
                    filePath: './content/directory/page.md',
                    markdown: mockParsedMarkdown,
                    name: 'page.md',
                },
            ],
            section: {
                filePath: './content/directory/_index.md',
                markdown: mockParsedMarkdown,
                name: '_index.md',
            },
        },
    },
    data: { json: { key: 'value' }, filePath: './content/_data.json' },
    pages: [
        {
            filePath: './content/index.md',
            markdown: mockParsedMarkdown,
            name: 'index.md',
        },
        {
            filePath: './content/page.md',
            markdown: mockParsedMarkdown,
            name: 'page.md',
        },
    ],
    section: null,
};
exports.mockPreparedContent = {
    list: [
        {
            filePath: './content/index.md',
            markdown: mockParsedMarkdown,
            name: 'index.md',
            outputPath: './build/index.html',
            outputURL: '/',
        },
        {
            filePath: './content/page.md',
            markdown: mockParsedMarkdown,
            name: 'page.md',
            outputPath: './build/page/index.html',
            outputURL: '/page/',
        },
        {
            filePath: './content/directory/_index.md',
            markdown: mockParsedMarkdown,
            name: '_index.md',
            outputPath: './build/directory/index.html',
            outputURL: '/directory/',
        },
        {
            filePath: './content/directory/page.md',
            markdown: mockParsedMarkdown,
            name: 'page.md',
            outputPath: './build/directory/page/index.html',
            outputURL: '/directory/page/',
        },
        {
            filePath: './content/directory/nested/index.md',
            markdown: mockParsedMarkdown,
            name: 'index.md',
            outputPath: './build/directory/nested/index.html',
            outputURL: '/directory/nested/',
        },
        {
            filePath: './content/directory/nested/page.md',
            markdown: mockParsedMarkdown,
            name: 'page.md',
            outputPath: './build/directory/nested/page/index.html',
            outputURL: '/directory/nested/page/',
        },
    ],
    tree: {
        assets: [
            {
                filePath: './content/asset.jpg',
                outputPath: './build/asset.jpg',
            },
        ],
        children: {
            directory: {
                assets: [
                    {
                        filePath: './content/directory/asset.jpg',
                        outputPath: './build/directory/asset.jpg',
                    },
                ],
                children: {
                    nested: {
                        assets: [
                            {
                                filePath: './content/directory/nested/asset.jpg',
                                outputPath: './build/directory/nested/asset.jpg',
                            },
                        ],
                        children: null,
                        data: {
                            json: { key: 'value' },
                            filePath: './content/directory/nested/_data.json',
                        },
                        section: null,
                        pages: [
                            {
                                filePath: './content/directory/nested/index.md',
                                markdown: mockParsedMarkdown,
                                name: 'index.md',
                                outputPath: './build/directory/nested/index.html',
                                outputURL: '/directory/nested/',
                            },
                            {
                                filePath: './content/directory/nested/page.md',
                                markdown: mockParsedMarkdown,
                                name: 'page.md',
                                outputPath: './build/directory/nested/page/index.html',
                                outputURL: '/directory/nested/page/',
                            },
                        ],
                    },
                },
                data: {
                    json: { key: 'value' },
                    filePath: './content/directory/_data.json',
                },
                section: {
                    filePath: './content/directory/_index.md',
                    markdown: mockParsedMarkdown,
                    name: '_index.md',
                    outputPath: './build/directory/index.html',
                    outputURL: '/directory/',
                },
                pages: [
                    {
                        filePath: './content/directory/page.md',
                        markdown: mockParsedMarkdown,
                        name: 'page.md',
                        outputPath: './build/directory/page/index.html',
                        outputURL: '/directory/page/',
                    },
                ],
            },
        },
        data: {
            json: { key: 'value' },
            filePath: './content/_data.json',
        },
        section: null,
        pages: [
            {
                filePath: './content/index.md',
                markdown: mockParsedMarkdown,
                name: 'index.md',
                outputPath: './build/index.html',
                outputURL: '/',
            },
            {
                filePath: './content/page.md',
                markdown: mockParsedMarkdown,
                name: 'page.md',
                outputPath: './build/page/index.html',
                outputURL: '/page/',
            },
        ],
    },
};
exports.mockShortcodes = [
    { name: 'shortcode', template: '<div>{{&content}}</div>' },
    {
        name: 'shortcode-with-attribute',
        template: '<div id="{{params.id}}">{{&content}}</div>',
    },
    {
        name: 'shortcode-with-multiple-attributes',
        template: '<div id="{{params.id}}" class="{{params.class}}">{{&content}}</div>',
    },
    {
        name: 'shortcode-with-array-attribute',
        template: '<div>{{&content}}<ul>{{#each params.key}}<li>{{this}}</li>{{/each}}</ul></div>',
    },
];
