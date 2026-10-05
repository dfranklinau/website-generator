import path from 'path';

export const removeTrailingSlash = (filePath: string): string => {
  if (filePath.charAt(filePath.length - 1) === path.sep) {
    return path.normalize(filePath.slice(0, filePath.length - 1));
  }

  return path.normalize(filePath);
};
