"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tape_1 = __importDefault(require("tape"));
const sinon_1 = __importDefault(require("sinon"));
const _fixtures_1 = require("./_fixtures");
const Renderer_1 = require("./Renderer");
const renderContent_1 = require("./renderContent");
tape_1.default('`renderContent`', (t) => {
    const copyFileSyncStub = sinon_1.default.stub(fs_1.default, 'copyFileSync');
    const mkdirSyncStub = sinon_1.default.stub(fs_1.default, 'mkdirSync');
    const writeFileSyncStub = sinon_1.default.stub(fs_1.default, 'writeFileSync');
    renderContent_1.renderContent({
        content: _fixtures_1.mockPreparedContent.tree,
        globalMatter: {},
        renderer: new Renderer_1.Renderer({ baseTemplate: '', config: {}, partials: {} }),
    });
    t.equal(copyFileSyncStub.callCount, 3, 'calls `copyFileSync` for all assets being copied alongside Markdown');
    t.equal(mkdirSyncStub.callCount, 9, 'calls `mkdirSync` for all Markdown and assets');
    t.equal(writeFileSyncStub.callCount, 6, 'calls `writeFileSync` for all Markdown being rendered');
    t.ok(copyFileSyncStub.calledWith('./content/asset.jpg', './build/asset.jpg'), 'copied the root asset');
    t.ok(copyFileSyncStub.calledWith('./content/directory/asset.jpg', './build/directory/asset.jpg'), 'copied the child asset');
    t.ok(copyFileSyncStub.calledWith('./content/directory/nested/asset.jpg', './build/directory/nested/asset.jpg'), 'copied the child asset of a child');
    t.ok(mkdirSyncStub.calledWith('./build'), 'created a root directory for the content');
    t.ok(mkdirSyncStub.calledWith('./build/directory'), 'created a directory for child content');
    t.ok(mkdirSyncStub.calledWith('./build/directory/nested'), 'created a directory for the child content of a child');
    t.ok(writeFileSyncStub.calledWith('./build/index.html'), 'created the index HTML file');
    t.ok(writeFileSyncStub.calledWith('./build/page/index.html'), 'created the page HTML file');
    t.ok(writeFileSyncStub.calledWith('./build/directory/index.html'), 'created the child index HTML file');
    t.ok(writeFileSyncStub.calledWith('./build/directory/page/index.html'), 'created the child page HTML file');
    t.ok(writeFileSyncStub.calledWith('./build/directory/nested/index.html'), 'created the child index HTML file of a child');
    t.ok(writeFileSyncStub.calledWith('./build/directory/nested/page/index.html'), 'created the child page HTML file of a child');
    copyFileSyncStub.restore();
    mkdirSyncStub.restore();
    writeFileSyncStub.restore();
    t.end();
});
