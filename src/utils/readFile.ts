import fs from 'fs';

export const readFile = async (
  file: string,
  defaultValue?: unknown,
  callback?: (data: string) => void
): Promise<unknown | null> => {
  try {
    const data = await fs.promises.readFile(file, 'utf8');
    return callback ? callback(data) : data;
  } catch {
    return defaultValue || null;
  }
};
