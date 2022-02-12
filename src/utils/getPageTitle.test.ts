import test from 'tape';

import { getPageTitle } from './getPageTitle';
import { mockParsedMarkdown } from '../_fixtures';

import type { PreparedContentType } from '../prepareContent';

test('`getPageTitle`', (t: test.Test) => {
  const page: PreparedContentType = {
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

  const section: PreparedContentType = {
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

  t.equal(
    getPageTitle(page, section),
    'Page / Section',
    "builds a page title using a page's section data",
  );

  t.equal(
    getPageTitle(section, section),
    'Section',
    'builds a page title even if the content and section are identical',
  );

  t.equal(
    getPageTitle(page, null),
    'Page',
    'builds a page title if no section is specified',
  );

  t.end();
});
