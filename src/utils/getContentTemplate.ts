import fs from 'fs';
import path from 'path';

import { config } from '../config';

export const getContentTemplate = (
  template: string,
  directories: string[]
): string => {
  const section = directories.join(path.sep);
  const templatePath =
    section.length > 0
      ? `${config.DIRECTORIES.TEMPLATES}${section}${path.sep}${template}.hbs`
      : `${config.DIRECTORIES.TEMPLATES}${template}.hbs`;

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
