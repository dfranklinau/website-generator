import fs from 'fs';

async function readFile(file: string, defaultValue?: string): Promise<string | null> {
  return fs.promises.readFile(file, 'utf8').catch(() => {
    return defaultValue ?? null;
  });
}

export { readFile };
