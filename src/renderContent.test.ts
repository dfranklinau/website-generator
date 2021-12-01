import fs from 'fs';
import test from 'tape';
import sinon from 'sinon';

import { mockPreparedContent } from './_fixtures';

import { Renderer } from './Renderer';
import { renderContent } from './renderContent';

test('`renderContent`', (t: test.Test) => {
  const copyFileSyncStub = sinon.stub(fs, 'copyFileSync');
  const mkdirSyncStub = sinon.stub(fs, 'mkdirSync');
  const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');

  renderContent({
    content: mockPreparedContent.tree,
    globalMatter: {},
    renderer: new Renderer({ baseTemplate: '', config: {}, partials: {} }),
  });

  t.equal(
    copyFileSyncStub.callCount,
    3,
    'calls `copyFileSync` for all assets being copied alongside Markdown',
  );
  t.equal(
    mkdirSyncStub.callCount,
    9,
    'calls `mkdirSync` for all Markdown and assets',
  );
  t.equal(
    writeFileSyncStub.callCount,
    6,
    'calls `writeFileSync` for all Markdown being rendered',
  );

  t.ok(
    copyFileSyncStub.calledWith('./content/asset.jpg', './build/asset.jpg'),
    'copied the root asset',
  );
  t.ok(
    copyFileSyncStub.calledWith(
      './content/directory/asset.jpg',
      './build/directory/asset.jpg',
    ),
    'copied the child asset',
  );
  t.ok(
    copyFileSyncStub.calledWith(
      './content/directory/nested/asset.jpg',
      './build/directory/nested/asset.jpg',
    ),
    'copied the child asset of a child',
  );

  t.ok(
    mkdirSyncStub.calledWith('./build'),
    'created a root directory for the content',
  );
  t.ok(
    mkdirSyncStub.calledWith('./build/directory'),
    'created a directory for child content',
  );
  t.ok(
    mkdirSyncStub.calledWith('./build/directory/nested'),
    'created a directory for the child content of a child',
  );

  t.ok(
    writeFileSyncStub.calledWith('./build/index.html'),
    'created the index HTML file',
  );
  t.ok(
    writeFileSyncStub.calledWith('./build/page/index.html'),
    'created the page HTML file',
  );
  t.ok(
    writeFileSyncStub.calledWith('./build/directory/index.html'),
    'created the child index HTML file',
  );
  t.ok(
    writeFileSyncStub.calledWith('./build/directory/page/index.html'),
    'created the child page HTML file',
  );
  t.ok(
    writeFileSyncStub.calledWith('./build/directory/nested/index.html'),
    'created the child index HTML file of a child',
  );
  t.ok(
    writeFileSyncStub.calledWith('./build/directory/nested/page/index.html'),
    'created the child page HTML file of a child',
  );

  copyFileSyncStub.restore();
  mkdirSyncStub.restore();
  writeFileSyncStub.restore();
  t.end();
});
