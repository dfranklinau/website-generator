import test from 'node:test';

import { dateformatHelper } from './dateformatHelper';

test('`dateformatHelper`', (t: test.TestContext) => {
  t.assert.equal(
    dateformatHelper('2021-01-30T10:10:10Z', 'D MMMM YYYY').string,
    '30 January 2021',
    'returns a formatted date',
  );
  t.assert.equal(
    dateformatHelper('2021-01-30T10:10:10Z', 'd m y').string,
    '2021-01-30T10:10:10Z',
    'returns the supplied date if an unsupported format option is supplied',
  );
});
