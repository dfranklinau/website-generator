import postcss from 'postcss';
import { DIRECTORIES } from './config/constants';
import { findFiles } from './utils/findFiles';
import { formatOutputFilePath } from './utils/formatOutputFilePath';
import { readFile } from './utils/readFile';
import { saveContentToFile } from './utils/saveContentToFile';

async function generateAssets() {
  const cssFiles = findFiles(DIRECTORIES.ASSETS, {
    match: /\.css$/,
    recursive: true,
  });

  // @TODO: this method needs to be optimised.
  await Promise.all(cssFiles.map(async (cssFile: string): Promise<void> => {
    const outputCssFile = formatOutputFilePath(cssFile, DIRECTORIES.BUILD);

    const data = (await readFile(cssFile));

    if (!data) return;

    return postcss([])
      .process(data, {
        from: cssFile,
        to: outputCssFile,
      })
      .then((result) => {
        saveContentToFile(result.css, outputCssFile);
      });
  }));
}

export { generateAssets }
