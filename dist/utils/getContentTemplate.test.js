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
(0, tape_1.default)('`getContentTemplate`', (t) => {
    const readFileSync = sinon_1.default.stub(fs_1.default, 'readFileSync');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}page.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('page template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}section.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('section template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}_index.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('index template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}filename.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('named page template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}directory/page.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('directory page template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}directory/section.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('directory section template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}directory/filename.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('named directory page template');
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}non-existant/page.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}non-existant/section.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    let contentTemplate = null;
    /**
     * Template lookup without filenames.
     */
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', []);
    t.equal(contentTemplate, 'page template', 'return the template for a page when no directories are passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('section', []);
    t.equal(contentTemplate, 'section template', 'return the template for a section when no directories are passed');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('index', []);
    t.equal(contentTemplate, 'index template', 'return the template for the index section when no directories are passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', ['directory']);
    t.equal(contentTemplate, 'directory page template', 'return the directory template for a page when a directory is passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('section', ['directory']);
    t.equal(contentTemplate, 'directory section template', 'return the directory template for a section when a directory is passed');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('index', ['directory']);
    t.equal(contentTemplate, 'index template', 'return the template for the index section when a directory is passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', ['non-existant']);
    t.equal(contentTemplate, 'page template', 'return the index template for a page when a non-existant directory is passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('section', ['non-existant']);
    t.equal(contentTemplate, 'section template', 'return the index template for a section when a non-existant directory is passed');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('index', ['directory']);
    t.equal(contentTemplate, 'index template', 'return the template for the index section when a non-existant directory is passed');
    /**
     * Template lookup with filenames (only applies to page templates).
     */
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', [], 'filename');
    t.equal(contentTemplate, 'named page template', 'return the template for a named page when no directories are passed');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', [], 'filename');
    t.equal(contentTemplate, 'named page template', 'return the template for a named page when no directories are passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', ['directory'], 'filename');
    t.equal(contentTemplate, 'named directory page template', 'return the directory template for a named page when a directory is passed');
    readFileSync.resetHistory();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', ['non-existant'], 'filename');
    t.equal(contentTemplate, 'page template', 'return the template for a named page when a non-existant directory is passed');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', [], 'non-existant');
    t.equal(contentTemplate, 'page template', 'return the template for a page when a the named page template does not exist');
    /**
     * Template lookup when no templates exist.
     */
    readFileSync.reset();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}page.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}filename.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}section.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}_index.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', []);
    t.equal(contentTemplate, '', 'return an empty string when no matching page template exists');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('page', [], 'filename');
    t.equal(contentTemplate, '', 'return an empty string when no matching named page template exists');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('section', []);
    t.equal(contentTemplate, '', 'return an empty string when no matching section template exists');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('index', []);
    t.equal(contentTemplate, '', 'return an empty string when no matching index section template exists');
    /**
     * Template lookup when an index template does not exist but a section
     * template does.
     */
    readFileSync.reset();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}_index.${constants_1.EXTENSIONS.TEMPLATES}`)
        .throws();
    readFileSync
        .withArgs(`${constants_1.DIRECTORIES.TEMPLATES}section.${constants_1.EXTENSIONS.TEMPLATES}`)
        .returns('section template');
    contentTemplate = (0, getContentTemplate_1.getContentTemplate)('index', []);
    t.equal(contentTemplate, 'section template', 'return the template for a section when no index section template exists');
    readFileSync.restore();
    t.end();
});
