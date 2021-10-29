"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const _fixtures_1 = require("./_fixtures");
const constants_1 = require("./config/constants");
const MarkdownParser_1 = require("./MarkdownParser");
const Renderer_1 = require("./Renderer");
const parseContent_1 = require("./parseContent");
const mockDirent = (props) => {
    const { isDirectory, isFile, name } = props;
    return {
        isBlockDevice: () => false,
        isCharacterDevice: () => false,
        isDirectory: () => isDirectory || false,
        isFIFO: () => false,
        isFile: () => isFile || false,
        isSocket: () => false,
        isSymbolicLink: () => false,
        name,
    };
};
tape_1.default('`parseContent`', async (t) => {
    const readdirStub = sinon_1.default.stub(fs_1.default.promises, 'readdir');
    const readFileStub = sinon_1.default.stub(fs_1.default.promises, 'readFile');
    readdirStub
        .withArgs('./content/', { withFileTypes: true })
        .resolves([
        mockDirent({ isFile: true, name: 'index.md' }),
        mockDirent({ isFile: true, name: 'draft.md' }),
        mockDirent({ isFile: true, name: 'page.md' }),
        mockDirent({ isFile: true, name: 'asset.jpg' }),
        mockDirent({ isFile: true, name: '_data.json' }),
        mockDirent({ isDirectory: true, name: 'directory' }),
    ]);
    readdirStub
        .withArgs('./content/directory/', { withFileTypes: true })
        .resolves([
        mockDirent({ isFile: true, name: '_index.md' }),
        mockDirent({ isFile: true, name: 'draft.md' }),
        mockDirent({ isFile: true, name: 'page.md' }),
        mockDirent({ isFile: true, name: 'asset.jpg' }),
        mockDirent({ isFile: true, name: '_data.json' }),
        mockDirent({ isDirectory: true, name: 'nested' }),
    ]);
    readdirStub
        .withArgs('./content/directory/nested/', { withFileTypes: true })
        .resolves([
        mockDirent({ isFile: true, name: 'index.md' }),
        mockDirent({ isFile: true, name: 'draft.md' }),
        mockDirent({ isFile: true, name: 'page.md' }),
        mockDirent({ isFile: true, name: 'asset.jpg' }),
        mockDirent({ isFile: true, name: '_data.json' }),
    ]);
    readFileStub.withArgs(sinon_1.default.match(/\.md$/)).resolves('Markdown');
    readFileStub
        .withArgs(sinon_1.default.match(/draft.md$/))
        .resolves('+++\ndraft = true\n+++\n\nMarkdown');
    readFileStub
        .withArgs(sinon_1.default.match(/_data.json$/))
        .resolves('{ "key": "value" }');
    const renderer = new Renderer_1.Renderer({ baseTemplate: '', config: {}, partials: {} });
    const markdownParser = new MarkdownParser_1.MarkdownParser(renderer, []);
    const content = await parseContent_1.parseContent({
        directory: constants_1.DIRECTORIES.CONTENT,
        markdownParser,
        renderer,
    });
    t.deepEqual(content, {
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
                                markdown: _fixtures_1.mockParsedMarkdown,
                                name: 'index.md',
                            },
                            {
                                filePath: './content/directory/nested/page.md',
                                markdown: _fixtures_1.mockParsedMarkdown,
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
                        markdown: _fixtures_1.mockParsedMarkdown,
                        name: 'page.md',
                    },
                ],
                section: {
                    filePath: './content/directory/_index.md',
                    markdown: _fixtures_1.mockParsedMarkdown,
                    name: '_index.md',
                },
            },
        },
        data: { json: { key: 'value' }, filePath: './content/_data.json' },
        pages: [
            {
                filePath: './content/index.md',
                markdown: _fixtures_1.mockParsedMarkdown,
                name: 'index.md',
            },
            {
                filePath: './content/page.md',
                markdown: _fixtures_1.mockParsedMarkdown,
                name: 'page.md',
            },
        ],
        section: null,
    }, 'parses all files within the given directory and returns a formatted object');
    readdirStub.restore();
    readFileStub.restore();
    t.end();
});
