import { TemplateParams } from './types.js';

/** The output directory supplied by the user, falling back to `outputDirectory` from the template or cwd */
export const getOutputDirectory = (params: TemplateParams) =>
  (params.options?.outputDirectory || params.outputDirectory || '') as string;
