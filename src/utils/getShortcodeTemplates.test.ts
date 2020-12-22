import sinon from 'sinon';
import test from 'tape';

import * as findFiles from './findFiles';
import * as readFile from './readFile';

import { getShortcodeTemplates } from './getShortcodeTemplates';

test('`getShortcodeTemplates`', async (t: test.Test) => {
  const findFilesStub = sinon.stub(findFiles, 'findFiles');
  const readFileStub = sinon.stub(readFile, 'readFile');

  findFilesStub.returns([
    './shortcodes/shortcode.hbs',
    './shortcodes/shortcode-with-attribute.hbs',
  ]);
  readFileStub
    .withArgs('./shortcodes/shortcode.hbs')
    .resolves('<p>Shortcode</p>')
    .withArgs('./shortcodes/shortcode-with-attribute.hbs')
    .resolves('<p>Shortcode with attribute</p>');

  const shortcodes = await getShortcodeTemplates();

  t.deepEqual(
    shortcodes,
    [
      {
        name: 'shortcode',
        template: '<p>Shortcode</p>',
      },
      {
        name: 'shortcode-with-attribute',
        template: '<p>Shortcode with attribute</p>',
      },
    ],
    'returns an array of shortcode names and templates'
  );

  findFilesStub.restore();
  readFileStub.restore();
  t.end();
});
