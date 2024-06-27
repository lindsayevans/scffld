import path from 'node:path';
import fs from 'node:fs/promises';
import { globby } from 'globby';

import { TemplateFile } from '../lib/types.js';

export const GENERATE_COMMAND = ':generate';

export const generate = async (argv: string[]) => {
  const globs = argv.slice(3);
  const paths = await globby(globs);
  const files = await getFiles(paths);

  console.log(files);
};

const getFiles = async (paths: string[]): Promise<TemplateFile[]> => {
  const files: TemplateFile[] = [];

  for await (const filename of paths) {
    const type = path.extname(filename).replace(/^\./, '');
    const content = await fs.readFile(filename);

    const file: TemplateFile = {
      filename,
      type,
      content: content.toString(),
    };

    files.push(file);
  }

  return files;
};
