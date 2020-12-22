import path from 'path';

import { config } from '../config';

import type { PreparedContentType } from '../prepareContent';

export const getContentOutputPath = (
  filePath: string,
  section?: PreparedContentType | null
): string => {
  let rewritePath = filePath;

  if (
    typeof section?.markdown.options.url === 'string' &&
    section.markdown.options.url.length > 0
  ) {
    // Convert `./content/directory/page` to `directory/page`.
    const sectionPath = path
      .parse(section.filePath)
      .dir.split(path.sep)
      .slice(2)
      .join(path.sep);

    if (section.markdown.options.url === '/') {
      rewritePath = filePath.replace(`/${sectionPath}/`, '/');
    } else {
      rewritePath = filePath.replace(
        `/${sectionPath}/`,
        `/${section.markdown.options.url}/`
      );
    }
  }

  rewritePath = rewritePath
    .replace(config.DIRECTORIES.CONTENT, config.DIRECTORIES.BUILD)
    .replace(/_index\.md$/, 'index.md')
    .replace(/\.md$/, '.html');

  if (!rewritePath.endsWith('/index.html')) {
    return rewritePath.replace(/(\w*)\.html$/, '$1/index.html');
  }

  return rewritePath;
};
