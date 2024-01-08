import fs from 'fs';
import path from 'path';

import { DIRECTORIES, EXTENSIONS } from '../config/constants';

export const getContentTemplate = (
  template: 'index' | 'page' | 'section',
  directories: string[],
  filename?: string | null,
): string => {
  const section = directories.join(path.sep);

  const templatePath =
    section.length > 0
      ? `${DIRECTORIES.TEMPLATES}${section}${path.sep}`
      : `${DIRECTORIES.TEMPLATES}`;

  let content = null;

  if (template === 'index' && section.length === 0) {
    try {
      content = fs.readFileSync(
        `${templatePath}_index.${EXTENSIONS.TEMPLATES}`,
        'utf8',
      );
    } catch {
      content = null;
    }

    if (!content) {
      try {
        content = fs.readFileSync(
          `${templatePath}section.${EXTENSIONS.TEMPLATES}`,
          'utf8',
        );
      } catch {
        content = null;
      }
    }
  } else {
    if (template === 'page' && filename) {
      try {
        content = fs.readFileSync(
          `${templatePath}${filename}.${EXTENSIONS.TEMPLATES}`,
          'utf8',
        );
      } catch {
        content = null;
      }
    }

    if (!content) {
      try {
        content =
          fs.readFileSync(
            `${templatePath}${template}.${EXTENSIONS.TEMPLATES}`,
            'utf8',
          ) || null;
      } catch {
        content = null;
      }
    }
  }

  if (content) {
    return content;
  }

  if (directories.length > 0) {
    return getContentTemplate(
      template,
      directories.slice(0, directories.length - 1),
      directories[directories.length - 1],
    );
  }

  return '';
};
