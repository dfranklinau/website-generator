import test from 'node:test';

import { isarrayHelper } from './isarrayHelper';

const options = {
  data: {
    root: '',
  },
  fn: () => true,
  inverse: () => false,
};

test('`isarrayHelper`', (t: test.TestContext) => {
  t.assert.equal(
    isarrayHelper([], options),
    true,
    'returns `true` if the value is an array',
  );
  t.assert.equal(
    isarrayHelper('string', options),
    false,
    'returns `false` if the value is not an array',
  );
  t.assert.end();
});
