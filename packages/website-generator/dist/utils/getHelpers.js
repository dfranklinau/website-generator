"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpers = void 0;
const path_1 = __importDefault(require("path"));
const findFiles_1 = require("./findFiles");
const constants_1 = require("../config/constants");
const getHelpers = () => {
    const helperFiles = (0, findFiles_1.findFiles)(`${constants_1.DIRECTORIES.HELPERS}`, {
        match: /\.js$/,
        recursive: true,
    });
    const helpers = helperFiles.map((file) => {
        const resolvedPath = path_1.default.resolve(process.cwd(), file);
        const name = file.match(/\/helpers\/(.*)\.js$/);
        if (Array.isArray(name) && name[1]) {
            try {
                const module = require(resolvedPath);
                return {
                    func: module,
                    name: name[1].replace(/\//g, '-'),
                };
            }
            catch (error) {
                throw new Error(`Could not load helper at ${file}. See below message for details:\n\n ${error}`);
            }
        }
        return null;
    });
    return helpers.reduce((acc, curr) => {
        if (curr) {
            acc[curr.name] = curr.func;
        }
        return acc;
    }, {});
};
exports.getHelpers = getHelpers;
//# sourceMappingURL=getHelpers.js.map