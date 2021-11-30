import test from 'tape';

import { equalHelper } from './equalHelper';

const options = {
  data: {
    root: ''
  },
  fn: () => true,
  inverse: () => false
};

test('`equalHelper`', (t: test.Test) => {
  t.equal(equalHelper(1, 1, options), true, 'returns `true` if two values are equal');
  t.equal(equalHelper(1, 2, options), false, 'returns `false` if two values do not equal');
  t.equal(equalHelper(1, '1', options), false, 'uses strict equality');
  t.end();
});
