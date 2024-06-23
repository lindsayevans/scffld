import { TemplateOptions, TemplateParams } from './types.js';

export const populateTemplateOptions = (
  params: TemplateParams,
  options: TemplateOptions
) => ({ ...params, options });
