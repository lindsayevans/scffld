import { populateTemplateOptions } from './populateTemplateOptions';

describe('populateTemplateOptions', () => {
  it('should merge options into params', () => {
    const result = populateTemplateOptions(
      { name: 'TEST', props: { foo: { type: 'string' } } },
      { foo: 'FOO_OPTION' }
    );

    expect(result.name).toBe('TEST');
    expect(result.props?.foo.type).toBe('string');
    expect(result.options.foo).toBe('FOO_OPTION');
  });
});
