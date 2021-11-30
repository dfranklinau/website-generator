"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortHelper = void 0;
const getPrimitive = (value) => {
    // @ts-expect-error: `value` is a primitive type, which will have `toString()`.
    return value?.toString() || '';
};
const sortHelper = (list, property, options, ascending = false) => {
    const sorted = list.sort((a, b) => {
        const aItem = getPrimitive(property.split('.').reduce((object, prop) => {
            if (Object.prototype.toString.call(object) === '[object Object]') {
                return object[prop];
            }
            return '';
        }, a));
        const bItem = getPrimitive(property.split('.').reduce((object, prop) => {
            if (Object.prototype.toString.call(object) === '[object Object]') {
                return object[prop];
            }
            return '';
        }, b));
        if (aItem > bItem) {
            return ascending ? 1 : -1;
        }
        else if (aItem < bItem) {
            return ascending ? -1 : 1;
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
