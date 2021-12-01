import fs from 'fs';
import path from 'path';

import { formatOutputFilePath } from './formatOutputFilePath';

export const copyFiles = (
  files: string[],
  dest: string,
  callback?: (file: string) => string,
): void => {
  files.forEach((file: string) => {
    const fileOutputPath = formatOutputFilePath(
      callback ? callback(file) : file,
      dest,
    );

    const fileOutputDir = path.parse(fileOutputPath).dir;

    fs.mkdirSync(fileOutputDir, { recursive: true });
    fs.copyFileSync(file, fileOutputPath);
  });
};
