"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortHelper = void 0;
const sortHelper = (list, property, options) => {
    const sorted = list.sort((a, b) => {
        const aDate = property
            .split('.')
            .reduce((p, prop) => {
            return p[prop];
        }, a);
        const bDate = property
            .split('.')
            .reduce((p, prop) => {
            return p[prop];
        }, b);
        if (aDate > bDate) {
            return -1;
        }
        else if (aDate < bDate) {
            return 1;
        }
        return 0;
    });
    let value = '';
    sorted.forEach((item) => {
        value += options.fn(item);
    });
    return value;
};
exports.sortHelper = sortHelper;
