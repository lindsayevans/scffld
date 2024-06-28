import { TemplateFile } from '../types.js';

export const renderTemplate = (files: TemplateFile[]) => {
  let template = `---
# outputDirectory: ./src/
# props:
#   name:
#     type: string
#     required: true
---

`;

  const fileTemplates = files.map((file) => {
    const bt = '```';
    return `${bt}${file.type} { filename: '${file.filename}' }
${file.content}
${bt}`;
  });

  template += fileTemplates.join('\n\n\n');

  return template;
};
