import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { cleanDirectory } from './cleanDirectory';

test('`cleanDirectory`', (t: test.Test) => {
  const mkdirSync = sinon.stub(fs, 'mkdirSync');
  const rmSync = sinon.stub(fs, 'rmSync');

  cleanDirectory('./build/');

  t.ok(rmSync.calledWith('./build/', { force: true, recursive: true }), 'removes the directory');
  t.ok(mkdirSync.calledWith(), 'recreates the directory');

  mkdirSync.restore();
  rmSync.restore();
  t.end();
});
