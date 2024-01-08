import fs from 'fs';
import sinon from 'sinon';
import test from 'tape';

import { DIRECTORIES, EXTENSIONS } from '../config/constants';
import { getContentTemplate } from './getContentTemplate';

test('`getContentTemplate`', (t: test.Test) => {
  const readFileSync = sinon.stub(fs, 'readFileSync');

  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}page.${EXTENSIONS.TEMPLATES}`)
    .returns('page template');
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}section.${EXTENSIONS.TEMPLATES}`)
    .returns('section template');
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}_index.${EXTENSIONS.TEMPLATES}`)
    .returns('index template');
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}filename.${EXTENSIONS.TEMPLATES}`)
    .returns('named page template');

  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}directory/page.${EXTENSIONS.TEMPLATES}`)
    .returns('directory page template');
  readFileSync
    .withArgs(
      `${DIRECTORIES.TEMPLATES}directory/section.${EXTENSIONS.TEMPLATES}`,
    )
    .returns('directory section template');
  readFileSync
    .withArgs(
      `${DIRECTORIES.TEMPLATES}directory/filename.${EXTENSIONS.TEMPLATES}`,
    )
    .returns('named directory page template');

  readFileSync
    .withArgs(
      `${DIRECTORIES.TEMPLATES}non-existant/page.${EXTENSIONS.TEMPLATES}`,
    )
    .throws();
  readFileSync
    .withArgs(
      `${DIRECTORIES.TEMPLATES}non-existant/section.${EXTENSIONS.TEMPLATES}`,
    )
    .throws();

  let contentTemplate = null;

  /**
   * Template lookup without filenames.
   */
  contentTemplate = getContentTemplate('page', []);
  t.equal(
    contentTemplate,
    'page template',
    'return the template for a page when no directories are passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('section', []);
  t.equal(
    contentTemplate,
    'section template',
    'return the template for a section when no directories are passed',
  );

  contentTemplate = getContentTemplate('index', []);
  t.equal(
    contentTemplate,
    'index template',
    'return the template for the index section when no directories are passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('page', ['directory']);
  t.equal(
    contentTemplate,
    'directory page template',
    'return the directory template for a page when a directory is passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('section', ['directory']);
  t.equal(
    contentTemplate,
    'directory section template',
    'return the directory template for a section when a directory is passed',
  );

  contentTemplate = getContentTemplate('index', ['directory']);
  t.equal(
    contentTemplate,
    'index template',
    'return the template for the index section when a directory is passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('page', ['non-existant']);
  t.equal(
    contentTemplate,
    'page template',
    'return the index template for a page when a non-existant directory is passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('section', ['non-existant']);
  t.equal(
    contentTemplate,
    'section template',
    'return the index template for a section when a non-existant directory is passed',
  );

  contentTemplate = getContentTemplate('index', ['directory']);
  t.equal(
    contentTemplate,
    'index template',
    'return the template for the index section when a non-existant directory is passed',
  );

  /**
   * Template lookup with filenames (only applies to page templates).
   */
  contentTemplate = getContentTemplate('page', [], 'filename');
  t.equal(
    contentTemplate,
    'named page template',
    'return the template for a named page when no directories are passed',
  );

  contentTemplate = getContentTemplate('page', [], 'filename');
  t.equal(
    contentTemplate,
    'named page template',
    'return the template for a named page when no directories are passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('page', ['directory'], 'filename');
  t.equal(
    contentTemplate,
    'named directory page template',
    'return the directory template for a named page when a directory is passed',
  );

  readFileSync.resetHistory();
  contentTemplate = getContentTemplate('page', ['non-existant'], 'filename');
  t.equal(
    contentTemplate,
    'page template',
    'return the template for a named page when a non-existant directory is passed',
  );

  contentTemplate = getContentTemplate('page', [], 'non-existant');
  t.equal(
    contentTemplate,
    'page template',
    'return the template for a page when a the named page template does not exist',
  );

  /**
   * Template lookup when no templates exist.
   */
  readFileSync.reset();
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}page.${EXTENSIONS.TEMPLATES}`)
    .throws();
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}filename.${EXTENSIONS.TEMPLATES}`)
    .throws();
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}section.${EXTENSIONS.TEMPLATES}`)
    .throws();
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}_index.${EXTENSIONS.TEMPLATES}`)
    .throws();

  contentTemplate = getContentTemplate('page', []);
  t.equal(
    contentTemplate,
    '',
    'return an empty string when no matching page template exists',
  );

  contentTemplate = getContentTemplate('page', [], 'filename');
  t.equal(
    contentTemplate,
    '',
    'return an empty string when no matching named page template exists',
  );

  contentTemplate = getContentTemplate('section', []);
  t.equal(
    contentTemplate,
    '',
    'return an empty string when no matching section template exists',
  );

  contentTemplate = getContentTemplate('index', []);
  t.equal(
    contentTemplate,
    '',
    'return an empty string when no matching index section template exists',
  );

  /**
   * Template lookup when an index template does not exist but a section
   * template does.
   */
  readFileSync.reset();
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}_index.${EXTENSIONS.TEMPLATES}`)
    .throws();
  readFileSync
    .withArgs(`${DIRECTORIES.TEMPLATES}section.${EXTENSIONS.TEMPLATES}`)
    .returns('section template');

  contentTemplate = getContentTemplate('index', []);
  t.equal(
    contentTemplate,
    'section template',
    'return the template for a section when no index section template exists',
  );

  readFileSync.restore();
  t.end();
});
