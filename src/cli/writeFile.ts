import fs from 'node:fs';
import path from 'node:path';
import { TemplateFile } from '../lib/types.js';

export const writeFile = (file: TemplateFile) => {
  const directory = path.dirname(file.filename);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(
    file.filename,
    file.content,
    file.type === 'base64' ? 'binary' : undefined
  );
};
