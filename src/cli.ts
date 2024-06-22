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

const startTime = new Date();

console.log(
  figlet.textSync('scffld', { font: 'Doom' }) + ` v${packageJson.version}`
);

program
  .version(packageJson.version)
  .description('scffld')
  .arguments('<template>')
  .allowUnknownOption()
  .allowExcessArguments();

const template = process.argv[2];
const templateContent = fs.readFileSync(
  path.resolve(template + (template.endsWith('.md') ? '' : '.md'))
);

console.log('');
const spinner = ora(`Scaffolding template ${template}...`).start();

let codeblocks: any[] = [];
let params: any;

const md = markdownit();
const frontmatter = templateContent.toString().split('---')[1];
const fmParsed = YAML.parse(frontmatter);
if (fmParsed) {
  params = { ...fmParsed };
  if (fmParsed.props) {
    Object.keys(fmParsed.props).forEach((name: string) => {
      const option = new Option(`--${name}`);
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

  if (codeblocks && codeblocks.length > 0) {
    renderCodeblocks(codeblocks, params, spinner, startTime);
  }
});

program.parse(process.argv);

const parsedTemplate = md.parse(templateContent.toString(), {});
codeblocks = parsedTemplate.filter(
  (x) => x.type === 'fence' && x.tag === 'code'
);

if (params && params.options) {
  renderCodeblocks(codeblocks, params, spinner, startTime);
}
