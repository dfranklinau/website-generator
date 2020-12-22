import test from 'tape';

import { getContentOutputURL } from './getContentOutputURL';

test('`getContentOutputURL`', (t: test.Test) => {
  t.equal(
    getContentOutputURL('./content/_index.md', null),
    '/',
    'gets the content output URL for a section'
  );

  t.equal(
    getContentOutputURL('./content/index.md', null),
    '/',
    'gets the content output URL for an index page'
  );

  t.equal(
    getContentOutputURL('./content/page.md', null),
    '/page/',
    'gets the content output URL for a page'
  );

  t.equal(
    getContentOutputURL('./content/section/_index.md', null),
    '/section/',
    'gets the content output URL for a nested section'
  );

  t.equal(
    getContentOutputURL('./content/section/index.md', null),
    '/section/',
    'gets the content output URL for a nested index page'
  );

  t.equal(
    getContentOutputURL('./content/section/page.md', null),
    '/section/page/',
    'gets the content output URL for a nested page'
  );

  t.equal(
    getContentOutputURL('./content/section/page.md', {
      filePath: './content/section/_index.md',
      markdown: {
        content: '',
        matter: {},
        options: {
          menu: false,
          toc: false,
          url: '',
        },
      },
      name: '_index.md',
      outputPath: './build/index.html',
      outputURL: '/build/',
    }),
    '/section/page/',
    'gets the content output URL for a nested page with a section whose url is empty'
  );

  t.equal(
    getContentOutputURL('./content/section/page.md', {
      filePath: './content/section/_index.md',
      markdown: {
        content: '',
        matter: {},
        options: {
          menu: false,
          toc: false,
          url: '/',
        },
      },
      name: '_index.md',
      outputPath: './build/index.html',
      outputURL: '/build/',
    }),
    '/page/',
    'gets the content output URL for a nested page in a section whose url is a trailing slash'
  );

  t.equal(
    getContentOutputURL('./content/section/page.md', {
      filePath: './content/section/_index.md',
      markdown: {
        content: '',
        matter: {},
        options: {
          menu: false,
          toc: false,
          url: 'override',
        },
      },
      name: '_index.md',
      outputPath: './build/index.html',
      outputURL: '/build/',
    }),
    '/override/page/',
    'gets the content output URL for a nested page in a section whose url is a replacement string'
  );

  t.end();
});
