import Handlebars from 'handlebars';

import { MarkdownParser } from '../MarkdownParser';

const markdownParser = new MarkdownParser(null, []);

export const markdownifyHelper: Handlebars.HelperDelegate = (
  value: string
): Handlebars.SafeString => {
  const parsedMarkdown = markdownParser.parse(value);
  return new Handlebars.SafeString(parsedMarkdown.content);
};
