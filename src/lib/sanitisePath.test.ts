import { sanitisePath } from './sanitisePath';

describe('sanitisePath', () => {
  it('should strip ../', () => {
    const result = sanitisePath('../../foo/../bar');
    expect(result).toBe('foo/bar');
  });
});
