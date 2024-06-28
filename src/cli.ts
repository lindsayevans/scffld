#!/usr/bin/env node

import { SHOW_COMMAND, show } from './cli/show.js';
import { GENERATE_COMMAND, generate } from './cli/generate.js';
import { scaffold } from './cli/scaffold.js';

if (process.argv[2] === SHOW_COMMAND) {
  show(process.argv);
} else if (process.argv[2] === GENERATE_COMMAND) {
  generate(process.argv);
} else {
  scaffold(process.argv);
}
