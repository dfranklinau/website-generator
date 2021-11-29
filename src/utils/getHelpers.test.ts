import proxyquire from 'proxyquire';
import sinon from 'sinon';
import test from 'tape';

import * as findFiles from './findFiles';

proxyquire.noCallThru();

const getHelpers = proxyquire('./getHelpers', {
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

test('`getHelpers`', async (t: test.Test) => {
  const processCwdStub = sinon.stub(process, 'cwd');
  const findFilesStub = sinon.stub(findFiles, 'findFiles');

  processCwdStub.returns('./');
  findFilesStub.returns([
    './helpers/helper.js',
    './helpers/namedExport.js',
    './helpers/hasError.js',
  ]);

  const helpers = await getHelpers();

  t.equal(
    helpers.helper(),
    'helper',
    `calls an imported helper's default export`,
  );

  t.throws(() => {
    helpers.namedExport();
  }, `will not register a helper that does not have a default export`);

  t.throws(() => {
    helpers.hasError();
  }, `will import a helper regardless of the code within`);

  findFilesStub.restore();
  t.end();
});
