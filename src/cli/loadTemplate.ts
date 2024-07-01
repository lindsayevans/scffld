import fs from 'node:fs';
import path from 'node:path';
import ora, { Ora } from 'ora';

export const loadTemplate = async (
  templateName: string,
  options: { quiet?: boolean } = {}
): Promise<string> => {
  let templateContent: string;
  const { quiet } = options;

  if (
    templateName.startsWith('http:') ||
    templateName.startsWith('https:') ||
    templateName.startsWith('github:') ||
    templateName.startsWith('reg:')
  ) {
    // Remote template
    let fetchSpinner: Ora | undefined = undefined;
    if (!quiet) {
      console.log('');
      fetchSpinner = ora(`Fetching template ${templateName}...`).start();
    }
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
    } else if (templateName.startsWith('reg:')) {
      let revision = 'HEAD';
      const revisionMatch = templateName.match(/@([^\/]*)/i);
      if (revisionMatch) {
        revision = revisionMatch[1];
        templateName = templateName.replace(revisionMatch[0], '');
      }

      const parts = templateName.replace('reg:', '').split('/');

      url = `https://raw.githubusercontent.com/scffld-dev/website/${revision}/templates/${parts.join(
        '/'
      )}${templateName.endsWith('.md') ? '' : '.md'}`;
    }

    const response = await fetch(url);
    templateContent = await response.text();
    if (fetchSpinner !== undefined && !quiet) {
      fetchSpinner.succeed();
    }
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
