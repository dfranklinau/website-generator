import test from 'tape';

import { removeTrailingSlash } from './removeTrailingSlash';

test('`removeTrailingSlash`', (t: test.Test) => {
  t.equal(
    removeTrailingSlash('./content/'),
    './content',
    'removes the trailing slash from a directory path'
  );

  t.equal(
    removeTrailingSlash('./content'),
    './content',
    'does not alter a directory path without a trailing slash'
  );

  t.equal(
    removeTrailingSlash('./content/file.md'),
    './content/file.md',
    'does not alter a file path to a file'
  );

  t.end();
});
