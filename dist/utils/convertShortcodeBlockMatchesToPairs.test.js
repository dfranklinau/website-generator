"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const convertShortcodeBlockMatchesToPairs_1 = require("./convertShortcodeBlockMatchesToPairs");
(0, tape_1.default)('`convertShortcodeBlockMatchesToPairs`', (t) => {
    t.throws(() => {
        (0, convertShortcodeBlockMatchesToPairs_1.convertShortcodeBlockMatchesToPairs)({
            closingTags: [],
            openTags: [1, 2, 3, 4],
        });
    }, 'throws an error if there are more open tags than closing tags');
    t.throws(() => {
        (0, convertShortcodeBlockMatchesToPairs_1.convertShortcodeBlockMatchesToPairs)({
            closingTags: [1, 2, 3, 4],
            openTags: [],
        });
    }, 'throws if there are more closing tags than open tags');
    t.throws(() => {
        (0, convertShortcodeBlockMatchesToPairs_1.convertShortcodeBlockMatchesToPairs)({
            closingTags: [2, 4],
            openTags: [1, 3, 5],
        });
    }, 'throws if there is a mismatch beween the number of open and closing tags');
    t.deepEqual((0, convertShortcodeBlockMatchesToPairs_1.convertShortcodeBlockMatchesToPairs)({
        closingTags: [2, 4, 6],
        openTags: [1, 3, 5],
    }), [
        [1, 2],
        [3, 4],
        [5, 6],
    ], 'converts a series of open and close tags to pairs');
    t.deepEqual((0, convertShortcodeBlockMatchesToPairs_1.convertShortcodeBlockMatchesToPairs)({
        closingTags: [6, 11, 15],
        openTags: [1, 5, 10],
    }), [[1, 15]], 'converts a series of open and closing tags to pairs, flattening any nested pairs');
    t.end();
});
