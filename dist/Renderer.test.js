"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const Renderer_1 = require("./Renderer");
tape_1.default('`Renderer`', (t) => {
    const renderer = new Renderer_1.Renderer({
        baseTemplate: '{{&content}}',
        config: {},
        partials: {
            partial: '(partial)',
        },
    });
    t.test('`Renderer.render`', (t) => {
        t.equal(renderer.render({
            content: 'hello world',
        }), 'hello world', 'renders content using the base template');
        t.equal(renderer.render({
            content: 'hello world',
        }, {
            baseTemplate: 'custom template: {{&content}}',
        }), 'custom template: hello world', 'renders content using a custom base template');
        t.equal(renderer.render({
            content: 'hello world',
            page: {
                content: 'goodbye world',
            },
        }, {
            baseTemplate: '{{&content}} + page content: {{&page.content}}',
        }), 'hello world + page content: goodbye world', 'renders content with page variables ');
        t.equal(renderer.render({
            content: 'hello world',
        }, {
            baseTemplate: '{{&content}} + partial: {{> partial}}',
        }), 'hello world + partial: (partial)', 'renders content with partials ');
        t.match(renderer.render({
            content: 'hello world',
        }, {
            baseTemplate: '{{runtime.date.year}}',
        }), /\d{4}/, 'renders content with a runtime variable of the current year');
        t.end();
    });
    t.end();
});
