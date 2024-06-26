import { jest } from '@jest/globals';

import { renderTemplateBlock } from './renderTemplateBlock';

describe('renderTemplateBlock', () => {
  it('should render base64 blocks', () => {
    const template = `SGVsbG8gd29ybGQh`;
    const result = renderTemplateBlock('base64', template, { options: {} });

    expect(result).toBeTruthy();
    expect(result).toBe('Hello world!');
  });

  it('should render JSON blocks as valid JSON', () => {
    const template = `{
    /* @scffld-if foo */
    "foo": true,
    /* @scffld-endif */
    /* @scffld-if bar */
    "bar": true,
    /* @scffld-endif */
  }`;
    const result = renderTemplateBlock('json', template, {
      options: { foo: true, bar: false },
    });

    expect(result).toBeTruthy();
    expect(result).toBe('{"foo":true}');
  });

  it('should pass through unknown methods', () => {
    const template = `unknown: [/* @scffld-unknown acb123 */]`;
    const result = renderTemplateBlock('css', template, { options: {} });

    expect(result).toBeTruthy();
    expect(result).toBe(template);
  });

  it('should render empty for non-existing options', () => {
    const template = `foo: [/* @scffld foo */]`;
    const result = renderTemplateBlock('css', template, { options: {} });

    expect(result).toBeTruthy();
    expect(result).toBe('foo: []');
  });

  it('should render empty relativeRoot', () => {
    const template = `relativeRoot: [/* @scffld-relativeRoot */]`;
    const result = renderTemplateBlock('css', template, { options: {} });

    expect(result).toBeTruthy();
    expect(result).toBe('relativeRoot: []');
  });

  it('should render directives', () => {
    const template = `
    outputDirectory: [/* @scffld-outputDirectory */]
    relativeRoot: [/* @scffld-relativeRoot */]
    ---
    name: [/* @scffld name */]
    yeah: [/* @scffld yeah */]
    nah: [/* @scffld nah */]
    ---
    upper: [/* @scffld-upper name */]
    lower: [/* @scffld-lower name */]
    camel: [/* @scffld-camel name */]
    capital: [/* @scffld-capital name */]
    constant: [/* @scffld-constant name */]
    dot: [/* @scffld-dot name */]
    kebab: [/* @scffld-kebab name */]
    pascal: [/* @scffld-pascal name */]
    pascalSnake: [/* @scffld-pascalSnake name */]
    path: [/* @scffld-path name */]
    sentence: [/* @scffld-sentence name */]
    snake: [/* @scffld-snake name */]
    train: [/* @scffld-train name */]
    ---
    if-yeah: [/* @scffld-if yeah */yeah=true/* @scffld-endif */]
    if-nah: [/* @scffld-if nah */nah=true/* @scffld-endif */]
    if-else-yeah: [/* @scffld-if yeah */yeah=true/* @scffld-else */yeah=false/* @scffld-endif */]
    if-else-nah: [/* @scffld-if nah */nah=true/* @scffld-else */nah=false/* @scffld-endif */]
    `;
    const result = renderTemplateBlock(
      'css',
      template,
      {
        outputDirectory: './src/foo/bar/',
        props: {
          name: { type: 'string' },
          yeah: { type: 'boolean', default: true },
          nah: { type: 'boolean', default: false },
        },
        options: {
          outputDirectory: './src/abc/123/',
          name: 'Testing renderTemplateBlock',
          yeah: false,
          nah: true,
        },
      },
      'components/Something/Something.css'
    );

    expect(result).toBeTruthy();
    expect(result).toContain('outputDirectory: [./src/abc/123/]');
    expect(result).toContain('relativeRoot: [../../]');

    expect(result).toContain('name: [Testing renderTemplateBlock]');
    expect(result).toContain('yeah: [false]');
    expect(result).toContain('nah: [true]');

    expect(result).toContain('upper: [TESTING RENDERTEMPLATEBLOCK]');
    expect(result).toContain('lower: [testing rendertemplateblock]');
    expect(result).toContain('camel: [testingRenderTemplateBlock]');
    expect(result).toContain('capital: [Testing Render Template Block]');
    expect(result).toContain('constant: [TESTING_RENDER_TEMPLATE_BLOCK]');
    expect(result).toContain('dot: [testing.render.template.block]');
    expect(result).toContain('kebab: [testing-render-template-block]');
    expect(result).toContain('pascal: [TestingRenderTemplateBlock]');
    expect(result).toContain('pascalSnake: [Testing_Render_Template_Block]');
    expect(result).toContain('path: [testing/render/template/block]');
    expect(result).toContain('sentence: [Testing render template block]');
    expect(result).toContain('snake: [testing_render_template_block]');
    expect(result).toContain('train: [Testing-Render-Template-Block]');

    expect(result).toContain('if-yeah: []');
    expect(result).toContain('if-nah: [nah=true]');
    expect(result).toContain('if-else-yeah: [yeah=false]');
    expect(result).toContain('if-else-nah: [nah=true]');
  });

  test.each([
    ['path', '${ ', ' }'],
    ['html', '<!-- ', ' -->'],
    ['svg', '<!-- ', ' -->'],
    ['xml', '<!-- ', ' -->'],
    ['md', '<!-- ', ' -->'],
    ['cfm', '<!--- ', ' --->'],
    ['cfml', '<!--- ', ' --->'],
    ['py', `''' `, ` '''`],
    ['css', '/* ', ' */'],
  ])('correctly parse directives for %s', (type, start, end) => {
    const template = `name: [${start}@scffld name${end}]`;

    const result = renderTemplateBlock(type, template, {
      options: {
        name: 'Testing renderTemplateBlock',
      },
    });

    expect(result).toBe('name: [Testing renderTemplateBlock]');
  });
});
