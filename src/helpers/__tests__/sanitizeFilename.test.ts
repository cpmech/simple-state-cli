import { sanitizeFilename } from '../sanitizeFilename';

describe('sanitizeFilename', () => {
  it('should fix filename', async () => {
    expect(sanitizeFilename('this-is-my-  file')).toBe('thisismyfile');
  });
});
