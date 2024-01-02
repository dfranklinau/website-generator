import { DIRECTORIES } from '../config/constants';
import { getContentOutputPath } from './getContentOutputPath';

import type { PreparedContentType } from '../prepareContent';

export const getContentOutputURL = (
  filePath: string,
  section?: PreparedContentType | null,
): string => {
  const contentOutputPath = getContentOutputPath(filePath, section);
  return contentOutputPath
    .replace(DIRECTORIES.BUILD, '/')
    .replace('index.html', '');
};
