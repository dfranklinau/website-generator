import { DIRECTORIES } from './config/constants';
import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { cleanDirectory } from './utils/cleanDirectory';
import { generateContent } from './generateContent';
import { generateErrorDocuments } from './generateErrorDocuments';
import { generateStaticFiles } from './generateStaticFiles';
import { generateAssets } from './generateAssets';
import { getHelpers } from './utils/getHelpers';
import { getPartialTemplates } from './utils/getPartialTemplates';
import { getShortcodeTemplates } from './utils/getShortcodeTemplates';
import { getWebsiteGeneratorConfig } from './utils/getWebsiteGeneratorConfig';
import { readFile } from './utils/readFile';

const generate = async (): Promise<void> => {
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

export default {
  generate
};
