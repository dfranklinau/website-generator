"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderContent = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("./config/constants");
const copyFiles_1 = require("./utils/copyFiles");
const getContentTemplate_1 = require("./utils/getContentTemplate");
const getPageTitle_1 = require("./utils/getPageTitle");
const saveContentToFile_1 = require("./utils/saveContentToFile");
const getContentOutput = (props) => {
    const { content, data, globalMatter, renderer, sectionMatter, parentSection, template, } = props;
    // Use `.slice(2)` to remove '.' and 'content' from the list.
    const contentDirectories = path_1.default
        .parse(content.filePath)
        .dir.split(path_1.default.sep)
        .slice(2);
    const filename = typeof content.markdown.matter.title === "string" ?
        content.markdown.matter.title : null;
    const contentTemplate = (0, getContentTemplate_1.getContentTemplate)(template, contentDirectories, filename);
    const variables = {
        data: data?.json,
        global: globalMatter,
        head: {
            title: (0, getPageTitle_1.getPageTitle)(content, parentSection),
        },
        page: {
            ...content.markdown.matter,
            ...sectionMatter,
            toc: content.markdown.options.toc,
        },
        section: {
            ...parentSection?.markdown.matter,
            ...sectionMatter,
        },
    };
    const renderedContent = renderer.render({
        ...variables,
        content: content.markdown.content,
    }, {
        baseTemplate: contentTemplate,
    });
    return renderer.render({
        ...variables,
        content: renderedContent,
    });
};
const renderContent = (props) => {
    const { content, globalMatter, parentSection, renderer } = props;
    const assets = content.assets;
    const data = content.data;
    const section = content.section;
    const pages = content.pages;
    const children = content.children;
    let sectionOverride = parentSection || null;
    if (section) {
        sectionOverride = {
            ...section,
            ...sectionOverride,
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
        };
        const sectionChildren = [...pages];
        if (children) {
            Object.keys(children).forEach((key) => {
                const child = children[key];
                if (child.section) {
                    sectionChildren.push(child.section);
                }
                else {
                    const childIndexPage = child.pages.find((page) => page.name === 'index.md');
                    if (childIndexPage) {
                        sectionChildren.push(childIndexPage);
                    }
                }
            });
        }
        const sectionMatter = {
            children: sectionChildren,
        };
        const output = getContentOutput({
            content: section,
            data,
            globalMatter,
            renderer,
            sectionMatter,
            parentSection: sectionOverride,
            template: parentSection ? 'section' : 'index',
        });
        (0, saveContentToFile_1.saveContentToFile)(output, section.outputPath);
    }
    if (pages) {
        pages.forEach((page) => {
            const output = getContentOutput({
                content: page,
                data,
                globalMatter,
                renderer,
                parentSection: sectionOverride,
                template: 'page',
            });
            (0, saveContentToFile_1.saveContentToFile)(output, page.outputPath);
        });
    }
    if (content.children) {
        const children = content.children;
        const childrenKeys = Object.keys(children);
        childrenKeys.forEach((child) => {
            (0, exports.renderContent)({
                content: children[child],
                globalMatter,
                parentSection: sectionOverride,
                renderer,
            });
        });
    }
    if (assets) {
        (0, copyFiles_1.copyFiles)(assets.map((asset) => asset.filePath), constants_1.DIRECTORIES.BUILD, (filePath) => {
            const asset = assets.find((asset) => asset.filePath === filePath);
            if (!asset) {
                throw new Error(`Asset at "${filePath}" does not have an output path.`);
            }
            return asset.outputPath;
        });
    }
};
exports.renderContent = renderContent;
