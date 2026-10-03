import test from 'node:test';

import { Renderer } from './Renderer';

test('`Renderer`', (t: test.TestContext) => {
  const renderer = new Renderer({
    baseTemplate: '{{&content}}',
    config: {},
    partials: {
      partial: '(partial)',
    },
  });

  t.assert.test('`Renderer.render`', (t: test.TestContext) => {
    t.assert.equal(
      renderer.render({
        content: 'hello world',
      }),
      'hello world',
      'renders content using the base template',
    );

    t.assert.equal(
      renderer.render(
        {
          content: 'hello world',
        },
        {
          baseTemplate: 'custom template: {{&content}}',
        },
      ),
      'custom template: hello world',
      'renders content using a custom base template',
    );

    t.assert.equal(
      renderer.render(
        {
          content: 'hello world',
          page: {
            content: 'goodbye world',
          },
        },
        {
          baseTemplate: '{{&content}} + page content: {{&page.content}}',
        },
      ),
      'hello world + page content: goodbye world',
      'renders content with page variables ',
    );

    t.assert.equal(
      renderer.render(
        {
          content: 'hello world',
        },
        {
          baseTemplate: '{{&content}} + partial: {{> partial}}',
        },
      ),
      'hello world + partial: (partial)',
      'renders content with partials ',
    );

    t.assert.match(
      renderer.render(
        {
          content: 'hello world',
        },
        {
          baseTemplate: '{{runtime.date.year}}',
        },
      ),
      /\d{4}/,
      'renders content with a runtime variable of the current year',
    );

  });

});
