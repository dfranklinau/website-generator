import { config } from '../config';
import { getContentOutputPath } from './getContentOutputPath';

import type { PreparedContentType } from '../prepareContent';

export const getContentOutputURL = (
  filePath: string,
  section?: PreparedContentType | null
): string => {
  const contentOutputPath = getContentOutputPath(filePath, section);
  return contentOutputPath
    .replace(config.DIRECTORIES.BUILD, '/')
    .replace('index.html', '');
};
