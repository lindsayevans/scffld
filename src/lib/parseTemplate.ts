import markdownit from 'markdown-it';
import YAML from 'yaml';

import { TemplateFile, TemplateParams } from './types.js';
import { renderTemplateBlock } from './renderTemplateBlock.js';

export const parseTemplate = (
  templateContent: string,
  params: TemplateParams
): TemplateFile[] => {
  const md = markdownit();
  const parsedTemplate = md.parse(templateContent, {});
  let codeblocks = parsedTemplate.filter(
    (x) => x.type === 'fence' && x.tag === 'code'
  );

  const files = codeblocks
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

      const renderedPath = renderTemplateBlock(
        'path',
        parsedFileInfo.filename,
        params
      );
      const renderedFile = renderTemplateBlock(
        type,
        codeblock.content,
        params,
        renderedPath
      );

      return {
        type,
        filename:
          (params.options?.outputDirectory || params.outputDirectory || '') +
          renderedPath,
        content: renderedFile,
      };
    })
    .filter((x) => x !== undefined) as TemplateFile[];

  return files;
};
