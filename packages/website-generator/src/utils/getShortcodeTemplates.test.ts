import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'node:test';

const getShortcodeTemplates = proxyquire('./getShortcodeTemplates', {
  './findFiles': {
    findFiles: sinon.fake.returns([
      './shortcodes/shortcode.hbs',
      './shortcodes/shortcode-with-attribute.hbs',
    ]),
  },
  './readFile': {
    readFile: sinon.fake(arg => {
      if (arg === './shortcodes/shortcode.hbs') {
        return '<p>Shortcode</p>'
      } else if (arg === './shortcodes/shortcode-with-attribute.hbs') {
        return '<p>Shortcode with attribute</p>';
      };
    })
  },
}).getShortcodeTemplates;

test('`getShortcodeTemplates`', async (t: test.TestContext) => {
  const shortcodes = await getShortcodeTemplates();

  t.assert.deepEqual(
    shortcodes,
    [
      {
        name: 'shortcode',
        template: '<p>Shortcode</p>',
      },
      {
        name: 'shortcode-with-attribute',
        template: '<p>Shortcode with attribute</p>',
      },
    ],
    'returns an array of shortcode names and templates',
  );
});
