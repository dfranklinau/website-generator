"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripnewlinesHelper = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const stripnewlinesHelper = (value) => {
    return new handlebars_1.default.SafeString(value.replace(/[\r\n]+/g, ' '));
};
exports.stripnewlinesHelper = stripnewlinesHelper;
