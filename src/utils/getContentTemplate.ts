import fs from 'fs';
import path from 'path';

import { DIRECTORIES } from '../config/constants';

export const getContentTemplate = (
  template: string,
  directories: string[]
): string => {
  const section = directories.join(path.sep);
  const templatePath =
    section.length > 0
      ? `${DIRECTORIES.TEMPLATES}${section}${path.sep}${template}.hbs`
      : `${DIRECTORIES.TEMPLATES}${template}.hbs`;

  try {
    return fs.readFileSync(templatePath, 'utf8');
  } catch {
    if (directories.length > 0) {
      return getContentTemplate(
        template,
        directories.slice(0, directories.length - 1)
      );
    }

    return '';
  }
};
