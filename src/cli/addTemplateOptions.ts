import { Command, Option } from 'commander';
import { TemplateParams } from '../lib/types.js';

export const addTemplateOptions = (
  program: Command,
  params: TemplateParams
) => {
  const outputDirOption = new Option('-o, --outputDirectory');
  outputDirOption.required = false;
  outputDirOption.optional = true;
  program.addOption(outputDirOption);

  if (params.props) {
    Object.keys(params.props).forEach((name: string) => {
      if (params.props && params.props[name]) {
        const prop = params.props[name];
        const option = new Option(
          `${prop.shortName ? `-${prop.shortName}, ` : ''}--${name}`
        );

        option.required = prop.required || false;
        option.optional = !option.required;
        option.defaultValue = prop.default;

        if (prop.type === 'boolean') {
          // @ts-expect-error
          option.parseArg = (value: string) => value === 'true';
        }

        if (prop.description) {
          option.description = prop.description;
        }

        program.addOption(option);
      }
    });
  }
};
