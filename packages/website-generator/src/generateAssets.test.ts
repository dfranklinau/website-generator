import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { generateAssets } from './generateAssets';

test('`generateAssets`', async (t: test.Test) => {
  const readdirSync = sinon.stub(fs, 'readdirSync');
  const readFile = sinon.stub(fs.promises, 'readFile');
  const existsSync = sinon.stub(fs, 'existsSync');
  const mkdirSync = sinon.stub(fs, 'mkdirSync');
  const writeFileSync = sinon.stub(fs, 'writeFileSync');
  existsSync.returns(true);

  readdirSync.withArgs('./assets/', { withFileTypes: true }).returns([
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'style.css',
    },
  ]);

  readFile.withArgs('./assets/style.css').resolves('.css { color: blue; }');

  await generateAssets();

  t.ok(
    mkdirSync.calledWith('./build', { recursive: true }),
    'makes the `./build/` directory',
  );
  t.ok(
    writeFileSync.calledWith('./build/style.css', '.css { color: blue; }'),
    'creates a new file called `./build/style.css`',
  );

  readdirSync.restore();
  readFile.restore();
  existsSync.restore();
  mkdirSync.restore();
  writeFileSync.restore();
  t.end();
});
