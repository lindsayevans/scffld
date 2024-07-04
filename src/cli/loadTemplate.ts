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

      // Try via TemplateProxy API with very short timeout
      try {
        const proxyUrl = `https://scffld-api.azurewebsites.net/TemplateProxy/${parts.join(
          '/'
        )}${revision !== 'HEAD' ? `/${revision}` : ''}`;
        console.info(`\nFetching from proxy: ${proxyUrl}`);
        const response = await fetch(proxyUrl, {
          signal: AbortSignal.timeout(3000),
        });
        if (response.ok && response.body) {
          templateContent = await response.text();
          if (templateContent && templateContent.indexOf('---') !== -1) {
            if (fetchSpinner !== undefined && !quiet) {
              fetchSpinner.succeed();
            }
            console.info(`\nGot template content from '${proxyUrl}'`);
            return templateContent;
          }
        }
      } catch (e) {
        // Catch errors & fallback to direct GitHub access
        console.warn('\nError from proxy:', e);
      }
      console.warn('\nSomething broke in the proxy, fallback to GH');
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
