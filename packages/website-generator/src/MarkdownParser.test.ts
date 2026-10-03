import test from 'node:test';

import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';

import { mockMarkdown, mockShortcodes } from './_fixtures';

test('`MarkdownParser`', (t: test.TestContext) => {
  const renderer = new Renderer({ baseTemplate: '', config: {}, partials: {} });
  const markdownParser = new MarkdownParser(renderer, mockShortcodes);

  t.assert.test('`MarkdownParser.getOptions`', (t: test.TestContext) => {
    t.assert.deepEqual(
      markdownParser.getOptions(mockMarkdown, {
        menu: {
          name: 'main',
          order: 1,
        },
        toc: true,
        url: 'url',
      }),
      {
        menu: {
          name: 'main',
          order: 1,
        },
        toc: '<ol>\n<li><a href="#heading">Heading</a>\n<ol>\n<li><a href="#heading-1">Heading</a></li>\n</ol></li>\n</ol>',
        url: 'url',
      },
      'parses front-matter containing all supported options',
    );

    t.assert.deepEqual(
      markdownParser.getOptions(mockMarkdown, {
        menu: {
          name: 'main',
        },
      }),
      {
        menu: {
          name: 'main',
          order: null,
        },
        toc: false,
        url: false,
      },
      'parses front-matter containing an incomplete menu declaration',
    );

    t.assert.deepEqual(
      markdownParser.getOptions(mockMarkdown, {
        url: '/',
      }),
      {
        menu: false,
        toc: false,
        url: '/',
      },
      'parses front-matter containing a URL removal',
    );

    t.assert.deepEqual(
      markdownParser.getOptions(mockMarkdown, {
        url: '/replacement/',
      }),
      {
        menu: false,
        toc: false,
        url: 'replacement',
      },
      'parses front-matter containing a URL replacement, removing any slashes',
    );

    t.assert.deepEqual(
      markdownParser.getOptions(mockMarkdown, {}),
      {
        menu: false,
        toc: false,
        url: false,
      },
      'parses front-matter containing no supported options',
    );

  });

  t.assert.test('`MarkdownParser.parse`', (t: test.TestContext) => {
    const parsed = markdownParser.parse(mockMarkdown);

    /**
     * @TODO: the table of content's anchors will not match the auto-generated
     * IDs on duplicate headings (this is due to the ID generation in
     * `heading_open` not being aware of other headings).
     */
    t.assert.equal(
      parsed.content,
      `<h2 id="heading">Heading</h2>\n<p>This is some Markdown content.</p>\n<h3 id="heading">Heading</h3>\n<p>There are a few Markdown elements in here:</p>\n<ul>\n<li>such</li>\n<li>as</li>\n<li>lists</li>\n</ul>`,
      'parses the contents of a Markdown file',
    );

    t.assert.equal(
      parsed.matter.title,
      'Markdown Title',
      'parses a string from a file with front-matter',
    );

    t.assert.equal(
      parsed.matter.date,
      '1979-05-27',
      'parses a date from a file with front-matter',
    );

    t.assert.equal(
      parsed.matter.toc,
      true,
      'parses a boolean from a file with front-matter',
    );

    t.assert.deepEqual(
      parsed.options,
      {
        menu: false,
        toc: '<ol>\n<li><a href="#heading">Heading</a>\n<ol>\n<li><a href="#heading-1">Heading</a></li>\n</ol></li>\n</ol>',
        url: false,
      },
      'generates an `options` object containing data for special properties',
    );

  });

});
