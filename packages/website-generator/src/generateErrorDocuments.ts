import fs from 'fs';
import { DIRECTORIES } from './config/constants';
import { readFile } from './utils/readFile';
import type { Renderer } from './Renderer';

async function generateErrorDocuments(props: {
  config: Record<string, unknown>;
  renderer: Renderer;
}) {
  const { config, renderer } = props;

  const templateFile = `${DIRECTORIES.TEMPLATES}_404.hbs`;
  const content = (await readFile(templateFile)) as string;

  fs.writeFileSync(
    `${DIRECTORIES.BUILD}404.html`,
    renderer.render({
      content,
      head: {
        title: config.errorDocument404Title || '404',
      },
    }),
  );
}

export { generateErrorDocuments }
