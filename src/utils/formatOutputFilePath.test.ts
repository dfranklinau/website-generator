import test from 'tape';

import { formatOutputFilePath } from './formatOutputFilePath';

test('`formatOutputFilePath`', (t: test.Test) => {
  const outputDirs = ['./build/', 'build', './build', '/build/'];

  outputDirs.forEach((outputDir) => {
    t.equal(
      formatOutputFilePath('./content/blog-post.md', outputDir),
      './build/blog-post.md',
      `replaces the root directory with the supplied output directory "${outputDir}"`
    );
  });

  t.equal(
    formatOutputFilePath('./content/directory/blog-post.md', './build/'),
    './build/directory/blog-post.md',
    `replaces the root directory with the supplied output directory for a nested file`
  );

  t.end();
});
