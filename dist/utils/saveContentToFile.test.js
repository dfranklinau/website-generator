"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const saveContentToFile_1 = require("./saveContentToFile");
(0, tape_1.default)('`saveContentToFile`', (t) => {
    const mkdirSync = sinon_1.default.stub(fs_1.default, 'mkdirSync');
    const writeFileSync = sinon_1.default.stub(fs_1.default, 'writeFileSync');
    (0, saveContentToFile_1.saveContentToFile)('content', './build/index.html');
    t.ok(mkdirSync.calledWith('./build', { recursive: true }), 'makes the `./build/` directory');
    t.ok(writeFileSync.calledWith('./build/index.html', 'content'), 'creates a new file called `./build/index.html`');
    mkdirSync.resetHistory();
    writeFileSync.resetHistory();
    (0, saveContentToFile_1.saveContentToFile)('content', './build/directory/index.html');
    t.ok(mkdirSync.calledWith('./build/directory', { recursive: true }), 'recursively makes the `./build/directory/` directory');
    t.ok(writeFileSync.calledWith('./build/directory/index.html', 'content'), 'creates a new file called `./build/directory/index.html`');
    mkdirSync.resetHistory();
    writeFileSync.resetHistory();
    (0, saveContentToFile_1.saveContentToFile)('content', './build/directory/content/index.html');
    t.ok(mkdirSync.calledWith('./build/directory/content', { recursive: true }), 'recursively makes the `./build/directory/content/` directory');
    t.ok(writeFileSync.calledWith('./build/directory/content/index.html', 'content'), 'creates a new file called `./build/directory/context/index.html`');
    mkdirSync.restore();
    writeFileSync.restore();
    t.end();
});
