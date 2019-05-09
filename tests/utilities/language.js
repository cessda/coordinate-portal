import { getLanguages } from '../../src/utilities/language';

describe('Language utilities', () => {
  describe('getLanguages()', () => {
    it('should return a list of languages', () => {
      expect(getLanguages()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: expect.any(String),
            label: expect.any(String),
            index: expect.any(String),
            locale: expect.any(Object)
          })
        ])
      );
    });
  });
});
