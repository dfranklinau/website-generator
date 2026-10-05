import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'node:test';

const getPartialTemplates = proxyquire('./getPartialTemplates', {
  './findFiles': {
    findFiles: sinon.fake.returns([
      'templates/_partials/partial.hbs',
    ]),
  },
  './readFile': {
    readFile: sinon.fake(arg => {
      if (arg === 'templates/_partials/partial.hbs') {
        return '<p>Partial</p>'
      };
    })
  },
}).getPartialTemplates;

test('`getPartialTemplates`', async (t: test.TestContext) => {
  const partials = await getPartialTemplates();

  t.assert.deepEqual(
    partials,
    {
      partial: '<p>Partial</p>',
    },
    'returns a formatted object of partial names and templates',
  );
});
