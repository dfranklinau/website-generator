import test from 'node:test';

import { stripnewlinesHelper } from './stripnewlinesHelper';

test('`stripnewlinesHelper`', (t: test.TestContext) => {
  t.assert.equal(
    stripnewlinesHelper(`this
is
multiline
text`).string,
    'this is multiline text',
    'removes all newlines from a string of a text',
  );
});
