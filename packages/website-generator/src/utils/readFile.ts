import fs from 'fs';

async function readFile(file: string, defaultValue?: string): Promise<string | null> {
  try {
    return fs.promises.readFile(file, 'utf8');
  } catch {
    return defaultValue || null;
  }
}

export { readFile };
