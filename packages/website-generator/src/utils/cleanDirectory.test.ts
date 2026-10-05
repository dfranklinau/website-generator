import fs from 'fs';
import sinon from 'sinon';
import test from 'node:test';

import { cleanDirectory } from './cleanDirectory';

test('`cleanDirectory`', (t: test.TestContext) => {
  const mkdirSync = sinon.stub(fs, 'mkdirSync');
  const rmSync = sinon.stub(fs, 'rmSync');

  cleanDirectory('build');

  t.assert.ok(
    rmSync.calledWith('build', { force: true, recursive: true }),
    'removes the directory',
  );
  t.assert.ok(mkdirSync.calledWith(), 'recreates the directory');

  mkdirSync.restore();
  rmSync.restore();
});
