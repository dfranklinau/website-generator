"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const constants_1 = require("../config/constants");
const getContentTemplate_1 = require("./getContentTemplate");
tape_1.default('`getContentTemplate`', (t) => {
    let contentTemplate = null;
    const readFileSync = sinon_1.default.stub(fs_1.default, 'readFileSync');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}index.hbs`)
        .returns('index template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}directory/index.hbs`)
        .returns('directory index template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}non-existant/index.hbs`)
        .throws();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}directory/other.hbs`)
        .throws();
    readFileSync.withArgs(`${constants_1.DIRECTORIES.TEMPLATES}other.hbs`).throws();
    contentTemplate = getContentTemplate_1.getContentTemplate('index', []);
    t.ok(readFileSync.calledOnce, 'should call `fs.readFileSync` once when no directories are passed');
    t.equal(contentTemplate, 'index template', 'returns the template when no directories are passed');
    readFileSync.resetHistory();
    contentTemplate = getContentTemplate_1.getContentTemplate('index', ['directory']);
    t.ok(readFileSync.calledOnce, 'should call `fs.readFileSync` once when a directory is passed');
    t.equal(contentTemplate, 'directory index template', 'return the directory template when a directory is passed');
    readFileSync.resetHistory();
    contentTemplate = getContentTemplate_1.getContentTemplate('index', ['non-existant']);
    t.ok(readFileSync.calledTwice, 'should call `fs.readFileSync` twice when a non-existant directory is passed');
    t.equal(contentTemplate, 'index template', 'return the template when a non-existant directory is passed');
    readFileSync.resetHistory();
    contentTemplate = getContentTemplate_1.getContentTemplate('other', ['directory']);
    t.ok(readFileSync.calledTwice, 'should call `fs.readFileSync` twice when a non-existant template type is passed');
    t.equal(contentTemplate, '', 'return an empty string when no matching template exists');
    readFileSync.restore();
    t.end();
});
