import { TemplateOptions, TemplateParams } from './types.js';

/** Merges user supplied `options` into the template's `params` */
export const populateTemplateOptions = (
  params: TemplateParams,
  options: TemplateOptions
) => ({ ...params, options });
