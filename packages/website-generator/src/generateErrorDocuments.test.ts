import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { Renderer } from './Renderer';
import { generateErrorDocuments } from './generateErrorDocuments';

const renderer = new Renderer({
  baseTemplate: '<title>{{head.title}}</title> {{&content}}',
  config: {},
  partials: {},
});

test('`generateErrorDocuments`', async (t: test.Test) => {
  const readFileStub = sinon.stub(fs.promises, 'readFile');
  const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');

  readFileStub.withArgs('./templates/_404.hbs').resolves('<h1>404</h1>');

  await generateErrorDocuments({
    config: {},
    renderer,
  });

  t.ok(readFileStub.calledWith('./templates/_404.hbs'), 'retrieves the contents of the `_404.hbs` template file');
  t.ok(writeFileSyncStub.calledWith('./build/404.html', '<title>404</title> <h1>404</h1>'), 'writes a `404.html` file to the build directory with template content and a default title');

  await generateErrorDocuments({
    config: {
      errorDocument404Title: 'Error Document 404 Title', 
    },
    renderer,
  });

  t.ok(writeFileSyncStub.calledWith('./build/404.html', '<title>Error Document 404 Title</title> <h1>404</h1>'), 'writes a `404.html` file to the build directory with template content and a title defined in configuration');

  readFileStub.restore();
  writeFileSyncStub.restore();
  t.end();
});
