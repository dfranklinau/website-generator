import { findFiles } from './findFiles';
import { readFile } from './readFile';

import { DIRECTORIES } from '../config/constants';

type PartialTemplateType = {
  data: string;
  name: string;
};

type PartialsType = {
  [key: string]: string;
};

export const getPartialTemplates = async (): Promise<PartialsType> => {
  const partialTemplates: string[] = findFiles(
    `${DIRECTORIES.TEMPLATES}_partials/`,
    {
      match: /\.hbs/,
      recursive: true,
    },
  );

  const partials: Promise<PartialTemplateType | null>[] = await partialTemplates.map(
    async (file: string): Promise<PartialTemplateType | null> => {
      const name = file.match(/\/_partials\/(.*)\.hbs/);

      if (Array.isArray(name) && name[1]) {
        return {
          data: (await readFile(file)) as string,
          name: name[1].replace(/\//g, '-'),
        };
      }

      return null;
    },
  );

  /**
   * Format the array of `PartialTemplateType` objects into a key-value pair
   * object for easier access, i.e.:
   *
   * {
   *   'partial-name': '...'
   * }
   */
  return Promise.all(partials).then(
    (values): PartialsType => {
      return values.reduce(
        (acc: { [key: string]: string }, curr): PartialsType => {
          if (curr) {
            acc[curr.name] = curr.data;
          }

          return acc;
        },
        {},
      );
    },
  );
};
