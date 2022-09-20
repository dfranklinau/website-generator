"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const findFiles = __importStar(require("./findFiles"));
const readFile = __importStar(require("./readFile"));
const getShortcodeTemplates_1 = require("./getShortcodeTemplates");
(0, tape_1.default)('`getShortcodeTemplates`', async (t) => {
    const findFilesStub = sinon_1.default.stub(findFiles, 'findFiles');
    const readFileStub = sinon_1.default.stub(readFile, 'readFile');
    findFilesStub.returns([
        './shortcodes/shortcode.hbs',
        './shortcodes/shortcode-with-attribute.hbs',
    ]);
    readFileStub
        .withArgs('./shortcodes/shortcode.hbs')
        .resolves('<p>Shortcode</p>')
        .withArgs('./shortcodes/shortcode-with-attribute.hbs')
        .resolves('<p>Shortcode with attribute</p>');
    const shortcodes = await (0, getShortcodeTemplates_1.getShortcodeTemplates)();
    t.deepEqual(shortcodes, [
        {
            name: 'shortcode',
            template: '<p>Shortcode</p>',
        },
        {
            name: 'shortcode-with-attribute',
            template: '<p>Shortcode with attribute</p>',
        },
    ], 'returns an array of shortcode names and templates');
    findFilesStub.restore();
    readFileStub.restore();
    t.end();
});
