import test from 'node:test';

import { getContentOutputPath } from './getContentOutputPath';

test('`getContentOutputPath`', (t: test.TestContext) => {
  t.assert.equal(
    getContentOutputPath('./content/_index.md', null),
    'build/index.html',
    'gets the content output path for a section',
  );

  t.assert.equal(
    getContentOutputPath('./content/index.md', null),
    'build/index.html',
    'gets the content output path for an index page',
  );

  t.assert.equal(
    getContentOutputPath('./content/page.md', null),
    'build/page/index.html',
    'gets the content output path for a page',
  );

  t.assert.equal(
    getContentOutputPath('./content/section/_index.md', null),
    'build/section/index.html',
    'gets the content output path for a nested section',
  );

  t.assert.equal(
    getContentOutputPath('./content/section/index.md', null),
    'build/section/index.html',
    'gets the content output path for a nested index page',
  );

  t.assert.equal(
    getContentOutputPath('./content/section/page.md', null),
    'build/section/page/index.html',
    'gets the content output path for a nested page',
  );

  t.assert.equal(
    getContentOutputPath('./content/section/page.md', {
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
    'build/section/page/index.html',
    'gets the content output path for a nested page with a section whose url is empty',
  );

  t.assert.equal(
    getContentOutputPath('./content/section/page.md', {
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
      outputURL: './build/',
    }),
    'build/page/index.html',
    'gets the content output path for a nested page in a section whose url is a trailing slash',
  );

  t.assert.equal(
    getContentOutputPath('./content/section/page.md', {
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
      outputURL: './build/',
    }),
    'build/override/page/index.html',
    'gets the content output path for a nested page in a section whose url is a replacement string',
  );

});
