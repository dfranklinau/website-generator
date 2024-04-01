import test from 'tape';

import { serve } from './serve';

test('`serve`', (t: test.Test) => {
  serve();
  t.end();
});
