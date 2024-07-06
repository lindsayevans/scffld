import YAML from 'yaml';

import { TemplateParams } from './types.js';

/** The parameters defined in `template` YAML frontmatter */
export const getTemplateParams = (template: string): TemplateParams => {
  let params = {};

  try {
    const frontmatter = template.split('---')[1];
    const fmParsed = YAML.parse(frontmatter);
    params = { ...fmParsed };
  } catch (e) {
    console.error('Error getting template params', e);
  }

  return params;
};
