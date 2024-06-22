import markdownit from 'markdown-it';
import terminal from 'markdown-it-terminal';
import styles from 'ansi-styles';

import { parseFile } from './parseFile.js';

export const outputMessage = (message: string, params: any) => {
  const md = markdownit();
  md.use(terminal, {
    styleOptions: {
      firstHeading: styles.cyan,
      code: styles.green,
    },
  });

  const parsedMessage = parseFile('md', message, params);
  const renderedMessage = md.render(parsedMessage, {});

  console.log(renderedMessage);
};
