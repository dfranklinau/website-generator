import test from 'tape';

import { stripnewlinesHelper } from './stripnewlinesHelper';

test('`stripnewlinesHelper`', (t: test.Test) => {
  t.equal(stripnewlinesHelper(`this
is
multiline
text`).string, 'this is multiline text', 'removes all newlines from a string of a text');
  t.end();
});

