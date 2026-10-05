import path from 'path';

export const formatOutputFilePath = (
  filePath: string,
  outputDir: string,
): string => {
  const outputDirBase = path.parse(outputDir).base;
  return path.normalize(filePath).replace(/^\w*/, outputDirBase);
};
