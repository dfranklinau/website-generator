import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'node:test';

proxyquire.noCallThru();

const getHelpers = proxyquire('./getHelpers', {
  './findFiles': {
    findFiles: sinon.fake.returns([
      './helpers/helper.js',
      './helpers/namedExport.js',
      './helpers/hasError.js',
    ]),
  },
  'helpers/helper.js': function () {
    return 'helper';
  },
  'helpers/namedExport.js': {
    namedExport: function () {
      return 'namedExport';
    },
  },
  'helpers/hasError.js': function () {
    // @ts-expect-error: intentionally invalid code for testing.
    asdfsadfsa;
  },
}).getHelpers;

test('`getHelpers`', async (t: test.TestContext) => {
  const processCwdStub = sinon.stub(process, 'cwd');
  processCwdStub.returns('./');

  const helpers = await getHelpers();

  t.assert.equal(
    helpers.helper(),
    'helper',
    `calls an imported helper's default export`,
  );

  t.assert.throws(() => {
    helpers.namedExport();
  }, `will not register a helper that does not have a default export`);

  t.assert.throws(() => {
    helpers.hasError();
  }, `will import a helper regardless of the code within`);
});
