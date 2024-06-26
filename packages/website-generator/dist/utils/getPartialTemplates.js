"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialTemplates = void 0;
const findFiles_1 = require("./findFiles");
const readFile_1 = require("./readFile");
const constants_1 = require("../config/constants");
const getPartialTemplates = async () => {
    const partialTemplates = (0, findFiles_1.findFiles)(`${constants_1.DIRECTORIES.TEMPLATES}_partials/`, {
        match: /\.hbs/,
        recursive: true,
    });
    const partials = await partialTemplates.map(async (file) => {
        const name = file.match(/\/_partials\/(.*)\.hbs/);
        if (Array.isArray(name) && name[1]) {
            return {
                data: (await (0, readFile_1.readFile)(file)),
                name: name[1].replace(/\//g, '-'),
            };
        }
        return null;
    });
    return Promise.all(partials).then((values) => {
        return values.reduce((acc, curr) => {
            if (curr) {
                acc[curr.name] = curr.data;
            }
            return acc;
        }, {});
    });
};
exports.getPartialTemplates = getPartialTemplates;
//# sourceMappingURL=getPartialTemplates.js.map