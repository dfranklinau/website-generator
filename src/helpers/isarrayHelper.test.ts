import test from 'tape';

import { isarrayHelper } from './isarrayHelper';

const options = {
  data: {
    root: '',
  },
  fn: () => true,
  inverse: () => false,
};

test('`isarrayHelper`', (t: test.Test) => {
  t.equal(
    isarrayHelper([], options),
    true,
    'returns `true` if the value is an array',
  );
  t.equal(
    isarrayHelper('string', options),
    false,
    'returns `false` if the value is not an array',
  );
  t.end();
});
