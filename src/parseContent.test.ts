import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { mockParsedMarkdown } from './_fixtures';

import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { config } from './config';
import { parseContent } from './parseContent';

import type { ParsedContentType } from './parseContent';

type MockDirentProps = {
  isDirectory?: true;
  isFile?: true;
  name: string;
};

const mockDirent = (props: MockDirentProps): fs.Dirent => {
  const { isDirectory, isFile, name } = props;

  return {
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isDirectory: () => isDirectory || false,
    isFIFO: () => false,
    isFile: () => isFile || false,
    isSocket: () => false,
    isSymbolicLink: () => false,
    name,
  };
};

test('`parseContent`', async (t: test.Test) => {
  const readdirStub = sinon.stub(fs.promises, 'readdir');
  const readFileStub = sinon.stub(fs.promises, 'readFile');

  readdirStub
    .withArgs('./content/', { withFileTypes: true })
    .resolves([
      mockDirent({ isFile: true, name: 'index.md' }),
      mockDirent({ isFile: true, name: 'draft.md' }),
      mockDirent({ isFile: true, name: 'page.md' }),
      mockDirent({ isFile: true, name: 'asset.jpg' }),
      mockDirent({ isFile: true, name: '_data.json' }),
      mockDirent({ isDirectory: true, name: 'directory' }),
    ]);

  readdirStub
    .withArgs('./content/directory/', { withFileTypes: true })
    .resolves([
      mockDirent({ isFile: true, name: '_index.md' }),
      mockDirent({ isFile: true, name: 'draft.md' }),
      mockDirent({ isFile: true, name: 'page.md' }),
      mockDirent({ isFile: true, name: 'asset.jpg' }),
      mockDirent({ isFile: true, name: '_data.json' }),
      mockDirent({ isDirectory: true, name: 'nested' }),
    ]);

  readdirStub
    .withArgs('./content/directory/nested/', { withFileTypes: true })
    .resolves([
      mockDirent({ isFile: true, name: 'index.md' }),
      mockDirent({ isFile: true, name: 'draft.md' }),
      mockDirent({ isFile: true, name: 'page.md' }),
      mockDirent({ isFile: true, name: 'asset.jpg' }),
      mockDirent({ isFile: true, name: '_data.json' }),
    ]);

  readFileStub.withArgs(sinon.match(/\.md$/)).resolves('Markdown');
  readFileStub
    .withArgs(sinon.match(/draft.md$/))
    .resolves('+++\ndraft = true\n+++\n\nMarkdown');
  readFileStub
    .withArgs(sinon.match(/_data.json$/))
    .resolves('{ "key": "value" }');

  const renderer = new Renderer({ baseTemplate: '', config: {}, partials: {} });
  const markdownParser = new MarkdownParser(renderer, []);

  const content = await parseContent({
    directory: config.DIRECTORIES.CONTENT,
    markdownParser,
    renderer,
  });

  t.deepEqual(
    content,
    {
      assets: [{ filePath: './content/asset.jpg' }],
      children: {
        directory: {
          assets: [{ filePath: './content/directory/asset.jpg' }],
          children: {
            nested: {
              assets: [{ filePath: './content/directory/nested/asset.jpg' }],
              children: null,
              data: {
                json: { key: 'value' },
                filePath: './content/directory/nested/_data.json',
              },
              pages: [
                {
                  filePath: './content/directory/nested/index.md',
                  markdown: mockParsedMarkdown,
                  name: 'index.md',
                },
                {
                  filePath: './content/directory/nested/page.md',
                  markdown: mockParsedMarkdown,
                  name: 'page.md',
                },
              ],
              section: null,
            },
          },
          data: {
            json: { key: 'value' },
            filePath: './content/directory/_data.json',
          },
          pages: [
            {
              filePath: './content/directory/page.md',
              markdown: mockParsedMarkdown,
              name: 'page.md',
            },
          ],
          section: {
            filePath: './content/directory/_index.md',
            markdown: mockParsedMarkdown,
            name: '_index.md',
          },
        },
      },
      data: { json: { key: 'value' }, filePath: './content/_data.json' },
      pages: [
        {
          filePath: './content/index.md',
          markdown: mockParsedMarkdown,
          name: 'index.md',
        },
        {
          filePath: './content/page.md',
          markdown: mockParsedMarkdown,
          name: 'page.md',
        },
      ],
      section: null,
    } as ParsedContentType,
    'parses all files within the given directory and returns a formatted object'
  );

  readdirStub.restore();
  readFileStub.restore();
  t.end();
});
