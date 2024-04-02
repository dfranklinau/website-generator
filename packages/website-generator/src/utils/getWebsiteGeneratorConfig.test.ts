import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { getWebsiteGeneratorConfig } from './getWebsiteGeneratorConfig';

test('`getWebsiteGeneratorConfig`', async (t: test.Test) => {
  const readFileStub = sinon.stub(fs.promises, 'readFile');
  readFileStub.withArgs('./website-generator.config.json').onCall(0).resolves('{ "key": "value" }').onCall(1).resolves('string').onCall(2).throws()

  t.deepEqual((await getWebsiteGeneratorConfig()), { key: "value" }, 'returns a parsed JSON file');
  t.deepEqual((await getWebsiteGeneratorConfig()), {}, 'returns an empty object when the file cannot be parsed as JSON');
  t.deepEqual((await getWebsiteGeneratorConfig()), {}, 'returns an empty object when there is an error');

  readFileStub.restore();
  t.end();
});
