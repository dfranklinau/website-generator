import fs from 'fs';
import path from 'path';

type SaveContentToFileProps = (
  outputContent: string,
  contentPath: string,
) => void;

export const saveContentToFile: SaveContentToFileProps = (
  content,
  filePath,
) => {
  const directory = path.parse(filePath).dir;

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, content);
};
