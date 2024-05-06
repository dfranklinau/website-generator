import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { generateStaticFiles } from './generateStaticFiles';

const stubReaddirSync = () => {
  const readdirSync = sinon.stub(fs, 'readdirSync');

  readdirSync.withArgs('./static/', { withFileTypes: true }).returns([
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'script.js',
    },
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => false,
      isDirectory: () => true,
      name: 'images',
    },
  ]);

  readdirSync.withArgs('./static/images/', { withFileTypes: true }).returns([
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'image.jpg',
    },
  ]);

  return readdirSync;
};

test('`generateStaticFiles`', (t: test.Test) => {
  const readdirSync = stubReaddirSync();
  const existsSync = sinon.stub(fs, 'existsSync');
  const copyFileSync = sinon.stub(fs, 'copyFileSync');
  existsSync.returns(true);

  generateStaticFiles();
  t.ok(copyFileSync.calledWith('./static/script.js', './build/script.js'), 'copies a static file to the destination folder');
  t.ok(copyFileSync.calledWith('./static/images/image.jpg', './build/images/image.jpg'), 'copies a static file to the destination folder, with nesting');

  readdirSync.restore();
  existsSync.restore();
  copyFileSync.restore();
  t.end();
});
