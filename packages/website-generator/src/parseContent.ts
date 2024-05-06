import fs from 'fs';

import { MarkdownParser } from './MarkdownParser';
import { readFile } from './utils/readFile';

import type { ParsedMarkdownType } from './MarkdownParser';
import type { Renderer } from './Renderer';

export type FileType = {
  filePath: string;
};

export type DataFileType = FileType & {
  json: Record<string, unknown>;
};

export type ContentFileType = FileType & {
  markdown: ParsedMarkdownType;
  name: string;
};

export type ParsedContentType = {
  assets: FileType[];
  children: Record<string, ParsedContentType> | null;
  data: DataFileType | null;
  pages: ContentFileType[];
  section: ContentFileType | null;
};

type ParseContentProps = {
  directory: string;
  markdownParser: MarkdownParser;
  renderer: Renderer;
  shortcodes?: string[];
};

export const parseContent = async (
  props: ParseContentProps,
): Promise<ParsedContentType> => {
  const { directory, markdownParser, renderer, shortcodes } = props;

  const parsedContent: ParsedContentType = {
    assets: [],
    children: null,
    data: null,
    pages: [],
    section: null,
  };

  const files: fs.Dirent[] = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });

  await Promise.all(
    files.map(async (item: fs.Dirent) => {
      const itemPath = `${directory}${item.name}`;

      if (item.isFile()) {
        if (item.name.match(/\.md$/)) {
          const data = (await readFile(
            `${directory}/${item.name}`,
            '',
          )) as string;

          const markdown = markdownParser.parse(data);

          const contentItem: ContentFileType = {
            markdown,
            name: item.name,
            filePath: itemPath,
          };

          // Exclude drafts from ever being published.
          if (!contentItem.markdown.matter.draft) {
            if (item.name === '_index.md') {
              parsedContent.section = contentItem;
            } else {
              parsedContent.pages.push(contentItem);
            }
          }
        } else if (item.name === '_data.json') {
          const data = await readFile(
            `${directory}/${item.name}`,
            '{}',
          );

          try {
            let dataJSON: Record<string, unknown> = {};
            if (data) dataJSON = JSON.parse(data);

            parsedContent.data = {
              json: dataJSON,
              filePath: itemPath,
            };
          } catch {
            throw new Error('Error parsing JSON data file.');
          }
        } else {
          parsedContent.assets.push({ filePath: itemPath });
        }
      } else if (item.isDirectory()) {
        if (parsedContent.children === null) {
          parsedContent.children = {};
        }

        const parsedChildContent = await parseContent({
          directory: `${itemPath}/`,
          markdownParser,
          renderer,
          shortcodes,
        });

        parsedContent.children[item.name] = parsedChildContent;
      }
    }),
  );

  return parsedContent;
};
