import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { findFiles } from './findFiles';

const stubReaddirSync = () => {
  const readdirSync = sinon.stub(fs, 'readdirSync');

  readdirSync.withArgs('./content/', { withFileTypes: true }).returns([
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'index.md',
    },
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'image.jpg',
    },
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => false,
      isDirectory: () => true,
      name: 'blog',
    },
  ]);

  readdirSync.withArgs('./content/blog/', { withFileTypes: true }).returns([
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'index.md',
    },
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => true,
      name: 'blog-post-one.md',
    },
    // @ts-expect-error mimic a fs.Dirent type
    {
      isFile: () => false,
      isDirectory: () => true,
      name: 'blog-post-two',
    },
  ]);

  readdirSync
    .withArgs('./content/blog/blog-post-two/', { withFileTypes: true })
    .returns([
      // @ts-expect-error mimic a fs.Dirent type
      {
        isFile: () => true,
        name: 'index.md',
      },
      // @ts-expect-error mimic a fs.Dirent type
      {
        isFile: () => true,
        name: 'image.jpg',
      },
    ]);

  return readdirSync;
};

test('`findFiles`', (t: test.Test) => {
  const readdirSync = stubReaddirSync();

  let content;
  content = findFiles('./content/');

  t.equal(readdirSync.callCount, 1, '`readdirSync` should not be called');

  t.deepEqual(
    content,
    ['./content/index.md', './content/image.jpg'],
    'returns an array of files'
  );

  readdirSync.resetHistory();
  content = findFiles('./content/', { match: 'index.md' });

  t.deepEqual(
    content,
    ['./content/index.md'],
    'returns an array of files that match the given string'
  );

  readdirSync.resetHistory();
  content = findFiles('./content/', { match: /\.md$/ });

  t.deepEqual(
    content,
    ['./content/index.md'],
    'returns an array of files that match the given RegExp'
  );

  readdirSync.resetHistory();
  content = findFiles('./content/', { recursive: true });

  t.deepEqual(
    content,
    [
      './content/index.md',
      './content/image.jpg',
      './content/blog/index.md',
      './content/blog/blog-post-one.md',
      './content/blog/blog-post-two/index.md',
      './content/blog/blog-post-two/image.jpg',
    ],
    'returns an array of all files when `recursive` is specified'
  );

  readdirSync.resetHistory();
  content = findFiles('./content/', { match: 'index.md', recursive: true });

  t.deepEqual(
    content,
    [
      './content/index.md',
      './content/blog/index.md',
      './content/blog/blog-post-two/index.md',
    ],
    'returns an array of all files that match the given string when `recursive` is specified'
  );

  readdirSync.resetHistory();
  content = findFiles('./content/', { match: /\.md$/, recursive: true });

  t.deepEqual(
    content,
    [
      './content/index.md',
      './content/blog/index.md',
      './content/blog/blog-post-one.md',
      './content/blog/blog-post-two/index.md',
    ],
    'returns an array of all files that match the given RegExp when `recursive` is specified'
  );

  readdirSync.restore();
  t.end();
});
