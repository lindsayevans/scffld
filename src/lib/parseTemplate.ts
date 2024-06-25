import markdownit from 'markdown-it';
import YAML from 'yaml';

import { TemplateFile, TemplateParams } from './types.js';
import { renderTemplateBlock } from './renderTemplateBlock.js';
import { getOutputDirectory } from './getOutputDirectory.js';
import { sanitisePath } from './sanitisePath.js';

export const parseTemplate = (
  templateContent: string,
  params: TemplateParams
): TemplateFile[] => {
  const md = markdownit();
  const parsedTemplate = md.parse(templateContent, {});

  const files = parsedTemplate
    .filter((x) => x.type === 'fence' && x.tag === 'code')
    .map((codeblock) => {
      const type = codeblock.info.split(' ')[0].trim();
      const fileInfo = codeblock.info.replace(`${type} `, '').trim();

      // Normal code block, skip
      if (!fileInfo || fileInfo === '' || fileInfo === type) {
        return;
      }

      const parsedFileInfo = YAML.parse(fileInfo);

      if (
        !parsedFileInfo.filename ||
        (params.options &&
          parsedFileInfo.condition &&
          !params.options[parsedFileInfo.condition])
      ) {
        return;
      }

      const renderedPath = sanitisePath(
        renderTemplateBlock('path', parsedFileInfo.filename, params)
      );
      const renderedFile = renderTemplateBlock(
        type,
        codeblock.content,
        params,
        renderedPath
      );

      return {
        type,
        filename: getOutputDirectory(params) + renderedPath,
        content: renderedFile,
      };
    })
    .filter((x) => x !== undefined) as TemplateFile[];

  return files;
};
