import child_process from 'node:child_process';
import inquirer from 'inquirer';

import { getOutputDirectory } from '../lib/getOutputDirectory.js';
import { renderTemplateBlock } from '../lib/renderTemplateBlock.js';
import { TemplateParams } from '../lib/types.js';

export const runCommands = async (
  commands: string[],
  params: TemplateParams
) => {
  if (commands.length === 0) {
    return;
  }

  const outputDirectory = getOutputDirectory(params);
  const parsedCommands: string[] = [];

  commands.forEach((command) => {
    parsedCommands.push(renderTemplateBlock('path', command, params));
  });

  console.log('\nThis template wants to run the following commands:');
  const answer = await inquirer.prompt([
    {
      name: 'commands',
      type: 'checkbox',
      message: "Uncheck any you don't want to be run",
      choices: parsedCommands.map((x) => ({
        name: x,
        value: x,
        checked: true,
      })),
    },
  ]);

  answer.commands.forEach((command: string) => {
    child_process.execSync(command, { cwd: outputDirectory, stdio: 'inherit' });
  });
};
