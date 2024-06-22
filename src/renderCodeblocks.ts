import YAML from 'yaml';
import { Ora } from 'ora';

import { parseFile } from './parseFile.js';
import { writeFile } from './writeFile.js';
import { outputMessage } from './outputMessage.js';

export const renderCodeblocks = (
  codeblocks: any[],
  params: any,
  spinner: Ora,
  startTime: Date
) => {
  let count = 0;
  codeblocks.forEach((codeblock) => {
    const type = codeblock.info.split(' ')[0].trim();
    const fileInfo = codeblock.info.replace(`${type} `, '').trim();

    // Normal code block, skip
    if (!fileInfo || fileInfo === '' || fileInfo === type) {
      return;
    }

    const parsedFileInfo = YAML.parse(fileInfo);

    if (
      !parsedFileInfo.filename ||
      (parsedFileInfo.condition && !params.options[parsedFileInfo.condition])
    ) {
      return;
    }

    const renderedPath = parseFile('path', parsedFileInfo.filename, params);
    const renderedFile = parseFile(
      type,
      codeblock.content,
      params,
      renderedPath
    );

    writeFile(
      (params.options.outputDirectory || params.outputDirectory || '') +
        renderedPath,
      renderedFile,
      type
    );
    count++;
  });

  const endTime = new Date();
  const time = endTime.getTime() - startTime.getTime();

  spinner.stopAndPersist({ symbol: '✅' });
  console.log(`\nWrote ${count} files in ${time}ms`);

  if (params.postInstallMessage) {
    outputMessage(params.postInstallMessage, params);
  }
};
