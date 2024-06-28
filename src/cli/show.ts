import { loadTemplate } from './loadTemplate.js';

export const SHOW_COMMAND = 'show';

export const show = async (argv: string[]) => {
  const templateName = argv[3];
  const template = await loadTemplate(templateName, { quiet: true });

  console.log(template);
};
