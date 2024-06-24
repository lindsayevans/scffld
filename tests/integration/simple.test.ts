import fs from 'node:fs';
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

const TIMEOUT = 10_000;

describe('sscffld', () => {
  it(
    'should scaffold the simple template',
    async () => {
      const { execute, cleanup, makeDir, writeFile, ls, exists } =
        await prepareEnvironment();

      // Copy templates into the virtual filesystem
      await makeDir('./examples');
      const template = fs.readFileSync('./examples/simple.md');
      await writeFile('./examples/simple.md', template.toString());

      const { code, stderr, stdout } = await execute(
        'scffld',
        'examples/simple --name=test'
      );

      expect(code).toBe(0);
      expect(stdout.join('\n')).toContain('Wrote 3 files in');
      await expect(exists('./demo-src/simple/simple.css')).resolves.toBe(true);

      await cleanup();
    },
    TIMEOUT
  );

  it(
    'should scaffold a remote template (URL)',
    async () => {
      const { execute, cleanup, makeDir, writeFile, ls, exists } =
        await prepareEnvironment();

      const { code, stderr, stdout } = await execute(
        'scffld',
        'https://raw.githubusercontent.com/lindsayevans/scffld/develop/examples/simple.md --name=test'
      );

      expect(code).toBe(0);
      expect(stdout.join('\n')).toContain('Wrote 3 files in');
      await expect(exists('./demo-src/simple/simple.css')).resolves.toBe(true);

      await cleanup();
    },
    TIMEOUT
  );

  it(
    'should scaffold a remote template (GitHub)',
    async () => {
      const { execute, cleanup, makeDir, writeFile, ls, exists } =
        await prepareEnvironment();

      const { code, stderr, stdout } = await execute(
        'scffld',
        'github:lindsayevans/scffld/examples/simple --name=test'
      );

      expect(code).toBe(0);
      expect(stdout.join('\n')).toContain('Wrote 3 files in');
      await expect(exists('./demo-src/simple/simple.css')).resolves.toBe(true);

      await cleanup();
    },
    TIMEOUT
  );

  it(
    'should show message if no files',
    async () => {
      const { execute, cleanup, makeDir, writeFile, ls, exists } =
        await prepareEnvironment();

      // Copy templates into the virtual filesystem
      await makeDir('./examples');
      const template = fs.readFileSync('./examples/minimal.md');
      await writeFile('./examples/minimal.md', template.toString());

      const { code, stderr, stdout } = await execute(
        'scffld',
        'examples/minimal --name=test'
      );

      expect(code).toBe(0);
      expect(stdout.join('\n')).toContain('No files to write');

      await cleanup();
    },
    TIMEOUT
  );
});
