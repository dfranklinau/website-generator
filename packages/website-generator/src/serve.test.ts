import http from 'http';
import sinon from 'sinon';
import test from 'node:test';
import * as ws from 'ws';

import { serve } from './serve';

test('`serve`', (t: test.TestContext) => {
  t.todo('creates HTTP and WebSocket servers');
  t.todo('calls `generate` and emits a `reload` event when watched files are changed');
});
