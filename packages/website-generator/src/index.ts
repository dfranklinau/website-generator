import { DIRECTORIES } from './config/constants';
import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { cleanDirectory } from './utils/cleanDirectory';
import { generateErrorDocuments } from './generateErrorDocuments';
import { generateStaticFiles } from './generateStaticFiles';
import { generateAssets } from './generateAssets';
import { getHelpers } from './utils/getHelpers';
import { getPartialTemplates } from './utils/getPartialTemplates';
import { getShortcodeTemplates } from './utils/getShortcodeTemplates';
import { getWebsiteGeneratorConfig } from './utils/getWebsiteGeneratorConfig';
import { parseContent } from './parseContent';
import { prepareContent } from './prepareContent';
import { readFile } from './utils/readFile';
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
