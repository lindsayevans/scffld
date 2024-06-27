import path from 'node:path';
import fs from 'node:fs/promises';
import buffer from 'node:buffer';
import { globby } from 'globby';

import { TemplateFile } from '../lib/types.js';
import { renderTemplate } from '../lib/generator/renderTemplate.js';

export const GENERATE_COMMAND = 'generate';

export const generate = async (argv: string[]) => {
  const globs = argv.slice(3);
  const paths = await globby(globs);
  const files = await getFiles(paths);

  console.log(renderTemplate(files));
};

const getFiles = async (paths: string[]): Promise<TemplateFile[]> => {
  const files: TemplateFile[] = [];

  for await (const filename of paths) {
    let type = path.extname(filename).replace(/^\./, '');
    const content = await fs.readFile(filename);

    if (!buffer.isUtf8(content)) {
      type = 'base64';
    }

    const file: TemplateFile = {
      filename,
      type,
      content: content.toString(type === 'base64' ? 'base64' : undefined),
    };

    files.push(file);
  }

  return files;
};
