"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const findFiles_1 = require("./findFiles");
const stubReaddirSync = () => {
    const readdirSync = sinon_1.default.stub(fs_1.default, 'readdirSync');
    readdirSync.withArgs('./content/', { withFileTypes: true }).returns([
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => true,
            name: 'index.md',
        },
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => true,
            name: 'image.jpg',
        },
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => false,
            isDirectory: () => true,
            name: 'blog',
        },
    ]);
    readdirSync.withArgs('./content/blog/', { withFileTypes: true }).returns([
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => true,
            name: 'index.md',
        },
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => true,
            name: 'blog-post-one.md',
        },
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => false,
            isDirectory: () => true,
            name: 'blog-post-two',
        },
    ]);
    readdirSync
        .withArgs('./content/blog/blog-post-two/', { withFileTypes: true })
        .returns([
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => true,
            name: 'index.md',
        },
        // @ts-expect-error mimic a fs.Dirent type
        {
            isFile: () => true,
            name: 'image.jpg',
        },
    ]);
    readdirSync.withArgs('./does-not-exist/', { withFileTypes: true }).throws();
    return readdirSync;
};
(0, tape_1.default)('`findFiles`', (t) => {
    const readdirSync = stubReaddirSync();
    const existsSync = sinon_1.default.stub(fs_1.default, 'existsSync');
    existsSync.returns(true);
    existsSync.withArgs('./does-not-exist/').returns(false);
    let content;
    content = (0, findFiles_1.findFiles)('./content/');
    t.equal(readdirSync.callCount, 1, '`readdirSync` should not be called');
    t.deepEqual(content, ['./content/index.md', './content/image.jpg'], 'returns an array of files');
    readdirSync.resetHistory();
    content = (0, findFiles_1.findFiles)('./content/', { match: 'index.md' });
    t.deepEqual(content, ['./content/index.md'], 'returns an array of files that match the given string');
    readdirSync.resetHistory();
    content = (0, findFiles_1.findFiles)('./content/', { match: /\.md$/ });
    t.deepEqual(content, ['./content/index.md'], 'returns an array of files that match the given RegExp');
    readdirSync.resetHistory();
    content = (0, findFiles_1.findFiles)('./content/', { recursive: true });
    t.deepEqual(content, [
        './content/index.md',
        './content/image.jpg',
        './content/blog/index.md',
        './content/blog/blog-post-one.md',
        './content/blog/blog-post-two/index.md',
        './content/blog/blog-post-two/image.jpg',
    ], 'returns an array of all files when `recursive` is specified');
    readdirSync.resetHistory();
    content = (0, findFiles_1.findFiles)('./content/', { match: 'index.md', recursive: true });
    t.deepEqual(content, [
        './content/index.md',
        './content/blog/index.md',
        './content/blog/blog-post-two/index.md',
    ], 'returns an array of all files that match the given string when `recursive` is specified');
    readdirSync.resetHistory();
    content = (0, findFiles_1.findFiles)('./content/', { match: /\.md$/, recursive: true });
    t.deepEqual(content, [
        './content/index.md',
        './content/blog/index.md',
        './content/blog/blog-post-one.md',
        './content/blog/blog-post-two/index.md',
    ], 'returns an array of all files that match the given RegExp when `recursive` is specified');
    readdirSync.resetHistory();
    content = (0, findFiles_1.findFiles)('./does-not-exist/');
    t.equal(content.length, 0, 'returns an empty array when a directory does not exist');
    readdirSync.restore();
    t.end();
});
