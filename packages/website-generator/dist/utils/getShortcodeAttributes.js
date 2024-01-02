"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortcodeAttributes = void 0;
const getShortcodeAttributes = (name, match, markdownParser) => {
    const pattern = new RegExp(`${name}((?=\\s).+)[%>]}}`);
    const attributes = match.match(pattern);
    const params = {};
    if (!attributes?.[1]) {
        return params;
    }
    attributes[1]
        .replace(/\/$/, '')
        .trim()
        .split(/ +(?=[\w]+=)/)
        .forEach((attribute) => {
        const parts = attribute.split('=');
        const key = parts?.[0] || null;
        let value = parts?.[1]?.replace(/['"]/g, '') || null;
        if (key && value) {
            value = markdownParser.parseInline(value);
            if (params[key]) {
                const existingParam = params[key];
                if (Array.isArray(existingParam)) {
                    existingParam.push(value);
                }
                else {
                    params[key] = [existingParam, value];
                }
            }
            else {
                params[key] = value;
            }
        }
    });
    return params;
};
exports.getShortcodeAttributes = getShortcodeAttributes;
