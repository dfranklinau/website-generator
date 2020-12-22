import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { copyFiles } from './copyFiles';

test('`copyFiles`', (t: test.Test) => {
  const mkdirSync = sinon.stub(fs, 'mkdirSync');
  const copyFileSync = sinon.stub(fs, 'copyFileSync');

  const files = ['./static/image.jpg', './static/js/main.js'];

  copyFiles(files, './build/');

  t.ok(mkdirSync.calledTwice, '`mkdirSync` should be called three times');

  t.ok(copyFileSync.calledTwice, '`copyFileSync` should be called three times');

  t.ok(
    mkdirSync.calledWith('./build', { recursive: true }),
    'creates the provided destination folder'
  );
  t.ok(
    mkdirSync.calledWith('./build/js', { recursive: true }),
    'creates the provided destination folder, with nesting'
  );
  t.ok(
    copyFileSync.calledWith('./static/image.jpg', './build/image.jpg'),
    'copies the supplied file to the destination folder'
  );
  t.ok(
    copyFileSync.calledWith('./static/js/main.js', './build/js/main.js'),
    'copies the supplied file to the destination folder, with nesting'
  );

  mkdirSync.restore();
  copyFileSync.restore();
  t.end();
});
