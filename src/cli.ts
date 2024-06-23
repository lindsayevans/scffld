#!/usr/bin/env node

import { createRequire } from 'node:module';
import { program } from 'commander';
import figlet from 'figlet';
import ora from 'ora';
import chalk from 'chalk';

import { loadTemplate } from './cli/loadTemplate.js';
import { getTemplateParams } from './lib/getTemplateParams.js';
import { addTemplateOptions } from './cli/addTemplateOptions.js';
import { populateTemplateOptions } from './lib/populateTemplateOptions.js';
import { processTemplate } from './cli/processTemplate.js';
import { TemplateParams } from './lib/types.js';
import { checkRequiredOptions } from './cli/checkRequiredOptions.js';

const startTime = new Date();

const { version } = createRequire(import.meta.url)('../package.json');

console.log(
  chalk.hex('#008080')(figlet.textSync('scffld', { font: 'Doom' })) +
    ' ' +
    chalk.bold.hex('#fa8072')(`v${version}`)
);

program
  .version(version || '0.0.0')
  .description('scffld')
  .arguments('<template>')
  .usage('<template> [options]')
  .allowUnknownOption();

const main = async () => {
  const template = process.argv[2];
  let params: TemplateParams = {};
  let templateContent = '';

  if (!template || template.startsWith('-')) {
    program.help();
  } else {
    templateContent = await loadTemplate(template);

    if (!templateContent || templateContent === '') {
      console.error('No template content :(');
      process.exit(1);
    }

    params = getTemplateParams(templateContent);
    addTemplateOptions(program, params);
  }

  let optionsOkay = true;
  program.action(async (template, options) => {
    // console.log(template, options, params);
    optionsOkay = await checkRequiredOptions(params, options);
    params = populateTemplateOptions(params, options);

    if (optionsOkay && params !== undefined && params.options) {
      console.log('');
      const spinner = ora(`Scaffolding template ${template}...`).start();

      processTemplate(templateContent, params, spinner, startTime);
    }
  });

  program.parse(process.argv);
};

main();
