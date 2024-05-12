import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { generateContent } from './generateContent';

const renderer = new Renderer({
  baseTemplate: '{{&content}}',
  config: {},
  partials: {},
});

const markdownParser = new MarkdownParser(renderer, []);

test('`generateContent`', async (t: test.Test) => {
  const readdir = sinon.stub(fs.promises, 'readdir');
  readdir.withArgs('./content/', { withFileTypes: true }).resolves([]);

  await generateContent({
    markdownParser,
    renderer,
  })

  /**
   * The modules within `generateContent` are all tested individually, there is
   * nothing to test here besides the fact that the methods are called and do
   * not throw.
   */
  t.pass('generates content without errors');

  readdir.restore();
  t.end();
});
