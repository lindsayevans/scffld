import { getOutputDirectory } from './getOutputDirectory';

describe('getOutputDirectory', () => {
  it('should default to empty', () => {
    const result = getOutputDirectory({});
    expect(result).toBe('');
  });

  it('should use outputDirectory', () => {
    const result = getOutputDirectory({ outputDirectory: 'TEST' });
    expect(result).toBe('TEST');
  });

  it('should use outputDirectory from options', () => {
    const result = getOutputDirectory({
      outputDirectory: 'TEST',
      options: { outputDirectory: 'OPTIONS_TEST' },
    });
    expect(result).toBe('OPTIONS_TEST');
  });
});
