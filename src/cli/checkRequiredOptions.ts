import chalk from 'chalk';
import { TemplateOptions, TemplateParams } from '../lib/types.js';

export const checkRequiredOptions = async (
  params: TemplateParams,
  options: TemplateOptions
): Promise<boolean> => {
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

  return optionsOkay;
};
