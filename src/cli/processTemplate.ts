import { Ora } from 'ora';
import path from 'path';

import { writeFile } from './writeFile.js';
import { renderMessage } from './renderMessage.js';
import { parseTemplate } from '../lib/parseTemplate.js';
import { getOutputDirectory } from '../lib/getOutputDirectory.js';

export const processTemplate = (
  templateContent: string,
  params: any,
  spinner: Ora,
  startTime: Date
) => {
  const files = parseTemplate(templateContent, params);
  const outputDirectory = getOutputDirectory(params);

  files.forEach((file) => {
    writeFile(file);
  });

  const endTime = new Date();
  const time = endTime.getTime() - startTime.getTime();

  spinner.stopAndPersist({ symbol: '✅' });
  console.log(`\nWrote ${files.length} files in ${time}ms`);

  console.log('');
  console.log(path.resolve(outputDirectory) + path.sep);
  files.forEach((file) => {
    console.log(` ${file.filename.replace(outputDirectory, '')}`);
  });
  console.log('');

  if (params.postInstallMessage) {
    console.log(renderMessage(params.postInstallMessage, params));
  }
};
