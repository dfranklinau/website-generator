import { getContentOutputPath } from './utils/getContentOutputPath';
import { getContentOutputURL } from './utils/getContentOutputURL';

import type {
  ContentFileType,
  DataFileType,
  FileType,
  ParsedContentType,
} from './parseContent';

export type PreparedFileType = FileType & {
  outputPath: string;
};

export type PreparedContentType = ContentFileType &
  PreparedFileType & {
    outputURL: string;
  };

export type PreparedContentTreeType = {
  assets: PreparedFileType[];
  children: Record<string, PreparedContentTreeType> | null;
  data: DataFileType | null;
  pages: PreparedContentType[];
  section: PreparedContentType | null;
};

type PrepareContentProps = {
  content: ParsedContentType;
  sectionParent?: PreparedContentType | null;
};

export const prepareContent = (
  props: PrepareContentProps
): { list: PreparedContentType[]; tree: PreparedContentTreeType } => {
  const { content, sectionParent } = props;

  const assets = content.assets;
  const children = content.children;
  const pages = content.pages;
  const section = content.section;

  let preparedContentList: PreparedContentType[] = [];
  const preparedContentTree: PreparedContentTreeType = {
    assets: [],
    children: null,
    data: content.data || null,
    section: null,
    pages: [],
  };

  let sectionOverride: PreparedContentType | null = sectionParent || null;

  if (section) {
    sectionOverride = {
      filePath: sectionOverride?.filePath || section.filePath,
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
      name: sectionOverride?.name || section.name,
      outputPath: getContentOutputPath(section.filePath, sectionOverride),
      outputURL: getContentOutputURL(section.filePath, sectionOverride),
    };

    const preparedSection: PreparedContentType = {
      ...section,
      outputPath: getContentOutputPath(section.filePath, sectionOverride),
      outputURL: getContentOutputURL(section.filePath, sectionOverride),
    };

    preparedContentList.push(preparedSection);
    preparedContentTree.section = preparedSection;
  }

  if (pages) {
    preparedContentTree.pages = pages.map(
      (page: ContentFileType): PreparedContentType => ({
        ...page,
        outputPath: getContentOutputPath(page.filePath, sectionOverride),
        outputURL: getContentOutputURL(page.filePath, sectionOverride),
      })
    );

    preparedContentList = preparedContentList.concat(preparedContentTree.pages);
  }

  if (children) {
    const preparedContentTreeChildren = {} as Record<
      string,
      PreparedContentTreeType
    >;
    const childrenKeys = Object.keys(children);

    childrenKeys.forEach((key) => {
      const preparedChildrenContent = prepareContent({
        content: children[key],
        sectionParent: sectionOverride,
      });

      preparedContentList = preparedContentList.concat(
        preparedChildrenContent.list
      );
      preparedContentTreeChildren[key] = preparedChildrenContent.tree;
    });

    preparedContentTree.children = preparedContentTreeChildren;
  }

  if (assets) {
    preparedContentTree.assets = assets.map(
      (asset: FileType): PreparedFileType => ({
        ...asset,
        outputPath: getContentOutputPath(asset.filePath, sectionOverride),
      })
    );
  }

  return {
    list: preparedContentList,
    tree: preparedContentTree,
  };
};
