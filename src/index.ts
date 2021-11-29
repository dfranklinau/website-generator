import fs from 'fs';
import postcss from 'postcss';

import { DIRECTORIES } from './config/constants';
import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { copyFiles } from './utils/copyFiles';
import { findFiles } from './utils/findFiles';
import { formatOutputFilePath } from './utils/formatOutputFilePath';
import { getHelpers } from './utils/getHelpers';
import { getPartialTemplates } from './utils/getPartialTemplates';
import { getShortcodeTemplates } from './utils/getShortcodeTemplates';
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

function generateStatic() {
  const staticFiles = findFiles(DIRECTORIES.STATIC, {
    recursive: true,
  });
  copyFiles(staticFiles, DIRECTORIES.BUILD);
}

async function generateErrorDocuments(props: {
  config: Record<string, unknown>;
  renderer: Renderer;
}) {
  const { config, renderer } = props;

  const templateFile = `${DIRECTORIES.TEMPLATES}_404.hbs`;
  const content = (await readFile(templateFile)) as string;

  fs.writeFileSync(
    `${DIRECTORIES.BUILD}404.html`,
    renderer.render({
      content,
      head: {
        title: config.errorDocument404Title || '404',
      },
    }),
  );
}

function clean() {
  fs.rmdirSync(DIRECTORIES.BUILD, { recursive: true });
  fs.mkdirSync(DIRECTORIES.BUILD);
}

export const generate = async (): Promise<void> => {
  clean();

  // @TODO how to differentiate from user-defined and reserved keywords?
  const config: Record<string, unknown> = (await readFile(
    './website-generator.config.json',
    {},
    (data: string): Record<string, unknown> => {
      try {
        return JSON.parse(data);
      } catch {
        return {};
      }
    },
  )) as Record<string, unknown>;

  const baseTemplate: string = (await readFile(
    './templates/_base.hbs',
    '',
  )) as string;

  const helpers = getHelpers();
  const partials = await getPartialTemplates();
  const shortcodes = await getShortcodeTemplates();

  const renderer = new Renderer({ baseTemplate, config, helpers, partials });
  const markdownParser = new MarkdownParser(renderer, shortcodes);

  await generateContent({ markdownParser, renderer });
  await generateErrorDocuments({ config, renderer });
  await generateStatic();
  await generateAssets();
};
