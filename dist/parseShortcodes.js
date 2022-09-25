"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseShortcodes = void 0;
const convertShortcodeBlockMatchesToPairs_1 = require("./utils/convertShortcodeBlockMatchesToPairs");
const getShortcodeAttributes_1 = require("./utils/getShortcodeAttributes");
const parseShortcodes = (props) => {
    const { content, markdownParser, renderer, shortcodes } = props;
    const lines = content.split(/\r?\n/);
    shortcodes.forEach((shortcode) => {
        const inlineMatches = [];
        const blockMatches = {
            closingTags: [],
            openTags: [],
        };
        const inlineTagPatterns = [
            `{{%${shortcode.name}(?:(?=\\s).+?)?\\/%}}`,
            `{{<${shortcode.name}(?:(?=\\s).+?)?\\/>}}`,
        ];
        const openBlockTagPatterns = [
            `{{%${shortcode.name}(?:(?=\\s).+?)?%}}`,
            `{{<${shortcode.name}(?:(?=\\s).+?)?>}}`,
        ];
        const closeBlockTagPatterns = [
            `{{%/${shortcode.name}%}}`,
            `{{</${shortcode.name}>}}`,
        ];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isInlineTag = inlineTagPatterns.some((pattern) => line.match(new RegExp(pattern)));
            if (isInlineTag) {
                inlineMatches.push(i);
                continue;
            }
            const isOpenBlock = openBlockTagPatterns.some((pattern) => line.match(new RegExp(pattern)));
            if (isOpenBlock) {
                blockMatches.openTags.push(i);
                continue;
            }
            const isCloseBlock = closeBlockTagPatterns.some((pattern) => line.match(new RegExp(pattern)));
            if (isCloseBlock) {
                blockMatches.closingTags.push(i);
            }
        }
        const blockPairs = (0, convertShortcodeBlockMatchesToPairs_1.convertShortcodeBlockMatchesToPairs)(blockMatches);
        inlineMatches.forEach((match) => {
            let inlineShift = 0;
            inlineTagPatterns.forEach((pattern) => {
                Array.from(lines[match].matchAll(new RegExp(pattern, 'g')), (inlineShortcode) => {
                    const index = (inlineShortcode.index || 0) + inlineShift;
                    const lastIndex = index + inlineShortcode[0].length;
                    const params = (0, getShortcodeAttributes_1.getShortcodeAttributes)(shortcode.name, lines[match].substr(index, inlineShortcode[0].length), markdownParser);
                    const content = renderer.render({ content: '', params }, {
                        baseTemplate: shortcode.template,
                        stripNewlines: true,
                    });
                    inlineShift -= inlineShortcode[0].length - content.length;
                    lines[match] = `${lines[match].substr(0, index)}${content}${lines[match].substr(lastIndex, lines[match].length)}`;
                });
            });
        });
        let blockShift = 0;
        blockPairs.forEach((pair) => {
            const pairLength = pair[1] - pair[0];
            let pairContent = lines
                .slice(pair[0] + 1 + blockShift, pair[1] + blockShift)
                .join('\n');
            pairContent = (0, exports.parseShortcodes)({
                content: pairContent,
                markdownParser,
                renderer,
                shortcodes,
            }).trim();
            if (lines[pair[0] + blockShift].includes('%')) {
                pairContent = markdownParser.parse(pairContent).content;
            }
            const params = (0, getShortcodeAttributes_1.getShortcodeAttributes)(shortcode.name, lines[pair[0] + blockShift], markdownParser);
            const renderedContent = renderer
                .render({ content: pairContent, params }, {
                baseTemplate: shortcode.template,
                stripNewlines: true,
            })
                .trim();
            lines.splice(pair[0] + blockShift, pairLength + 1, renderedContent);
            blockShift -= pairLength;
        });
    });
    return lines.join('\n');
};
exports.parseShortcodes = parseShortcodes;
