import { getTemplateParams } from './getTemplateParams';

describe('getTemplateParams', () => {
  it('should parse YAML frontmatter into params', () => {
    const template = `---
outputDirectory: ./test/
props:
  testProp:
    type: string
---`;
    const result = getTemplateParams(template);
    expect(result.outputDirectory).toBe('./test/');
    expect(result.props).not.toBeFalsy();
    expect(result.props?.testProp).not.toBeFalsy();
    expect(result.props?.testProp.type).toBe('string');
  });

  it('should error on invalid YAML frontmatter', () => {
    const logSpy = jest.spyOn(global.console, 'error');
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
    const template = `This should fail`;
    getTemplateParams(template);

    expect(logSpy).toHaveBeenCalled();

    logSpy.mockRestore();
  });
});
