import path from "path";
import fs from "fs";
import { DIRECTORIES } from './config/constants';
import { copyFiles } from './utils/copyFiles';
import { findFiles } from './utils/findFiles';

// Get an absolute URL of the `init` directory that contains the example files.
const source = path.resolve(__dirname, '../init');

// The path where the files will be copied to.
const target = process.cwd();

export const init = async (): Promise<void> => {
  // Check if any of the example directories contain files.
  const reserved = [
    ...findFiles(DIRECTORIES.ASSETS),
    ...findFiles(DIRECTORIES.CONTENT),
    ...findFiles(DIRECTORIES.HELPERS),
    ...findFiles(DIRECTORIES.SHORTCODES),
    ...findFiles(DIRECTORIES.STATIC),
    ...findFiles(DIRECTORIES.TEMPLATES),
  ]

  // Exit with a warning if one or more directories are not empty.
  if (reserved.length > 0) {
    console.warn(`A website-generator structure already exists.`);
    return;
  }

  // Copy the `init` directory relative to where the script was ran.
  fs.promises.cp(source, target, {
    recursive: true
  });

  console.info("Created a website-generator structure.");
}
