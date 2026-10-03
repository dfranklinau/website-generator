import test from 'node:test';

import { getPageTitle } from './getPageTitle';
import { mockParsedMarkdown } from '../_fixtures';

import type { PreparedContentType } from '../prepareContent';

test('`getPageTitle`', (t: test.TestContext) => {
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

  t.assert.equal(
    getPageTitle(page),
    'Page',
    "returns a page's front matter as the title",
  );

  t.assert.equal(
    getPageTitle({
      ...page,
      markdown: {
        ...page.markdown,
        matter: {
          title: undefined,
        }
      }
    }),
    '',
    'returns an empty string when no there is no title defined in the front matter',
  );

});
