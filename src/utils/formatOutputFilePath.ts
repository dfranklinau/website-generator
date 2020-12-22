import path from 'path';

export const formatOutputFilePath = (
  filePath: string,
  outputDir: string
): string => {
  const outputDirBase = path.parse(outputDir).base;
  return filePath.replace(/^\.?\/?\w*\//, `./${outputDirBase}/`);
};
