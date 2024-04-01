import http from 'http';
import sinon from 'sinon';
import test from 'tape';
import * as ws from 'ws';

import { serve } from './serve';

test('`serve`', (t: test.Test) => {
  t.skip('creates HTTP and WebSocket servers');
  t.skip('calls `generate` and emits a `reload` event when watched files are changed');
  t.end();
});
