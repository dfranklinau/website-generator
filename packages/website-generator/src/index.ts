import postcss from 'postcss';

import { DIRECTORIES } from './config/constants';
import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { cleanDirectory } from './utils/cleanDirectory';
import { findFiles } from './utils/findFiles';
import { formatOutputFilePath } from './utils/formatOutputFilePath';
import { generateErrorDocuments } from './generateErrorDocuments';
import { generateStaticFiles } from './generateStaticFiles';
import { getHelpers } from './utils/getHelpers';
import { getPartialTemplates } from './utils/getPartialTemplates';
import { getShortcodeTemplates } from './utils/getShortcodeTemplates';
import { getWebsiteGeneratorConfig } from './utils/getWebsiteGeneratorConfig';
import { parseContent } from './parseContent';
import { prepareContent } from './prepareContent';
import { readFile } from './utils/readFile';
import { renderContent } from './renderContent';
import { saveContentToFile } from './utils/saveContentToFile';

async function generateContent(props: {
  markdownParser: MarkdownParser;
  renderer: Renderer;
}) {
  const { markdownParser, renderer } = props;

  const parsedContent = await parseContent({
    directory: DIRECTORIES.CONTENT,
    markdownParser,
    renderer,
  });

  renderContent({
    content: prepareContent({ content: parsedContent }).tree,
    globalMatter: {
      menus: {},
    },
    renderer,
  });
}

async function generateAssets() {
  const cssFiles = findFiles(DIRECTORIES.ASSETS, {
    match: /\.css$/,
    recursive: true,
  });

  cssFiles.forEach(async (cssFile: string) => {
    const outputCssFile = formatOutputFilePath(cssFile, DIRECTORIES.BUILD);

    const data = (await readFile(cssFile)) as string;

    postcss([])
      .process(data, {
        from: cssFile,
        to: outputCssFile,
      })
      .then((result) => {
        saveContentToFile(result.css, outputCssFile);
      });
  });
}

export const generate = async (): Promise<void> => {
  cleanDirectory(DIRECTORIES.BUILD);

  // @TODO how to differentiate from user-defined and reserved keywords?
  const config = await getWebsiteGeneratorConfig();

  const baseTemplate: string = (await readFile(
    './templates/_base.hbs',
    '',
  )) as string;

  const helpers = getHelpers();
  const partials = await getPartialTemplates();
  const shortcodes = await getShortcodeTemplates();

  const renderer = new Renderer({
    baseTemplate,
    config,
    helpers,
    partials,
  });
  const markdownParser = new MarkdownParser(renderer, shortcodes);

  await generateContent({ markdownParser, renderer });
  await generateErrorDocuments({ config, renderer });
  generateStaticFiles();
  await generateAssets();
};
