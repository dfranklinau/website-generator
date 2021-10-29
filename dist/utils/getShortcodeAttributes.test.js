"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const MarkdownParser_1 = require("../MarkdownParser");
const Renderer_1 = require("../Renderer");
const getShortcodeAttributes_1 = require("./getShortcodeAttributes");
tape_1.default('`getShortcodeAttributes`', (t) => {
    const renderer = new Renderer_1.Renderer({ baseTemplate: '', config: {}, partials: {} });
    const markdownParser = new MarkdownParser_1.MarkdownParser(renderer, []);
    t.deepEqual(getShortcodeAttributes_1.getShortcodeAttributes('shortcode', '{{%shortcode id="value"%}}', markdownParser), {
        id: 'value',
    }, `should return a named attribute's value`);
    t.deepEqual(getShortcodeAttributes_1.getShortcodeAttributes('shortcode', '{{%shortcode id="value"/%}}', markdownParser), {
        id: 'value',
    }, `should return a named attribute's value for a self-closing shortcode`);
    t.deepEqual(getShortcodeAttributes_1.getShortcodeAttributes('shortcode', '{{%shortcode id="value" class="css"/%}}', markdownParser), {
        class: 'css',
        id: 'value',
    }, 'should return the values of multiple named attributes');
    t.deepEqual(getShortcodeAttributes_1.getShortcodeAttributes('shortcode', '{{%shortcode key="one" key="two"/%}}', markdownParser), {
        key: ['one', 'two'],
    }, 'should return an array of values for an attribute name used multiple times');
    t.end();
});
