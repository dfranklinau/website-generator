"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const findFiles = __importStar(require("./findFiles"));
const readFile = __importStar(require("./readFile"));
const getPartialTemplates_1 = require("./getPartialTemplates");
tape_1.default('`getPartialTemplates`', async (t) => {
    const findFilesStub = sinon_1.default.stub(findFiles, 'findFiles');
    const readFileStub = sinon_1.default.stub(readFile, 'readFile');
    findFilesStub.returns(['./templates/_partials/partial.hbs']);
    readFileStub
        .withArgs('./templates/_partials/partial.hbs')
        .resolves('<p>Partial</p>');
    const partials = await getPartialTemplates_1.getPartialTemplates();
    t.deepEqual(partials, {
        partial: '<p>Partial</p>',
    }, 'returns a formatted object of partial names and templates');
    findFilesStub.restore();
    readFileStub.restore();
    t.end();
});
