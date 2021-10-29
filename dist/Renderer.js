"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const dateformatHelper_1 = require("./helpers/dateformatHelper");
const equalHelper_1 = require("./helpers/equalHelper");
const markdownifyHelper_1 = require("./helpers/markdownifyHelper");
const isarrayHelper_1 = require("./helpers/isarrayHelper");
const sortHelper_1 = require("./helpers/sortHelper");
const stripnewlinesHelper_1 = require("./helpers/stripnewlinesHelper");
class Renderer {
    constructor(props) {
        this._baseTemplate = props.baseTemplate;
        this._config = props.config;
        this._partials = props.partials;
        this._runtime = {
            date: {
                year: new Date().getFullYear().toString(),
            },
        };
        /**
         * Register the partials to Handlebars.
         */
        Object.keys(this._partials).forEach((partial) => {
            handlebars_1.default.registerPartial(partial, this._partials[partial]);
        });
        handlebars_1.default.registerHelper('dateformat', dateformatHelper_1.dateformatHelper);
        handlebars_1.default.registerHelper('equal', equalHelper_1.equalHelper);
        handlebars_1.default.registerHelper('markdownify', markdownifyHelper_1.markdownifyHelper);
        handlebars_1.default.registerHelper('isarray', isarrayHelper_1.isarrayHelper);
        handlebars_1.default.registerHelper('sort', sortHelper_1.sortHelper);
        handlebars_1.default.registerHelper('stripnewlines', stripnewlinesHelper_1.stripnewlinesHelper);
    }
    render(view, options) {
        let templateString = typeof options?.baseTemplate === 'undefined'
            ? this._baseTemplate
            : options.baseTemplate;
        if (options?.stripNewlines) {
            templateString = templateString.replace(/\r?\n|\r/g, '');
        }
        const template = handlebars_1.default.compile(templateString);
        return template({
            ...view,
            config: this._config,
            runtime: this._runtime,
        });
    }
}
exports.Renderer = Renderer;
