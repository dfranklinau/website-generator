import path from 'path';

import { DIRECTORIES } from './config/constants';
import { copyFiles } from './utils/copyFiles';
import { getContentTemplate } from './utils/getContentTemplate';
import { getPageTitle } from './utils/getPageTitle';
import { saveContentToFile } from './utils/saveContentToFile';

import type { DataFileType } from './parseContent';
import type {
  PreparedContentTreeType,
  PreparedContentType,
  PreparedFileType,
} from './prepareContent';
import type { Renderer } from './Renderer';

type RenderContentProps = {
  content: PreparedContentTreeType;
  globalMatter: Record<string, unknown>;
  parentSection?: PreparedContentType | null;
  renderer: Renderer;
};

type GetContentOutputProps = {
  content: PreparedContentType;
  data: DataFileType | null;
  globalMatter: Record<string, unknown>;
  renderer: Renderer;
  parentSection: PreparedContentType | null;
  sectionMatter?: Record<string, unknown>;
  template: 'index' | 'page' | 'section';
};

const getContentOutput = (props: GetContentOutputProps): string => {
  const {
    content,
    data,
    globalMatter,
    renderer,
    sectionMatter,
    parentSection,
    template,
  } = props;

  // Use `.slice(2)` to remove '.' and 'content' from the list.
  const contentDirectories = path
    .parse(content.filePath)
    .dir.split(path.sep)
    .slice(2);

  const filename =
    typeof content.markdown.matter.title === 'string'
      ? content.markdown.matter.title
      : null;

  const contentTemplate = getContentTemplate(
    template,
    contentDirectories,
    filename,
  );

  const variables = {
    data: data?.json,
    global: globalMatter,
    head: {
      title: getPageTitle(content, parentSection),
    },
    page: {
      ...content.markdown.matter,
      ...sectionMatter,
      toc: content.markdown.options.toc,
    },
    section: {
      ...parentSection?.markdown.matter,
      ...sectionMatter,
    },
  };

  const renderedContent = renderer.render(
    {
      ...variables,
      content: content.markdown.content,
    },
    {
      baseTemplate: contentTemplate,
    },
  );

  return renderer.render({
    ...variables,
    content: renderedContent,
  });
};

export const renderContent = (props: RenderContentProps): void => {
  const { content, globalMatter, parentSection, renderer } = props;

  const assets = content.assets;
  const data = content.data;
  const section = content.section;
  const pages = content.pages;
  const children = content.children;

  let sectionOverride: PreparedContentType | null = parentSection || null;

  if (section) {
    sectionOverride = {
      ...section,
      ...sectionOverride,
      markdown: {
        content: sectionOverride?.markdown.content || section.markdown.content,
        matter: {
          ...sectionOverride?.markdown.matter,
          ...section.markdown.matter,
        },
        options: {
          ...sectionOverride?.markdown.options,
          ...section.markdown.options,
        },
      },
    };

    const sectionChildren = [...pages];

    if (children) {
      Object.keys(children).forEach((key: string): void => {
        const child = children[key];

        if (child.section) {
          sectionChildren.push(child.section);
        } else {
          const childIndexPage = child.pages.find(
            (page: PreparedContentType) => page.name === 'index.md',
          );

          if (childIndexPage) {
            sectionChildren.push(childIndexPage);
          }
        }
      });
    }

    const sectionMatter = {
      children: sectionChildren,
    };

    const output = getContentOutput({
      content: section,
      data,
      globalMatter,
      renderer,
      sectionMatter,
      parentSection: sectionOverride,
      template: parentSection ? 'section' : 'index',
    });

    saveContentToFile(output, section.outputPath);
  }

  if (pages) {
    pages.forEach((page: PreparedContentType) => {
      const output = getContentOutput({
        content: page,
        data,
        globalMatter,
        renderer,
        parentSection: sectionOverride,
        template: 'page',
      });

      saveContentToFile(output, page.outputPath);
    });
  }

  if (content.children) {
    const children = content.children;
    const childrenKeys = Object.keys(children);

    childrenKeys.forEach((child) => {
      renderContent({
        content: children[child],
        globalMatter,
        parentSection: sectionOverride,
        renderer,
      });
    });
  }

  if (assets) {
    copyFiles(
      assets.map((asset: PreparedFileType) => asset.filePath),
      DIRECTORIES.BUILD,
      (filePath: string) => {
        const asset: PreparedFileType | undefined = assets.find(
          (asset) => asset.filePath === filePath,
        );

        if (!asset) {
          throw new Error(
            `Asset at "${filePath}" does not have an output path.`,
          );
        }

        return asset.outputPath;
      },
    );
  }
};
