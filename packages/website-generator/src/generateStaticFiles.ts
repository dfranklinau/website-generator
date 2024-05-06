import { DIRECTORIES } from './config/constants';
import { copyFiles } from './utils/copyFiles';
import { findFiles } from './utils/findFiles';

function generateStaticFiles(): void {
  const staticFiles = findFiles(DIRECTORIES.STATIC, {
    recursive: true,
  });

  copyFiles(staticFiles, DIRECTORIES.BUILD);
}

export { generateStaticFiles }
