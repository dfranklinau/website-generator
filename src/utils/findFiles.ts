import fs from 'fs';

export const findFiles = (
  directory: string,
  options?: { match?: string | RegExp; recursive?: boolean }
): string[] => {
  let results: string[] = [];

  const files: fs.Dirent[] = fs.readdirSync(directory, { withFileTypes: true });

  files.forEach((item: fs.Dirent) => {
    if (item.isFile()) {
      if (
        (options?.match && item.name.match(options.match)) ||
        typeof options?.match === 'undefined'
      ) {
        results.push(`${directory}${item.name}`);
      }
    } else if (options?.recursive && item.isDirectory()) {
      results = results.concat(findFiles(`${directory}${item.name}/`, options));
    }
  });

  return results;
};
