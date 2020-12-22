"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateformatHelper = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const dateformatHelper = (value, format) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const date = new Date(value);
    if (format === 'D MMMM YYYY') {
        value = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    return new handlebars_1.default.SafeString(value);
};
exports.dateformatHelper = dateformatHelper;
