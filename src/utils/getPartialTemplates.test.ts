import sinon from 'sinon';
import test from 'tape';

import * as findFiles from './findFiles';
import * as readFile from './readFile';

import { getPartialTemplates } from './getPartialTemplates';

test('`getPartialTemplates`', async (t: test.Test) => {
  const findFilesStub = sinon.stub(findFiles, 'findFiles');
  const readFileStub = sinon.stub(readFile, 'readFile');

  findFilesStub.returns(['./templates/_partials/partial.hbs']);
  readFileStub
    .withArgs('./templates/_partials/partial.hbs')
    .resolves('<p>Partial</p>');

  const partials = await getPartialTemplates();

  t.deepEqual(
    partials,
    {
      partial: '<p>Partial</p>',
    },
    'returns a formatted object of partial names and templates'
  );

  findFilesStub.restore();
  readFileStub.restore();
  t.end();
});
