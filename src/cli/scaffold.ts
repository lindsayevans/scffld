import { createRequire } from 'node:module';
import { program } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { loadTemplate } from './loadTemplate.js';
import { getTemplateParams } from '../lib/getTemplateParams.js';
import { addTemplateOptions } from './addTemplateOptions.js';
import { populateTemplateOptions } from '../lib/populateTemplateOptions.js';
import { processTemplate } from './processTemplate.js';
import { TemplateParams } from '../lib/types.js';
import { checkRequiredOptions } from './checkRequiredOptions.js';

export const scaffold = async (argv: string[]) => {
  const startTime = new Date();

  const { version } = createRequire(import.meta.url)('../../package.json');

  console.log(chalk.magenta('scffld') + ' ' + chalk.bold.grey(`v${version}`));

  program
    .version(version || '0.0.0')
    .description('scffld')
    .arguments('<template>')
    .usage('<template> [options]')
    .allowUnknownOption();

  const template = argv[2];
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

  program.action(async (template, options) => {
    // console.log(template, options, params);
    options = await checkRequiredOptions(params, options);
    params = populateTemplateOptions(params, options);

    if (params !== undefined && params.options) {
      console.log('');
      const spinner = ora(`Scaffolding template ${template}...`).start();

      await processTemplate(templateContent, params, spinner, startTime);
    }
  });

  program.parse(argv);
};
