import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';

export const loadTemplate = async (templateName: string): Promise<string> => {
  let templateContent: string;

  if (
    templateName.startsWith('http:') ||
    templateName.startsWith('https:') ||
    templateName.startsWith('github:')
  ) {
    // Remote template
    console.log('');
    const fetchSpinner = ora(`Fetching template ${templateName}...`).start();
    let url = templateName;

    if (templateName.startsWith('github:')) {
      let revision = 'HEAD';
      const revisionMatch = templateName.match(/@([^\/]*)/i);
      if (revisionMatch) {
        revision = revisionMatch[1];
        templateName = templateName.replace(revisionMatch[0], '');
      }

      const parts = templateName.replace('github:', '').split('/');

      url = `https://raw.githubusercontent.com/${parts[0]}/${
        parts[1]
      }/${revision}/${parts.slice(2).join('/')}${
        templateName.endsWith('.md') ? '' : '.md'
      }`;
    }

    const response = await fetch(url);
    templateContent = await response.text();
    fetchSpinner.stopAndPersist({ symbol: '✅' });
  } else {
    // Local template
    templateContent = fs
      .readFileSync(
        path.resolve(templateName + (templateName.endsWith('.md') ? '' : '.md'))
      )
      .toString();
  }

  return templateContent;
};
