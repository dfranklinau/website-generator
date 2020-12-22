"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalHelper = void 0;
const equalHelper = (value, target, options) => {
    if (value === target) {
        return options.fn(options.data.root);
    }
    return options.inverse(options.data.root);
};
exports.equalHelper = equalHelper;
