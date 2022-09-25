import fs from 'fs';

export const cleanDirectory = (dir: string): void => {
  fs.rmSync(dir, { force: true, recursive: true });
  fs.mkdirSync(dir);
};
