import fs from 'fs';
import postcss from 'postcss';

import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { DIRECTORIES } from './config/constants';
import { copyFiles } from './utils/copyFiles';
import { findFiles } from './utils/findFiles';
import { getPartialTemplates } from './utils/getPartialTemplates';
import { formatOutputFilePath } from './utils/formatOutputFilePath';
import { readFile } from './utils/readFile';
import { getShortcodeTemplates } from './utils/getShortcodeTemplates';
import { saveContentToFile } from './utils/saveContentToFile';
import { parseContent } from './parseContent';
import { prepareContent } from './prepareContent';
import { renderContent } from './renderContent';

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

async function generate404(props: { renderer: Renderer }) {
  const { renderer } = props;

  const templateFile = `${DIRECTORIES.TEMPLATES}_404.hbs`;
  const content = (await readFile(templateFile)) as string;

  fs.writeFileSync(
    `${DIRECTORIES.BUILD}404.html`,
    renderer.render({ content })
  );
}

function clean() {
  fs.rmdirSync(DIRECTORIES.BUILD, { recursive: true });
  fs.mkdirSync(DIRECTORIES.BUILD);
}

export const generate = async (): Promise<void> => {
  clean();

  const config: Record<string, unknown> = (await readFile(
    './website-generator.config.json',
    {},
    (data: string): Record<string, unknown> => {
      try {
        return JSON.parse(data);
      } catch {
        return {};
      }
    }
  )) as Record<string, unknown>;

  const baseTemplate: string = (await readFile(
    './templates/_base.hbs',
    ''
  )) as string;

  const partials = await getPartialTemplates();
  const shortcodes = await getShortcodeTemplates();

  const renderer = new Renderer({ baseTemplate, config, partials });
  const markdownParser = new MarkdownParser(renderer, shortcodes);

  await generateContent({ markdownParser, renderer });
  await generate404({ renderer });
  await generateStatic();
  await generateAssets();
};
