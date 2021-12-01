import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { saveContentToFile } from './saveContentToFile';

test('`saveContentToFile`', (t: test.Test) => {
  const mkdirSync = sinon.stub(fs, 'mkdirSync');
  const writeFileSync = sinon.stub(fs, 'writeFileSync');

  saveContentToFile('content', './build/index.html');

  t.ok(
    mkdirSync.calledWith('./build', { recursive: true }),
    'makes the `./build/` directory',
  );
  t.ok(
    writeFileSync.calledWith('./build/index.html', 'content'),
    'creates a new file called `./build/index.html`',
  );

  mkdirSync.resetHistory();
  writeFileSync.resetHistory();

  saveContentToFile('content', './build/directory/index.html');

  t.ok(
    mkdirSync.calledWith('./build/directory', { recursive: true }),
    'recursively makes the `./build/directory/` directory',
  );
  t.ok(
    writeFileSync.calledWith('./build/directory/index.html', 'content'),
    'creates a new file called `./build/directory/index.html`',
  );

  mkdirSync.resetHistory();
  writeFileSync.resetHistory();

  saveContentToFile('content', './build/directory/content/index.html');

  t.ok(
    mkdirSync.calledWith('./build/directory/content', { recursive: true }),
    'recursively makes the `./build/directory/content/` directory',
  );
  t.ok(
    writeFileSync.calledWith('./build/directory/content/index.html', 'content'),
    'creates a new file called `./build/directory/context/index.html`',
  );

  mkdirSync.restore();
  writeFileSync.restore();
  t.end();
});
