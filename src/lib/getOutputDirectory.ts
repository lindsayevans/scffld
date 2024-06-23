import { TemplateParams } from './types.js';

export const getOutputDirectory = (params: TemplateParams) =>
  (params.options?.outputDirectory || params.outputDirectory || '') as string;
