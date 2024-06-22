import path from 'node:path';

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
    const outputDirectory = params.outputDirectory || '';
    const resolvedOutputDirectory = path.resolve(outputDirectory);
    const resolvedFileDirectory = path.dirname(
      path.resolve(outputDirectory + renderedPath)
    );
    const relativePath =
      path.relative(resolvedFileDirectory, resolvedOutputDirectory) + path.sep;

    return relativePath;
  };

  const upperCase = (s: string) => s.toUpperCase();
  const lowerCase = (s: string) => s.toLowerCase();

  const replaceMethods: Record<string, any> = {
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

  return fileContent
    .replace(rawRegex, (m, ...s) => params.options[s[0] || ''])
    .replace(replaceRegex, (m, ...s) => {
      const method = replaceMethods[s[0].trim()];
      if (method) {
        return method(params.options[s[1]] || '');
      }

      console.warn(`Unknown replace method '${s[0]}'`);

      return '';
    });
};

const getDirectiveCommentStart = (type: string, escape = true) => {
  switch (type) {
    case 'path':
      return '\\${ ';
    case 'html':
    case 'svg':
    case 'xml':
      return '<!-- ';
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
      return ' -->';
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

  // Find opening if tags
  let match = startIfRegex.exec(fileContent);
  while (match) {
    if (match.index !== undefined) {
      //   Check condition
      const condition = match[1];
      const conditionMatches = !!params.options[condition];

      //   Find next closing tag
      const endIndex = fileContent.indexOf(endIfString);
      if (conditionMatches) {
        //   If condition, strip tags
        fileContent =
          fileContent.substring(0, match.index) +
          fileContent.substring(match.index + match[0].length, endIndex) +
          fileContent.substring(endIndex + endIfString.length);
      } else {
        //   If !condition, strip tags + content
        fileContent =
          fileContent.substring(0, match.index) +
          fileContent.substring(endIndex + endIfString.length);
      }
      match = match = startIfRegex.exec(fileContent);
    }
  }

  return fileContent;
};