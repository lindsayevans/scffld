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
      expect(stdout.join('\n')).toContain('Wrote 5 files in');
      await expect(exists('./demo-src/simple/test.css')).resolves.toBe(true);

      await cleanup();
    },
    TIMEOUT
  );
});
