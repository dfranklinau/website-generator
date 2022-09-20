"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const copyFiles_1 = require("./copyFiles");
(0, tape_1.default)('`copyFiles`', (t) => {
    const mkdirSync = sinon_1.default.stub(fs_1.default, 'mkdirSync');
    const copyFileSync = sinon_1.default.stub(fs_1.default, 'copyFileSync');
    const files = ['./static/image.jpg', './static/js/main.js'];
    (0, copyFiles_1.copyFiles)(files, './build/');
    t.ok(mkdirSync.calledTwice, '`mkdirSync` should be called three times');
    t.ok(copyFileSync.calledTwice, '`copyFileSync` should be called three times');
    t.ok(mkdirSync.calledWith('./build', { recursive: true }), 'creates the provided destination folder');
    t.ok(mkdirSync.calledWith('./build/js', { recursive: true }), 'creates the provided destination folder, with nesting');
    t.ok(copyFileSync.calledWith('./static/image.jpg', './build/image.jpg'), 'copies the supplied file to the destination folder');
    t.ok(copyFileSync.calledWith('./static/js/main.js', './build/js/main.js'), 'copies the supplied file to the destination folder, with nesting');
    mkdirSync.restore();
    copyFileSync.restore();
    t.end();
});
