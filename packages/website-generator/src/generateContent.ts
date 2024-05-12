import { DIRECTORIES } from './config/constants';
import { parseContent } from './parseContent';
import { prepareContent } from './prepareContent';
import { renderContent } from './renderContent';
import type { MarkdownParser } from './MarkdownParser';
import type { Renderer } from './Renderer';

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

export { generateContent }
