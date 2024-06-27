import { TemplateFile } from '../types';
import { renderTemplate } from './renderTemplate';
import { parseTemplate } from '../parseTemplate';

describe('renderTemplate', () => {
  it('should generate a basic template', () => {
    const files: TemplateFile[] = [
      {
        type: 'ts',
        filename: 'foo.ts',
        content: 'const foo = (foo: string) => foo',
      },
    ];
    const result = renderTemplate(files);

    expect(result).toBeTruthy();
    expect(result).toContain('# outputDirectory: ./src/');
    expect(result).toContain('```ts');
    expect(result).toContain("```ts { filename: 'foo.ts' }");
    expect(result).toContain('\nconst foo = (foo: string) => foo\n');
  });

  it('should generate a template that can be parsed', () => {
    const files: TemplateFile[] = [
      {
        type: 'ts',
        filename: 'foo.ts',
        content: 'const foo = (foo: string) => foo',
      },
    ];
    const template = renderTemplate(files);
    const result = parseTemplate(template, {});

    expect(result).toBeTruthy();
    expect(result.length).toBe(1);
    expect(result[0].type).toBe('ts');
    expect(result[0].filename).toBe('foo.ts');
    expect(result[0].content).toContain('const foo = (foo: string) => foo');
  });
});
