import path from 'path';

import { findFiles } from './findFiles';
import { readFile } from './readFile';

import { config } from '../config';

export type ShortcodeTemplateType = {
  name: string;
  template: string;
};

export const getShortcodeTemplates = async (): Promise<
  ShortcodeTemplateType[]
> => {
  const shortcodeTemplates = findFiles(config.DIRECTORIES.SHORTCODES, {
    match: /^.*\.hbs/,
  });

  return Promise.all(
    shortcodeTemplates.map(
      async (file): Promise<ShortcodeTemplateType> => {
        const name = path.parse(file).name;
        const template = `${config.DIRECTORIES.SHORTCODES}${name}.hbs`;

        try {
          return {
            template: (await readFile(template)) as string,
            name,
          };
        } catch (error) {
          throw new Error('Shortcode template file does not exist.');
        }
      }
    )
  );
};
