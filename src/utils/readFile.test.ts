import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { readFile } from './readFile';

const mockJSON = `{
  "key": "value"
}`;

test('`readFile`', async (t: test.Test) => {
  const readFileStub = sinon.stub(fs.promises, 'readFile');

  readFileStub.withArgs('./file.txt').resolves('file');
  readFileStub.withArgs('./error.txt').throws();
  readFileStub.withArgs('./data.json').resolves(mockJSON);

  t.ok(
    (await readFile('./file.txt')) === 'file',
    'returns the contents of a given file',
  );

  t.ok(
    (await readFile('./error.txt')) === null,
    'returns `null` for a file that does not exist',
  );

  t.ok(
    (await readFile('./error.txt', 'default')) === 'default',
    'returns a supplied default value for a file that does not exist',
  );

  t.deepEqual(
    await readFile('./data.json', {}, (data: string) => JSON.parse(data)),
    {
      key: 'value',
    },
    'runs a supplied callback on a file',
  );

  readFileStub.restore();
  t.end();
});
