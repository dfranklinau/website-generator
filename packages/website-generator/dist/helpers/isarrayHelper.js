"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isarrayHelper = void 0;
const isarrayHelper = (value, options) => {
    if (Array.isArray(value)) {
        return options.fn(options.data.root);
    }
    return options.inverse(options.data.root);
};
exports.isarrayHelper = isarrayHelper;
//# sourceMappingURL=isarrayHelper.js.map