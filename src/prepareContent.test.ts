import test from 'tape';

import {
  mockParsedContent,
  mockParsedMarkdown,
  mockPreparedContent,
} from './_fixtures';

import { prepareContent } from './prepareContent';

test('`prepareContent`', (t: test.Test) => {
  const prepared = prepareContent({
    content: mockParsedContent,
  });

  t.deepEqual(
    prepared.list,
    mockPreparedContent.list,
    'prepares a list of all content'
  );

  t.deepEqual(
    prepared.tree,
    mockPreparedContent.tree,
    'prepares a content tree'
  );

  t.deepEqual(
    prepareContent({
      content: {
        ...mockParsedContent,
        children: {
          ...mockParsedContent.children,
          directory: {
            // @ts-expect-error: `mockPreparedContent.tree.children.directory` is defined and never `null`.
            ...mockParsedContent.children.directory,
            section: {
              filePath: './content/directory/_index.md',
              markdown: {
                ...mockParsedMarkdown,
                options: {
                  menu: false,
                  toc: false,
                  url: '/',
                },
              },
              name: '_index.md',
            },
          },
        },
      },
    }).list,
    [
      mockPreparedContent.list[0],
      mockPreparedContent.list[1],
      {
        ...mockPreparedContent.list[2],
        markdown: {
          ...mockParsedMarkdown,
          options: {
            menu: false,
            toc: false,
            url: '/',
          },
        },
        outputPath: './build/index.html',
        outputURL: '/',
      },
      {
        ...mockPreparedContent.list[3],
        outputPath: './build/page/index.html',
        outputURL: '/page/',
      },
      {
        ...mockPreparedContent.list[4],
        outputPath: './build/nested/index.html',
        outputURL: '/nested/',
      },
      {
        ...mockPreparedContent.list[5],
        outputPath: './build/nested/page/index.html',
        outputURL: '/nested/page/',
      },
    ],
    'prepares a list of all content where a section has a URL removal'
  );

  t.deepEqual(
    prepareContent({
      content: {
        ...mockParsedContent,
        children: {
          ...mockParsedContent.children,
          directory: {
            // @ts-expect-error: `mockPreparedContent.tree.children.directory` is defined and never `null`.
            ...mockParsedContent.children.directory,
            section: {
              filePath: './content/directory/_index.md',
              markdown: {
                ...mockParsedMarkdown,
                options: {
                  menu: false,
                  toc: false,
                  url: 'override',
                },
              },
              name: '_index.md',
            },
          },
        },
      },
    }).list,
    [
      mockPreparedContent.list[0],
      mockPreparedContent.list[1],
      {
        ...mockPreparedContent.list[2],
        markdown: {
          ...mockParsedMarkdown,
          options: {
            menu: false,
            toc: false,
            url: 'override',
          },
        },
        outputPath: './build/override/index.html',
        outputURL: '/override/',
      },
      {
        ...mockPreparedContent.list[3],
        outputPath: './build/override/page/index.html',
        outputURL: '/override/page/',
      },
      {
        ...mockPreparedContent.list[4],
        outputPath: './build/override/nested/index.html',
        outputURL: '/override/nested/',
      },
      {
        ...mockPreparedContent.list[5],
        outputPath: './build/override/nested/page/index.html',
        outputURL: '/override/nested/page/',
      },
    ],
    'prepares a list of all content where a section has a URL replacement'
  );

  t.end();
});
