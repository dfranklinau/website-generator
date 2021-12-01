import test from 'tape';

import { dateformatHelper } from './dateformatHelper';

test('`dateformatHelper`', (t: test.Test) => {
  t.equal(
    dateformatHelper('2021-01-30T10:10:10Z', 'D MMMM YYYY').string,
    '30 January 2021',
    'returns a formatted date',
  );
  t.equal(
    dateformatHelper('2021-01-30T10:10:10Z', 'd m y').string,
    '2021-01-30T10:10:10Z',
    'returns the supplied date if an unsupported format option is supplied',
  );
  t.end();
});
