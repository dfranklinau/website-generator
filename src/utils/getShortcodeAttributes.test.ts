import test from 'tape';

import { MarkdownParser } from '../MarkdownParser';
import { Renderer } from '../Renderer';
import { getShortcodeAttributes } from './getShortcodeAttributes';

test('`getShortcodeAttributes`', (t: test.Test) => {
  const renderer = new Renderer({ baseTemplate: '', config: {}, partials: {} });
  const markdownParser = new MarkdownParser(renderer, []);

  t.deepEqual(
    getShortcodeAttributes(
      'shortcode',
      '{{%shortcode id="value"%}}',
      markdownParser,
    ),
    {
      id: 'value',
    },
    `should return a named attribute's value`,
  );

  t.deepEqual(
    getShortcodeAttributes(
      'shortcode',
      '{{%shortcode id="value"/%}}',
      markdownParser,
    ),
    {
      id: 'value',
    },
    `should return a named attribute's value for a self-closing shortcode`,
  );

  t.deepEqual(
    getShortcodeAttributes(
      'shortcode',
      '{{%shortcode id="value" class="css"/%}}',
      markdownParser,
    ),
    {
      class: 'css',
      id: 'value',
    },
    'should return the values of multiple named attributes',
  );

  t.deepEqual(
    getShortcodeAttributes(
      'shortcode',
      '{{%shortcode key="one" key="two"/%}}',
      markdownParser,
    ),
    {
      key: ['one', 'two'],
    },
    'should return an array of values for an attribute name used multiple times',
  );

  t.end();
});
