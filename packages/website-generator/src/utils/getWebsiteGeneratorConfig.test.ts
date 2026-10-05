import fs from 'fs';
import sinon from 'sinon';
import test from 'node:test';

import { getWebsiteGeneratorConfig } from './getWebsiteGeneratorConfig';

test('`getWebsiteGeneratorConfig`', async (t: test.TestContext) => {
  const readFileStub = sinon.stub(fs.promises, 'readFile');
  readFileStub.withArgs('website-generator.config.json').onCall(0).resolves('{ "key": "value" }').onCall(1).resolves('string').onCall(2).rejects()

  t.assert.deepEqual((await getWebsiteGeneratorConfig()), { key: "value" }, 'returns a parsed JSON file');
  t.assert.deepEqual((await getWebsiteGeneratorConfig()), {}, 'returns an empty object when the file cannot be parsed as JSON');
  t.assert.deepEqual((await getWebsiteGeneratorConfig()), {}, 'returns an empty object when there is an error');

  readFileStub.restore();
});
