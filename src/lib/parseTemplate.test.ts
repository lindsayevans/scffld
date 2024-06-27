import { parseTemplate } from './parseTemplate';

describe('parseTemplate', () => {
  it('should render template', () => {
    const template = `---
outputDirectory: ./test-src/
---

\`\`\`sh
scffld examples/react-component
\`\`\`

\`\`\`html { filename: 'simple.html' }
<h1>hi</h1>
\`\`\`

\`\`\`scss { filename: 'simple.css', condition: includeStyle }
body { color: teal }
\`\`\`
`;
    const result = parseTemplate(template, {
      outputDirectory: './src/foo/bar/',
      props: {
        name: { type: 'string' },
        yeah: { type: 'boolean', default: true },
        nah: { type: 'boolean', default: false },
      },
      options: {
        outputDirectory: './src/abc/123/',
        name: 'Testing parseTemplate',
        yeah: false,
        nah: true,
      },
    });

    expect(result).toBeTruthy();
    expect(result.length).toBe(1);
    expect(result[0].type).toBe('html');
    expect(result[0].filename).toBe('./src/abc/123/simple.html');
    expect(result[0].content).toContain('<h1>hi</h1>');
  });
});
