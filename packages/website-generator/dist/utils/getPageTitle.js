"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageTitle = void 0;
const getPageTitle = (content) => {
    const title = content.markdown.matter?.title;
    if (title && typeof title === 'string') {
        return title;
    }
    return '';
};
exports.getPageTitle = getPageTitle;
//# sourceMappingURL=getPageTitle.js.map