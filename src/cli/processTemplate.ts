import { Ora } from 'ora';
import path from 'path';

import { writeFile } from './writeFile.js';
import { renderMessage } from './renderMessage.js';
import { parseTemplate } from '../lib/parseTemplate.js';
import { getOutputDirectory } from '../lib/getOutputDirectory.js';
import { checkExistingFiles } from './checkExistingFiles.js';
import { runCommands } from './runCommands.js';

export const processTemplate = async (
  templateContent: string,
  params: any,
  spinner: Ora,
  startTime: Date
) => {
  const files = parseTemplate(templateContent, params);
  const outputDirectory = getOutputDirectory(params);

  const overwriteFiles = await checkExistingFiles(files, params, spinner);

  if (!overwriteFiles) {
    spinner.fail();
    console.log(`\nCancelling so as to not overwrite files`);
    process.exit(1);
  }

  // TODO: How to handle no files?
  files.forEach((file) => {
    writeFile(file);
  });

  const endTime = new Date();
  const time = endTime.getTime() - startTime.getTime();

  spinner.succeed();
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

  if (params.postInstallCommands) {
    await runCommands(params.postInstallCommands, params);
  }
};
