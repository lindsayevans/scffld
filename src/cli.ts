#!/usr/bin/env node

import { GENERATE_COMMAND, generate } from './cli/generate.js';
import { scaffold } from './cli/scaffold.js';

if (process.argv[2] === GENERATE_COMMAND) {
  generate(process.argv);
} else {
  scaffold(process.argv);
}
