import test from 'tape';

import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { mockShortcodes } from './_fixtures';
import { parseShortcodes } from './parseShortcodes';

test('`parseShortcodes`', (t: test.Test) => {
  const renderer = new Renderer({ baseTemplate: '', config: {}, partials: {} });
  const markdownParser = new MarkdownParser(renderer, mockShortcodes);

  /**
   * Inline shortcode tests.
   */
  t.equal(
    parseShortcodes({
      content: '{{<shortcode/>}}',
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '<div></div>',
    'parses an inline shortcode',
  );

  t.equal(
    parseShortcodes({
      content: '{{<shortcode-with-attribute id="value"/>}}',
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '<div id="value"></div>',
    'parses an inline shortcode with an attribute',
  );

  t.equal(
    parseShortcodes({
      content:
        '{{<shortcode-with-multiple-attributes id="value" class="css"/>}}',
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '<div id="value" class="css"></div>',
    'parses an inline shortcode with multiple attributes',
  );

  t.equal(
    parseShortcodes({
      content:
        '{{<shortcode-with-array-attribute key="one" key="two" key="three"/>}}',
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '<div><ul><li>one</li><li>two</li><li>three</li></ul></div>',
    'parses an inline shortcode with an array attribute',
  );

  /**
   * Block shortcode tests with content that renders as plain text.
   */
  t.equal(
    parseShortcodes({
      content: `
{{<shortcode>}}
  **content**
{{</shortcode>}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div>**content**</div>',
    'parses a block shortcode with content',
  );

  t.equal(
    parseShortcodes({
      content: `
{{<shortcode-with-attribute id="value">}}
  **content**
{{</shortcode-with-attribute>}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value">**content**</div>',
    'parses a block shortcode with content and an attribute',
  );

  t.equal(
    parseShortcodes({
      content: `
{{<shortcode-with-multiple-attributes id="value" class="css">}}
  **content**
{{</shortcode-with-multiple-attributes>}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value" class="css">**content**</div>',
    'parses a block shortcode with content and multiple attributes',
  );

  t.equal(
    parseShortcodes({
      content: `
{{<shortcode-with-array-attribute key="one" key="two" key="three">}}
  **content**
{{</shortcode-with-array-attribute>}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div>**content**<ul><li>one</li><li>two</li><li>three</li></ul></div>',
    'parses a block shortcode with content and an array attribute',
  );

  /**
   * Block shortcode tests with content that renders to Markdown.
   */
  t.equal(
    parseShortcodes({
      content: `
{{%shortcode%}}
  **content**
{{%/shortcode%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div><p><strong>content</strong></p></div>',
    'parses a block shortcode with content as Markdown',
  );

  t.equal(
    parseShortcodes({
      content: `
{{%shortcode-with-attribute id="value"%}}
  **content**
{{%/shortcode-with-attribute%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value"><p><strong>content</strong></p></div>',
    'parses a block shortcode with content and an attribute as Markdown',
  );

  t.equal(
    parseShortcodes({
      content: `
{{%shortcode-with-multiple-attributes id="value" class="css"%}}
  **content**
{{%/shortcode-with-multiple-attributes%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value" class="css"><p><strong>content</strong></p></div>',
    'parses a block shortcode with content and multiple attributes as Markdown',
  );

  t.equal(
    parseShortcodes({
      content: `
{{%shortcode-with-array-attribute key="one" key="two" key="three"%}}
  **content**
{{%/shortcode-with-array-attribute%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div><p><strong>content</strong></p><ul><li>one</li><li>two</li><li>three</li></ul></div>',
    'parses a block shortcode with content and an array attribute as Markdown',
  );

  /**
   * Special cases.
   */
  t.equal(
    parseShortcodes({
      content: '{{%shortcode/%}} content {{%shortcode/%}}',
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '<div></div> content <div></div>',
    'parses two inline shortcodes on the same line, preserving other content as well',
  );

  t.equal(
    parseShortcodes({
      content:
        '{{%shortcode-with-attribute id="value"/%}} content {{%shortcode-with-attribute id="value"/%}}',
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '<div id="value"></div> content <div id="value"></div>',
    'parses two inline shortcodes with attributes on the same line, preserving other content as well',
  );

  t.equal(
    parseShortcodes({
      content: `
{{%shortcode%}}
  {{%shortcode%}}
    content
  {{%/shortcode%}}
{{%/shortcode%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div><div><p>content</p></div></div>',
    'parses a nested group of block shortcodes',
  );

  t.equal(
    parseShortcodes({
      content: `
{{%shortcode-with-attribute id="value"%}}
  {{%shortcode%}}
    content
  {{%/shortcode%}}
{{%/shortcode-with-attribute%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value"><div><p>content</p></div></div>',
    'parses a nested group of different block shortcodes',
  );

  t.equal(
    parseShortcodes({
      content: `
{{<shortcode-with-attribute id="value">}}
  {{<shortcode-with-attribute id="one"/>}}
  {{<shortcode-with-attribute id="two"/>}}
  {{<shortcode-with-attribute id="three"/>}}
{{</shortcode-with-attribute>}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value"><div id="one"></div>\n  <div id="two"></div>\n  <div id="three"></div></div>',
    'parses a nested group of inline shortcodes in a block shortcode',
  );

  t.equal(
    parseShortcodes({
      content: `
{{%shortcode-with-attribute id="value"%}}
  {{%shortcode-with-attribute id="one"/%}}
  {{%shortcode-with-attribute id="two"/%}}
  {{%shortcode-with-attribute id="three"/%}}
{{%/shortcode-with-attribute%}}`,
      markdownParser,
      renderer,
      shortcodes: mockShortcodes,
    }),
    '\n<div id="value"><div id="one"></div>\n  <div id="two"></div>\n  <div id="three"></div></div>',
    'parses a nested group of inline shortcodes in a block shortcode as Markdown',
  );

  t.end();
});
