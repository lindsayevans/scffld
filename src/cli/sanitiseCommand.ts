import { quote } from 'shell-quote';

export const sanitiseCommand = (command: string) => {
  // Merge command into single line
  let sanitisedCommand = command.split('\n').join(' ').trim();
  // Quote special characters
  sanitisedCommand = quote(sanitisedCommand.split(' '));

  return sanitisedCommand;
};
