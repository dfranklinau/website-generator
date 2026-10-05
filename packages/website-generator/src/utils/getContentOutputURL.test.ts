import test from 'node:test';

import { getContentOutputURL } from './getContentOutputURL';

test('`getContentOutputURL`', (t: test.TestContext) => {
  t.assert.equal(
    getContentOutputURL('content/_index.md', null),
    '/',
    'gets the content output URL for a section',
  );

  t.assert.equal(
    getContentOutputURL('content/index.md', null),
    '/',
    'gets the content output URL for an index page',
  );

  t.assert.equal(
    getContentOutputURL('content/page.md', null),
    '/page/',
    'gets the content output URL for a page',
  );

  t.assert.equal(
    getContentOutputURL('content/section/_index.md', null),
    '/section/',
    'gets the content output URL for a nested section',
  );

  t.assert.equal(
    getContentOutputURL('content/section/index.md', null),
    '/section/',
    'gets the content output URL for a nested index page',
  );

  t.assert.equal(
    getContentOutputURL('content/section/page.md', null),
    '/section/page/',
    'gets the content output URL for a nested page',
  );

  t.assert.equal(
    getContentOutputURL('content/section/page.md', {
      filePath: 'content/section/_index.md',
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
      outputPath: 'build/index.html',
      outputURL: '/build/',
    }),
    '/section/page/',
    'gets the content output URL for a nested page with a section whose url is empty',
  );

  t.assert.equal(
    getContentOutputURL('content/section/page.md', {
      filePath: 'content/section/_index.md',
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
      outputPath: 'build/index.html',
      outputURL: '/build/',
    }),
    '/page/',
    'gets the content output URL for a nested page in a section whose url is a trailing slash',
  );

  t.assert.equal(
    getContentOutputURL('content/section/page.md', {
      filePath: 'content/section/_index.md',
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
      outputPath: 'build/index.html',
      outputURL: '/build/',
    }),
    '/override/page/',
    'gets the content output URL for a nested page in a section whose url is a replacement string',
  );

});
