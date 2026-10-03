import test from 'node:test';

import { formatOutputFilePath } from './formatOutputFilePath';

test('`formatOutputFilePath`', (t: test.TestContext) => {
  const outputDirs = ['./build/', 'build', './build', '/build/'];

  outputDirs.forEach((outputDir) => {
    t.assert.equal(
      formatOutputFilePath('./content/blog-post.md', outputDir),
      './build/blog-post.md',
      `replaces the root directory with the supplied output directory "${outputDir}"`,
    );
  });

  t.assert.equal(
    formatOutputFilePath('./content/directory/blog-post.md', './build/'),
    './build/directory/blog-post.md',
    `replaces the root directory with the supplied output directory for a nested file`,
  );

});
