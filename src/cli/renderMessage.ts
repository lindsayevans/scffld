import markdownit from 'markdown-it';
import terminal from 'markdown-it-terminal';
import styles from 'ansi-styles';

import { renderTemplateBlock } from '../lib/renderTemplateBlock.js';

export const renderMessage = (message: string, params: any) => {
  const md = markdownit();
  md.use(terminal, {
    styleOptions: {
      firstHeading: styles.cyan,
      code: styles.green,
    },
  });

  const parsedMessage = renderTemplateBlock('md', message, params);
  const renderedMessage = md.render(parsedMessage, {});

  return renderedMessage;
};
