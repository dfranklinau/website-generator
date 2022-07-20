import test from 'tape';

import { sortHelper } from './sortHelper';

const options = {
  fn: (item: { property: string }) => `<li>${item.property}</li>`,
};

const nestedOptions = {
  fn: (item: { property: { nested: string } }) =>
    `<li>${item.property.nested}</li>`,
};

test('`sortHelper`', (t: test.Test) => {
  t.equal(
    sortHelper(
      [{ property: 'c' }, { property: 'a' }, { property: 'b' }],
      'property',
      {
        ...options,
        hash: {
          ascending: true,
        },
      },
    ),
    '<li>a</li><li>b</li><li>c</li>',
    'returns a Handlebars.js string in ascending order',
  );
  t.equal(
    sortHelper(
      [{ property: 'c' }, { property: 'a' }, { property: 'b' }],
      'property',
      options,
    ),
    '<li>c</li><li>b</li><li>a</li>',
    'returns a Handlebars.js string in descending order',
  );
  t.equal(
    sortHelper(
      [{ property: 'c' }, { property: 'a' }, { property: 'b' }],
      'unknown',
      options,
    ),
    '<li>c</li><li>a</li><li>b</li>',
    'returns a Handlebars.js string in the order if the sort property does not exist',
  );
  t.equal(
    sortHelper(
      [
        { property: { nested: 'c' } },
        { property: { nested: 'a' } },
        { property: { nested: 'b' } },
      ],
      'property.nested',
      {
        ...nestedOptions,
        hash: {
          ascending: true,
        },
      },
    ),
    '<li>a</li><li>b</li><li>c</li>',
    'returns a Handlebars.js string in ascending order for nested properties',
  );
  t.equal(
    sortHelper(
      [
        { property: { nested: 'c' } },
        { property: { nested: 'a' } },
        { property: { nested: 'b' } },
      ],
      'property.nested',
      nestedOptions,
    ),
    '<li>c</li><li>b</li><li>a</li>',
    'returns a Handlebars.js string in descending order for nested properties',
  );
  t.equal(
    sortHelper(
      [
        { property: { nested: 'c' } },
        { property: { nested: 'a' } },
        { property: { nested: 'b' } },
      ],
      'property.unknown',
      nestedOptions,
    ),
    '<li>c</li><li>a</li><li>b</li>',
    'returns a Handlebars.js string in the order if the nested sort property does not exist',
  );
  t.end();
});
