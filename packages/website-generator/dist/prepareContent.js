"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareContent = void 0;
const getContentOutputPath_1 = require("./utils/getContentOutputPath");
const getContentOutputURL_1 = require("./utils/getContentOutputURL");
const prepareContent = (props) => {
    const { content, sectionParent } = props;
    const assets = content.assets;
    const children = content.children;
    const pages = content.pages;
    const section = content.section;
    let preparedContentList = [];
    const preparedContentTree = {
        assets: [],
        children: null,
        data: content.data || null,
        section: null,
        pages: [],
    };
    let sectionOverride = sectionParent || null;
    if (section) {
        sectionOverride = {
            filePath: sectionOverride?.filePath || section.filePath,
            markdown: {
                content: sectionOverride?.markdown.content || section.markdown.content,
                matter: {
                    ...sectionOverride?.markdown.matter,
                    ...section.markdown.matter,
                },
                options: {
                    ...sectionOverride?.markdown.options,
                    ...section.markdown.options,
                },
            },
            name: sectionOverride?.name || section.name,
            outputPath: (0, getContentOutputPath_1.getContentOutputPath)(section.filePath, sectionOverride),
            outputURL: (0, getContentOutputURL_1.getContentOutputURL)(section.filePath, sectionOverride),
        };
        const preparedSection = {
            ...section,
            outputPath: (0, getContentOutputPath_1.getContentOutputPath)(section.filePath, sectionOverride),
            outputURL: (0, getContentOutputURL_1.getContentOutputURL)(section.filePath, sectionOverride),
        };
        preparedContentList.push(preparedSection);
        preparedContentTree.section = preparedSection;
    }
    if (pages) {
        preparedContentTree.pages = pages.map((page) => ({
            ...page,
            outputPath: (0, getContentOutputPath_1.getContentOutputPath)(page.filePath, sectionOverride),
            outputURL: (0, getContentOutputURL_1.getContentOutputURL)(page.filePath, sectionOverride),
        }));
        preparedContentList = preparedContentList.concat(preparedContentTree.pages);
    }
    if (children) {
        const preparedContentTreeChildren = {};
        const childrenKeys = Object.keys(children);
        childrenKeys.forEach((key) => {
            const preparedChildrenContent = (0, exports.prepareContent)({
                content: children[key],
                sectionParent: sectionOverride,
            });
            preparedContentList = preparedContentList.concat(preparedChildrenContent.list);
            preparedContentTreeChildren[key] = preparedChildrenContent.tree;
        });
        preparedContentTree.children = preparedContentTreeChildren;
    }
    if (assets) {
        preparedContentTree.assets = assets.map((asset) => ({
            ...asset,
            outputPath: (0, getContentOutputPath_1.getContentOutputPath)(asset.filePath, sectionOverride),
        }));
    }
    return {
        list: preparedContentList,
        tree: preparedContentTree,
    };
};
exports.prepareContent = prepareContent;
//# sourceMappingURL=prepareContent.js.map