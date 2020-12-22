import test from 'tape';

import { getPageTitle } from './getPageTitle';
import { mockParsedMarkdown } from '../_fixtures';

import type { PreparedContentType } from '../prepareContent';

test('`getPageTitle`', (t: test.Test) => {
  const content: PreparedContentType = {
    filePath: '/section/page.md',
    markdown: {
      ...mockParsedMarkdown,
      matter: {
        title: 'Page',
      },
    },
    name: 'page.md',
    outputPath: '/section/page/index.html',
    outputURL: '/section/page/',
  };

  const section = {
    filePath: '/section/_index.md',
    markdown: {
      ...mockParsedMarkdown,
      matter: {
        title: 'Section',
      },
    },
    name: '_index.md',
    outputPath: '/section/index.html',
    outputURL: '/section/',
  };

  // @TODO: write more tests here to cover more cases.
  t.equal(
    getPageTitle(content, section),
    'Page / Section',
    'gets a page title'
  );

  t.equal(getPageTitle(section, section), 'Section', 'gets a page title');

  t.end();
});
