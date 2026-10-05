import fs from 'fs';
import sinon from 'sinon';
import test from 'node:test';

import { MarkdownParser } from './MarkdownParser';
import { Renderer } from './Renderer';
import { generateContent } from './generateContent';

const renderer = new Renderer({
  baseTemplate: '{{&content}}',
  config: {},
  partials: {},
});

const markdownParser = new MarkdownParser(renderer, []);

test('`generateContent`', async (t: test.TestContext) => {
  const readdir = sinon.stub(fs.promises, 'readdir');
  readdir.withArgs('content', { withFileTypes: true }).resolves([]);

  await generateContent({
    markdownParser,
    renderer,
  })

  readdir.restore();
});
