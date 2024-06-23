import { Ora } from 'ora';

import { writeFile } from './writeFile.js';
import { renderMessage } from './renderMessage.js';
import { parseTemplate } from '../lib/parseTemplate.js';

export const processTemplate = (
  templateContent: string,
  params: any,
  spinner: Ora,
  startTime: Date
) => {
  const files = parseTemplate(templateContent, params);

  files.forEach((file) => {
    writeFile(file);
  });

  const endTime = new Date();
  const time = endTime.getTime() - startTime.getTime();

  spinner.stopAndPersist({ symbol: '✅' });
  console.log(`\nWrote ${files.length} files in ${time}ms`);

  if (params.postInstallMessage) {
    console.log(renderMessage(params.postInstallMessage, params));
  }
};
