import fs from "fs-extra";
import path from "path";
import * as tar from "tar";
import { execSync } from "child_process";

// The version number to use in file names and directories.
const NPM_PACKAGE_VERSION = process.env.npm_package_version

// A temporary directory to prepare the release archive.
const TMP_RELEASE = ".tmp/release";

// The root directory of the release.
const ROOT = `website-generator-${NPM_PACKAGE_VERSION}`;

// The files and directories to copy to the release archive.
const SOURCE = [
  "LICENSE",
  "packages/website-generator/README.md",
  "packages/website-generator/bin",
  "packages/website-generator/dist",
  "packages/website-generator/package.json",
];

// Set up the temporary directory to prepare the release archive.
await fs.mkdirp(TMP_RELEASE);
await fs.emptydir(TMP_RELEASE);

// Test the release (which also builds the release).
execSync("npm run test", { cwd: "packages/website-generator" });

// Copy all required files and directories to the release archive.
await Promise.all(SOURCE.map(async (item) => {
  const basename = path.basename(item);
  return fs.copy(item, path.join(TMP_RELEASE, ROOT, basename));
}));

// Create an archive from the array of source files, using the version number
// from `package.json` in the file name. Set the `cwd` so that the root
// directory is the value of `ROOT` and does not include `TMP_RELEASE`.
tar.c(
  {
    cwd: path.join(TMP_RELEASE),
    file: `website-generator-${NPM_PACKAGE_VERSION}.tar.gz`,
    gzip: true,
  },
  [ROOT]
);
