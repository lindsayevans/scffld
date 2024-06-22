#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { Option, program } from 'commander';
import markdownit from 'markdown-it';
import YAML from 'yaml';
import figlet from 'figlet';
import ora from 'ora';

import packageJson from '../package.json' assert { type: 'json' };

import { renderCodeblocks } from './renderCodeblocks.js';
import chalk from 'chalk';

const startTime = new Date();

console.log(
  chalk.hex('#008080')(figlet.textSync('scffld', { font: 'Doom' })) +
    ' ' +
    chalk.bold.hex('#fa8072	')(`v${packageJson.version}`)
);

program
  .version(packageJson.version)
  .description('scffld')
  .arguments('<template>')
  .allowUnknownOption()
  .allowExcessArguments();

const main = async () => {
  const template = process.argv[2];

  let templateContent = '';

  if (
    template.startsWith('http:') ||
    template.startsWith('https:') ||
    template.startsWith('github:')
  ) {
    console.log('');
    const fetchSpinner = ora(`Fetching template ${template}...`).start();
    let url = template;

    if (template.startsWith('github:')) {
      const parts = template.replace('github:', '').split('/');
      url = `https://raw.githubusercontent.com/${parts[0]}/${
        parts[1]
      }/HEAD/${parts.slice(2).join('/')}${
        template.endsWith('.md') ? '' : '.md'
      }`;
    }

    const response = await fetch(url);
    templateContent = await response.text();
    fetchSpinner.stopAndPersist({ symbol: '✅' });
  } else {
    templateContent = fs
      .readFileSync(
        path.resolve(template + (template.endsWith('.md') ? '' : '.md'))
      )
      .toString();
  }

  if (templateContent === '') {
    console.error('No template content :(');
    process.exit(1);
  }

  let codeblocks: any[] = [];
  let params: any;

  const md = markdownit();
  const frontmatter = templateContent.split('---')[1];
  const fmParsed = YAML.parse(frontmatter);
  if (fmParsed) {
    const option = new Option('-o --outputDirectory');
    option.required = false;
    option.optional = true;
    program.addOption(option);

    params = { ...fmParsed };
    if (fmParsed.props) {
      Object.keys(fmParsed.props).forEach((name: string) => {
        const option = new Option(`--${name}`);
        option.description = fmParsed.props[name].description;
        option.required = fmParsed.props[name].required || false;
        option.optional = !option.required;
        option.defaultValue = fmParsed.props[name].default;
        if (fmParsed.props[name].type === 'boolean') {
          // @ts-expect-error
          option.parseArg = (value: string) => value === 'true';
        }
        program.addOption(option);
      });
    }
  }

  program.action((template, options) => {
    if (!params) {
      params = { options };
    } else {
      params.options = options;
    }
  });

  program.parse(process.argv);

  const parsedTemplate = md.parse(templateContent, {});
  codeblocks = parsedTemplate.filter(
    (x) => x.type === 'fence' && x.tag === 'code'
  );

  if (params && params.options) {
    console.log('');
    const spinner = ora(`Scaffolding template ${template}...`).start();

    renderCodeblocks(codeblocks, params, spinner, startTime);
  }
};

main();
