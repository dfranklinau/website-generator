import { convertShortcodeBlockMatchesToPairs } from './utils/convertShortcodeBlockMatchesToPairs';
import { getShortcodeAttributes } from './utils/getShortcodeAttributes';

import type { MarkdownParser } from './MarkdownParser';
import type { Renderer } from './Renderer';
import type {
  ShortcodeBlockPairType,
  ShortcodeBlockPairsType,
} from './utils/convertShortcodeBlockMatchesToPairs';
import type { ShortcodeTemplateType } from './utils/getShortcodeTemplates';

export type ShortcodeBlockMatchesType = {
  closingTags: number[];
  openTags: number[];
};

type ParseShortcodesProps = {
  content: string;
  markdownParser: MarkdownParser;
  renderer: Renderer;
  shortcodes: ShortcodeTemplateType[];
};

export const parseShortcodes = (props: ParseShortcodesProps): string => {
  const { content, markdownParser, renderer, shortcodes } = props;

  const lines: string[] = content.split(/\r?\n/);

  shortcodes.forEach((shortcode: ShortcodeTemplateType) => {
    const inlineMatches: number[] = [];

    const blockMatches: ShortcodeBlockMatchesType = {
      closingTags: [],
      openTags: [],
    };

    // @TODO: support inline shortcodes wrapping across lines.
    const inlineTagPatterns = [
      `{{%${shortcode.name}(?:(?=\\s).+?)?\\/%}}`,
      `{{<${shortcode.name}(?:(?=\\s).+?)?\\/>}}`,
    ];

    const openBlockTagPatterns = [
      `{{%${shortcode.name}(?:(?=\\s).+?)?%}}`,
      `{{<${shortcode.name}(?:(?=\\s).+?)?>}}`,
    ];

    const closeBlockTagPatterns = [
      `{{%/${shortcode.name}%}}`,
      `{{</${shortcode.name}>}}`,
    ];

    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i];

      const isInlineTag = inlineTagPatterns.some((pattern: string) =>
        line.match(new RegExp(pattern)),
      );

      if (isInlineTag) {
        inlineMatches.push(i);
        continue;
      }

      const isOpenBlock = openBlockTagPatterns.some((pattern: string) =>
        line.match(new RegExp(pattern)),
      );

      if (isOpenBlock) {
        blockMatches.openTags.push(i);
        continue;
      }

      const isCloseBlock = closeBlockTagPatterns.some((pattern: string) =>
        line.match(new RegExp(pattern)),
      );

      if (isCloseBlock) {
        blockMatches.closingTags.push(i);
      }
    }

    const blockPairs: ShortcodeBlockPairsType =
      convertShortcodeBlockMatchesToPairs(blockMatches);

    inlineMatches.forEach((match: number) => {
      let inlineShift = 0;

      /**
       * Loop through all of the possible inline matches on the line in case
       * there is more than one inline shortcode.
       */
      inlineTagPatterns.forEach((pattern: string) => {
        Array.from(
          lines[match].matchAll(new RegExp(pattern, 'g')),
          (inlineShortcode) => {
            const index = (inlineShortcode.index || 0) + inlineShift;
            const lastIndex = index + inlineShortcode[0].length;
            const params = getShortcodeAttributes(
              shortcode.name,
              lines[match].substr(index, inlineShortcode[0].length),
              markdownParser,
            );
            const content = renderer.render(
              { content: '', params },
              {
                baseTemplate: shortcode.template,
                stripNewlines: true,
              },
            );

            inlineShift -= inlineShortcode[0].length - content.length;

            lines[match] = `${lines[match].substr(0, index)}${content}${lines[
              match
            ].substr(lastIndex, lines[match].length)}`;
          },
        );
      });
    });

    let blockShift = 0;

    blockPairs.forEach((pair: ShortcodeBlockPairType) => {
      const pairLength = pair[1] - pair[0];

      let pairContent = lines
        .slice(pair[0] + 1 + blockShift, pair[1] + blockShift)
        .join('\n');

      pairContent = parseShortcodes({
        content: pairContent,
        markdownParser,
        renderer,
        shortcodes,
      }).trim();

      if (lines[pair[0] + blockShift].includes('%')) {
        pairContent = markdownParser.parse(pairContent).content;
      }

      const params = getShortcodeAttributes(
        shortcode.name,
        lines[pair[0] + blockShift],
        markdownParser,
      );

      const renderedContent = renderer
        .render(
          { content: pairContent, params },
          {
            baseTemplate: shortcode.template,
            stripNewlines: true,
          },
        )
        .trim();

      lines.splice(pair[0] + blockShift, pairLength + 1, renderedContent);

      blockShift -= pairLength;
    });
  });

  return lines.join('\n');
};
