"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sinon_1 = __importDefault(require("sinon"));
const tape_1 = __importDefault(require("tape"));
const readFile_1 = require("./readFile");
const mockJSON = `{
  "key": "value"
}`;
(0, tape_1.default)('`readFile`', async (t) => {
    const readFileStub = sinon_1.default.stub(fs_1.default.promises, 'readFile');
    readFileStub.withArgs('./file.txt').resolves('file');
    readFileStub.withArgs('./error.txt').throws();
    readFileStub.withArgs('./data.json').resolves(mockJSON);
    t.ok((await (0, readFile_1.readFile)('./file.txt')) === 'file', 'returns the contents of a given file');
    t.ok((await (0, readFile_1.readFile)('./error.txt')) === null, 'returns `null` for a file that does not exist');
    t.ok((await (0, readFile_1.readFile)('./error.txt', 'default')) === 'default', 'returns a supplied default value for a file that does not exist');
    t.deepEqual(await (0, readFile_1.readFile)('./data.json', {}, (data) => JSON.parse(data)), {
        key: 'value',
    }, 'runs a supplied callback on a file');
    readFileStub.restore();
    t.end();
});
