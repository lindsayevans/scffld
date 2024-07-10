import child_process from 'node:child_process';
import enquirer from 'enquirer';
import chalk from 'chalk';

import { getOutputDirectory } from '../lib/getOutputDirectory.js';
import { renderTemplateBlock } from '../lib/renderTemplateBlock.js';
import { TemplateParams } from '../lib/types.js';
import { sanitiseCommand } from './sanitiseCommand.js';

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
    const parsedCommand = renderTemplateBlock('path', command, params);
    const sanitisedCommand = sanitiseCommand(parsedCommand);
    parsedCommands.push(sanitisedCommand);
  });

  console.log('\nThis template wants to run the following commands');
  console.log(
    chalk.yellow.bold(
      'Please ensure that you trust the authors or have reviewed the template'
    )
  );
  const answer = await enquirer.prompt<Record<'commands', string[]>>([
    {
      name: 'commands',
      type: 'multiselect',
      message: 'Check all that you want to be run',
      choices: parsedCommands.map((x) => ({
        name: x,
        value: x,
        checked: false,
      })),
    },
  ]);

  answer.commands.forEach((command: string) => {
    child_process.execSync(command, { cwd: outputDirectory, stdio: 'inherit' });
  });
};
