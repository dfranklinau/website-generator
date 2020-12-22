import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { config } from '../config';
import { getContentTemplate } from './getContentTemplate';

test('`getContentTemplate`', (t: test.Test) => {
  let contentTemplate = null;
  const readFileSync = sinon.stub(fs, 'readFileSync');

  readFileSync
    .withArgs(`${config.DIRECTORIES.TEMPLATES}index.hbs`)
    .returns('index template');

  readFileSync
    .withArgs(`${config.DIRECTORIES.TEMPLATES}directory/index.hbs`)
    .returns('directory index template');

  readFileSync
    .withArgs(`${config.DIRECTORIES.TEMPLATES}non-existant/index.hbs`)
    .throws();
  readFileSync
    .withArgs(`${config.DIRECTORIES.TEMPLATES}directory/other.hbs`)
    .throws();
  readFileSync.withArgs(`${config.DIRECTORIES.TEMPLATES}other.hbs`).throws();

  contentTemplate = getContentTemplate('index', []);

  t.ok(
    readFileSync.calledOnce,
    'should call `fs.readFileSync` once when no directories are passed'
  );
  t.equal(
    contentTemplate,
    'index template',
    'returns the template when no directories are passed'
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('index', ['directory']);

  t.ok(
    readFileSync.calledOnce,
    'should call `fs.readFileSync` once when a directory is passed'
  );
  t.equal(
    contentTemplate,
    'directory index template',
    'return the directory template when a directory is passed'
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('index', ['non-existant']);

  t.ok(
    readFileSync.calledTwice,
    'should call `fs.readFileSync` twice when a non-existant directory is passed'
  );
  t.equal(
    contentTemplate,
    'index template',
    'return the template when a non-existant directory is passed'
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('other', ['directory']);

  t.ok(
    readFileSync.calledTwice,
    'should call `fs.readFileSync` twice when a non-existant template type is passed'
  );
  t.equal(
    contentTemplate,
    '',
    'return an empty string when no matching template exists'
  );

  readFileSync.restore();
  t.end();
});
