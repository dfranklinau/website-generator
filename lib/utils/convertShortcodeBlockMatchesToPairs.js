"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertShortcodeBlockMatchesToPairs = void 0;
const sortNumbersAscending = (a, b) => a - b;
const convertShortcodeBlockMatchesToPairs = (blockMatches) => {
    let pairs = [];
    if (blockMatches.closingTags.length !== blockMatches.openTags.length) {
        throw new Error('There is a mismatch between the number of open and closing tags');
    }
    const closingTags = [...blockMatches.closingTags.sort(sortNumbersAscending)];
    const openTags = [...blockMatches.openTags.sort(sortNumbersAscending)];
    while (closingTags.length > 0) {
        const openTagIndex = openTags.findIndex((tag) => tag > closingTags[closingTags.length - 1]);
        const openTag = openTagIndex > 0
            ? openTags[openTagIndex - 1] // Subtract one to get the previous open tag.
            : openTags[openTags.length - 1];
        let closeTag = closingTags[closingTags.length - 1];
        for (let i = closingTags.length - 2; i >= 0; i--) {
            if (closingTags[i] > openTag) {
                closeTag = closingTags[i];
                break;
            }
        }
        pairs.push([
            openTags.splice(openTags.indexOf(openTag), 1)[0],
            closingTags.splice(closingTags.indexOf(closeTag), 1)[0],
        ]);
    }
    // Remove any nested pairs.
    pairs = pairs.filter((pair) => {
        const open = pair[0];
        const close = pair[1];
        const isNested = pairs.some((nestedPair) => open > nestedPair[0] && close < nestedPair[1]);
        return !isNested;
    });
    if (openTags.length > 0) {
        openTags.forEach((tag) => {
            const isNested = pairs.some((pair) => pair.length === 2 && tag > pair[0] && tag < pair[1]);
            if (!isNested) {
                pairs.push([tag]);
            }
        });
    }
    return pairs.sort((a, b) => a[0] - b[0]);
};
exports.convertShortcodeBlockMatchesToPairs = convertShortcodeBlockMatchesToPairs;
