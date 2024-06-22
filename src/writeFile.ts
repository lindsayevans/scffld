import fs from 'node:fs';
import path from 'node:path';

export const writeFile = (filePath: string, fileContent: string) => {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(filePath, fileContent);
};
