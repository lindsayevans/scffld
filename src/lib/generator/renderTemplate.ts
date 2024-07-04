import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from 'change-case';

import { TemplateFile } from '../types.js';
import {
  getDirectiveCommentEnd,
  getDirectiveCommentStart,
} from '../renderTemplateBlock.js';

type ReplaceTokens = Record<string, string>;

export const renderTemplate = (
  files: TemplateFile[],
  replaceTokens?: ReplaceTokens
) => {
  let template = `---
outputDirectory: ./src/
props:
${
  replaceTokens
    ? getProps(replaceTokens)
    : `#   name:
#     type: string
#     required: true`
}
---

`;

  const fileTemplates = files.map((file) =>
    getFileTemplate(file, replaceTokens)
  );

  template += fileTemplates.join('\n\n\n');

  return template;
};

const getProps = (replaceTokens: ReplaceTokens) => {
  return Object.keys(replaceTokens)
    .map((key) => {
      const value = replaceTokens[key];
      return `  ${key}:
    type: string
    # required: true
    # default: ${value}
`;
    })
    .join('');
};

const getFileTemplate = (file: TemplateFile, replaceTokens?: ReplaceTokens) => {
  const bt = '```';
  return `${bt}${file.type} { filename: '${getReplaced(
    file.filename,
    'path',
    replaceTokens
  )}' }
${getReplaced(file.content, file.type, replaceTokens)}
${bt}`;
};

const getReplaced = (
  content: string,
  type: string,
  replaceTokens?: ReplaceTokens
) => {
  if (!replaceTokens) {
    return content;
  }

  const directiveCommentStart = getDirectiveCommentStart(type, false);
  const directiveCommentEnd = getDirectiveCommentEnd(type, false);

  Object.keys(replaceTokens).forEach((key) => {
    const value = replaceTokens[key];
    const replacements = getReplacements(value);
    Object.keys(replacements).forEach((replacement) => {
      const replacementValue = replacements[replacement];
      content = content.replaceAll(
        replacementValue,
        `${directiveCommentStart}@scffld${
          replacement === '__raw' ? '' : `-${replacement}`
        } ${key}${directiveCommentEnd}`
      );
    });
  });

  return content;
};

const getReplacements = (value: string): Record<string, string> => {
  return {
    __raw: value,
    upper: value.toUpperCase(),
    lower: value.toLowerCase(),
    camel: camelCase(value),
    capital: capitalCase(value),
    constant: constantCase(value),
    dot: dotCase(value),
    kebab: kebabCase(value),
    pascal: pascalCase(value),
    pascalSnake: pascalSnakeCase(value),
    path: pathCase(value),
    sentence: sentenceCase(value),
    snake: snakeCase(value),
    train: trainCase(value),
  };
};
