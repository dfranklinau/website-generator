/* eslint-disable @typescript-eslint/no-var-requires */
/* global process */
var glob = require('glob');
var path = require('path');
var faucet = require('faucet');
var test = require('tape');

test.createStream().pipe(faucet()).pipe(process.stdout);

const args = process.argv.slice(2);
const patterns = args.length > 0 ? args : ['./dist/**/*.test.js'];

patterns.forEach((pattern) => {
  const files = glob.sync(pattern);

  if (!Array.isArray(files)) {
    throw new TypeError(
      '`glob.sync` did not return an array or throw an error.'
    );
  }

  files.forEach((file) => {
    require(path.resolve(file));
  });
});
