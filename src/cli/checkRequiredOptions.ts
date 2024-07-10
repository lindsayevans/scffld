import chalk from 'chalk';
import enquirer from 'enquirer';

import { TemplateOptions, TemplateParams } from '../lib/types.js';

export const checkRequiredOptions = async (
  params: TemplateParams,
  options: TemplateOptions
): Promise<TemplateOptions> => {
  let optionsOkay = true;
  if (params.props) {
    Object.keys(params.props).forEach((k) => {
      if (
        params.props &&
        params.props[k].required &&
        params.props[k].default === undefined &&
        options[k] === undefined
      ) {
        const message = `Template prop '${k}' is required`;
        console.error(chalk.red(message));
        optionsOkay = false;
      }
    });
  }

  // Ask user for all options
  if (!optionsOkay) {
    try {
      if (params.props) {
        // FIXME: probably need to make our own type for enquirer.PromptOptions...
        const prompts: any[] = [];
        Object.keys(params.props).forEach((k) => {
          if (params.props) {
            const prop = params.props[k];
            prompts.push({
              type:
                prop.type === 'string'
                  ? 'input'
                  : prop.type === 'list'
                  ? 'select'
                  : 'toggle',
              name: k,
              message: prop.prompt || k,
              default: prop.default,
              choices: prop.type === 'list' ? prop.options : undefined,
            });
          }
        });

        prompts.push({
          type: 'input',
          name: 'outputDirectory',
          message: 'Output directory',
          default: params.outputDirectory,
        });

        const answers = await enquirer.prompt(prompts);

        options = { ...options, ...answers };
        optionsOkay = true;
      }
    } catch (e) {
      console.error('Error getting response', e);
    }
  }

  return options;
};
