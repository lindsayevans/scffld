import path from 'node:path';
import fs from 'node:fs/promises';
import buffer from 'node:buffer';
import { globby } from 'globby';

import { TemplateFile } from '../lib/types.js';
import { renderTemplate } from '../lib/generator/renderTemplate.js';

export const GENERATE_COMMAND = 'generate';

export const generate = async (argv: string[]) => {
  let globs = argv.slice(3);

  const basePathArg = globs.findIndex((x) => x.startsWith('--basePath='));
  let basePath: string | undefined = undefined;
  if (basePathArg !== -1) {
    basePath = globs.splice(basePathArg, 1)[0].split('=')[1];
    console.log('basePath:', basePath);
  }

  const paths = await globby(globs);
  const files = await getFiles(paths, basePath);

  console.log(renderTemplate(files));
};

const getFiles = async (
  paths: string[],
  basePath?: string
): Promise<TemplateFile[]> => {
  const files: TemplateFile[] = [];

  for await (const filename of paths) {
    let type = path.extname(filename).replace(/^\./, '');
    const content = await fs.readFile(filename);

    if (!buffer.isUtf8(content)) {
      type = 'base64';
    }

    const file: TemplateFile = {
      filename: basePath ? filename.replace(basePath, '') : filename,
      type,
      content: content.toString(type === 'base64' ? 'base64' : undefined),
    };

    files.push(file);
  }

  return files;
};
