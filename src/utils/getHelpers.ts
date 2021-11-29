import path from 'path';
import { findFiles } from './findFiles';

import { DIRECTORIES } from '../config/constants';

export type HelperFunctionType = (...args: unknown[]) => string;

type HelperFileType = {
  func: HelperFunctionType;
  name: string;
};

export type HelpersType = {
  [key: string]: HelperFunctionType;
};

export const getHelpers = (): HelpersType => {
  const helperFiles: string[] = findFiles(`${DIRECTORIES.HELPERS}`, {
    match: /\.js$/,
    recursive: true,
  });

  const helpers: (HelperFileType | null)[] = helperFiles.map(
    (file: string): HelperFileType | null => {
      /**
       * Resolve the path to `cwd` so that importing helper methods is always
       * relative to where `website-generator` was called.
       */
      const resolvedPath = path.resolve(process.cwd(), file);
      const name = file.match(/\/helpers\/(.*)\.js$/);

      if (Array.isArray(name) && name[1]) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const module: HelperFunctionType = require(resolvedPath);

          return {
            func: module,
            name: name[1].replace(/\//g, '-'),
          };
        } catch (error) {
          throw new Error(
            `Could not load helper at ${file}. See below message for details:\n\n ${error}`,
          );
        }
      }

      return null;
    },
  );

  /**
   * Format the array of `HelperFileType` objects into a key-value pair
   * object for easier access, i.e.:
   *
   * {
   *   'partial-name': '...'
   * }
   */
  return helpers.reduce(
    (acc: HelpersType, curr: HelperFileType | null): HelpersType => {
      if (curr) {
        acc[curr.name] = curr.func;
      }

      return acc;
    },
    {},
  );
};
