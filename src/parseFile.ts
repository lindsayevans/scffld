import path from 'node:path';
import JSON5 from 'json5';

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

const DIRECTIVE_PREFIX = '@scffld';

export const parseFile = (
  fileType: string,
  fileContent: string,
  params: any,
  renderedPath?: string
) => {
  const relativeRoot = () => {
    const outputDirectory =
      params.options.outputDirectory || params.outputDirectory || '';
    const resolvedOutputDirectory = path.resolve(outputDirectory);
    const resolvedFileDirectory = path.dirname(
      path.resolve(outputDirectory + renderedPath)
    );
    const relativePath =
      path.relative(resolvedFileDirectory, resolvedOutputDirectory) + path.sep;

    return relativePath;
  };

  const outputDirectory = () => {
    return params.options.outputDirectory || params.outputDirectory || '';
  };

  const upperCase = (s: string) => s.toUpperCase();
  const lowerCase = (s: string) => s.toLowerCase();

  const replaceMethods: Record<string, any> = {
    outputDirectory: outputDirectory,
    relativeRoot: relativeRoot,
    upper: upperCase,
    lower: lowerCase,
    camel: camelCase,
    capital: capitalCase,
    constant: constantCase,
    dot: dotCase,
    kebab: kebabCase,
    pascal: pascalCase,
    pascalSnake: pascalSnakeCase,
    path: pathCase,
    sentence: sentenceCase,
    snake: snakeCase,
    train: trainCase,
  };

  const directiveCommentStart = getDirectiveCommentStart(fileType);
  const directiveCommentEnd = getDirectiveCommentEnd(fileType);
  const directiveReplaceMethods = Object.keys(replaceMethods).join('|');

  const rawRegex = new RegExp(
    `${directiveCommentStart}${DIRECTIVE_PREFIX} ([\\w]*)${directiveCommentEnd}`,
    'gi'
  );
  const replaceRegex = new RegExp(
    `${directiveCommentStart}${DIRECTIVE_PREFIX}-(${directiveReplaceMethods})\\s*([\\w]*)${directiveCommentEnd}`,
    'gi'
  );

  if (fileType !== 'path') {
    fileContent = parseConditionals(
      fileType,
      fileContent,
      params,
      renderedPath
    );
  }

  fileContent = fileContent
    .replace(rawRegex, (m, ...s) => params.options[s[0] || ''])
    .replace(replaceRegex, (m, ...s) => {
      const method = replaceMethods[s[0].trim()];
      if (method) {
        return method(params.options[s[1]] || '');
      }

      console.warn(`Unknown replace method '${s[0]}'`);

      return '';
    });

  if (fileType === 'json') {
    fileContent = JSON.stringify(JSON5.parse(fileContent));
  }

  if (fileType === 'base64') {
    fileContent = atob(fileContent);
  }

  return fileContent;
};

const getDirectiveCommentStart = (type: string, escape = true) => {
  switch (type) {
    case 'path':
      return '\\${ ';
    case 'html':
    case 'svg':
    case 'xml':
    case 'md':
      return '<!-- ';
    case 'cfm':
    case 'cfml':
      return '<!--- ';
    case 'py':
      return `''' `;
    default:
      return escape ? '/\\* ' : '/* ';
  }
};

const getDirectiveCommentEnd = (type: string, escape = true) => {
  switch (type) {
    case 'path':
      return ' }';
    case 'html':
    case 'svg':
    case 'xml':
    case 'md':
      return ' -->';
    case 'cfm':
    case 'cfml':
      return ' --->';
    case 'py':
      return ` '''`;
    default:
      return escape ? ' \\*/' : ' */';
  }
};

export const parseConditionals = (
  fileType: string,
  fileContent: string,
  params: any,
  renderedPath?: string
) => {
  const directiveCommentStart = getDirectiveCommentStart(fileType);
  const directiveCommentEnd = getDirectiveCommentEnd(fileType);

  const startIfRegex = new RegExp(
    `${directiveCommentStart}${DIRECTIVE_PREFIX}-if ([\\w]*)${directiveCommentEnd}`,
    'gi'
  );

  const directiveCommentStartUnescaped = getDirectiveCommentStart(
    fileType,
    false
  );
  const directiveCommentEndUnescaped = getDirectiveCommentEnd(fileType, false);
  const endIfString = `${directiveCommentStartUnescaped}${DIRECTIVE_PREFIX}-endif${directiveCommentEndUnescaped}`;
  const elseString = `${directiveCommentStartUnescaped}${DIRECTIVE_PREFIX}-else${directiveCommentEndUnescaped}`;

  // Find opening if tags
  let match = startIfRegex.exec(fileContent);
  while (match) {
    if (match.index !== undefined) {
      //   Check condition
      const condition = match[1];
      const conditionMatches = !!params.options[condition];

      //   Find next closing tag
      let endIndex = fileContent.indexOf(endIfString);
      let endLength = endIfString.length;

      const elseIndex = fileContent.indexOf(elseString);

      if (conditionMatches) {
        //   If condition, strip tags
        if (elseIndex !== -1 && elseIndex < endIndex) {
          endLength = endIndex - elseIndex + endIfString.length;
          endIndex = elseIndex;
        }
        fileContent =
          fileContent.substring(0, match.index) +
          fileContent.substring(match.index + match[0].length, endIndex) +
          fileContent.substring(endIndex + endLength);
      } else {
        //   If !condition, strip tags + content
        if (elseIndex === -1) {
          fileContent =
            fileContent.substring(0, match.index) +
            fileContent.substring(endIndex + endLength);
        } else {
          fileContent =
            fileContent.substring(0, match.index) +
            fileContent.substring(elseIndex + elseString.length, endIndex) +
            fileContent.substring(endIndex + endLength);
        }
      }

      startIfRegex.lastIndex = 0;
      match = startIfRegex.exec(fileContent);
    }
  }

  return fileContent;
};
