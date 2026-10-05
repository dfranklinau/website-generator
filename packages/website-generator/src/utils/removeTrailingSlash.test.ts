import test from 'node:test';

import { removeTrailingSlash } from './removeTrailingSlash';

test('`removeTrailingSlash`', (t: test.TestContext) => {
  t.assert.equal(
    removeTrailingSlash('content/'),
    'content',
    'removes the trailing slash from a directory path',
  );

  t.assert.equal(
    removeTrailingSlash('content'),
    'content',
    'does not alter a directory path without a trailing slash',
  );

  t.assert.equal(
    removeTrailingSlash('./content/'),
    'content',
    'normalizes a directory path before removing trailing slashes',
  );

  t.assert.equal(
    removeTrailingSlash('content/file.md'),
    'content/file.md',
    'does not alter a file path to a file',
  );

});
