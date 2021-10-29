import createDOMPurify from 'dompurify';
import jsdom from 'jsdom';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import matter from 'gray-matter';
import path from 'path';
import toc from 'markdown-toc';
import toml from '@ltd/j-toml';

import { removeTrailingSlash } from './utils/removeTrailingSlash';

import type DOMPurify from 'dompurify';
import { parseShortcodes } from './parseShortcodes';

import type { Renderer } from './Renderer';
import type { ShortcodeTemplateType } from './utils/getShortcodeTemplates';

export type ParsedMarkdownOptionsType = {
  menu: { name: string; order: number | null } | false;
  toc: string | false;
  url: string | false;
};

export type ParsedMarkdownType = {
  content: string;
  matter: Record<string, unknown>;
  options: ParsedMarkdownOptionsType;
};

const formatSectionUrl = (url: string): string => {
  let formattedUrl = url;

  if (url === path.sep) {
    return formattedUrl;
  }

  if (url.charAt(0) === path.sep) {
    formattedUrl = formattedUrl.slice(1);
  }

  return removeTrailingSlash(formattedUrl);
};

export class MarkdownParser {
  private _DOMPurify: DOMPurify.DOMPurifyI;
  private _md: Remarkable;
  private _renderer: Renderer;
  private _shortcodes: ShortcodeTemplateType[];
  private _window: jsdom.DOMWindow;

  constructor(renderer: Renderer, shortcodes: ShortcodeTemplateType[]) {
    const { JSDOM } = jsdom;

    this._md = new Remarkable({ html: true });
    this._md.use(linkify);
    this._md.block.ruler.enable(['deflist']); // Enable the rendering of description lists in Markdown.

    this._md.use((remarkable) => {
      remarkable.renderer.rules.footnote_ref = (tokens, idx) => {
        const level = tokens[idx].level + 1;
        return `<sup><a id="fnref${level} href="#fn${level}">${level}</a></sup>`;
      };

      /**
       * Override remarkable's `heading_open` rule to add an `id` attribute to
       * headings.
       */
      remarkable.renderer.rules.heading_open = (tokens, idx) =>
        `<h${tokens[idx].hLevel} id="${toc.slugify(
          // @ts-expect-error the idx + 1 isn't a heading_open token.
          tokens[idx + 1].content
        )}">`;
    });

    this._renderer = renderer;
    this._shortcodes = shortcodes;
    this._window = new JSDOM('').window;
    this._DOMPurify = createDOMPurify(this._window);
  }

  public getOptions(
    content: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [key: string]: any }
  ): ParsedMarkdownOptionsType {
    const options = {
      menu: false,
      toc: false,
      url: false,
    } as ParsedMarkdownOptionsType;

    if (!data) {
      return options;
    }

    if (typeof data.menu?.name === 'string') {
      options.menu = {
        name: data.menu.name,
        order: typeof data.menu.order === 'number' ? data.menu.order : null,
      };
    }

    if (typeof data.toc === 'boolean') {
      options.toc = this.parse(
        toc(content, {
          bullets: ['1.'],
          maxdepth: 3,
        }).content.replace(/ {2}/g, '    ')
      ).content;
    }

    if (typeof data.url === 'string') {
      options.url = formatSectionUrl(data.url);
    }

    return options;
  }

  public parse(content: string): ParsedMarkdownType {
    const file = matter(content, {
      delimiters: '+++',
      engines: {
        toml: (source) => {
          try {
            return toml.parse(source, 1.0, '\n');
          } catch {
            throw new Error(`Invalid TOML: ${source}`);
          }
        },
      },
      language: 'toml',
    });

    const prepared = this.prepare(file.content);
    const parsed = this._md.render(prepared).trim();
    const options = this.getOptions(file.content, file.data);

    return {
      content: this._DOMPurify.sanitize(parsed),
      matter: file.data,
      options,
    };
  }

  public parseInline(content: string): string {
    return this._md
      .renderInline(content, {
        headerIds: false,
      })
      .trim();
  }

  public prepare(content: string): string {
    let prepared: string = content;

    prepared = parseShortcodes({
      content: prepared,
      markdownParser: this,
      renderer: this._renderer,
      shortcodes: this._shortcodes,
    });

    /**
     * Remove any HTML indentation so that it isn't interpreted as indented code
     * blocks when parsed as Markdown.
     *
     * TODO: optimise this fix for HTML indentation to support tabs (or find
     * another fix).
     */
    return prepared.replace(/^[ ]{2,}/g, '');
  }
}
