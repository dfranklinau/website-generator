"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageTitle = void 0;
const getPageTitle = (content, section) => {
    const pageTitle = content.markdown.matter?.title;
    const sectionTitle = section?.markdown.matter?.title;
    const sectionURL = section?.markdown.options.url;
    if (!pageTitle ||
        typeof pageTitle !== 'string' ||
        (pageTitle === sectionTitle && sectionURL === '/')) {
        return '';
    }
    if (sectionTitle &&
        typeof sectionTitle === 'string' &&
        pageTitle !== sectionTitle &&
        sectionURL !== '/') {
        return `${pageTitle} / ${sectionTitle}`;
    }
    return pageTitle;
};
exports.getPageTitle = getPageTitle;
