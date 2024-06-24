import fs from 'node:fs';
import { TemplateFile, TemplateParams } from '../lib/types.js';
import inquirer from 'inquirer';
import { Ora } from 'ora';

export const checkExistingFiles = async (
  files: TemplateFile[],
  params: TemplateParams,
  spinner: Ora
) => {
  if (params.options && params.options['overwrite'] !== undefined) {
    return params.options['overwrite'];
  }

  let overwrite = true;
  const filesToOverwrite: string[] = [];
  files.forEach((file) => {
    const exists = fs.existsSync(file.filename);
    if (exists) {
      overwrite = false;
      filesToOverwrite.push(file.filename);
    }
  });

  if (!overwrite) {
    spinner.stop();
    console.log('\nThis will overwrite the following files:');
    filesToOverwrite.forEach((file) => {
      console.log(` - ${file}`);
    });
    const overwriteAnswer = await inquirer.prompt([
      {
        name: 'overwrite',
        type: 'confirm',
        message: 'Do you wish to continue?',
        default: false,
      },
    ]);
    overwrite = overwriteAnswer.overwrite;
    spinner.start();
  }

  return overwrite;
};
