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

  describe('Locales', () => {
    it('should handle pluralisation', () => {
      const languages = getLanguages();
      for (let i = 0; i < languages.length; i++) {
        if (
          languages[i].locale &&
          languages[i].locale.counterpart &&
          languages[i].locale.counterpart.pluralize
        ) {
          const entry = {
            one: 'one',
            other: 'other',
            zero: 'zero'
          };
          expect(languages[i].locale.counterpart.pluralize(entry, 0)).toBe(
            'zero'
          );
          expect(languages[i].locale.counterpart.pluralize(entry, 1)).toBe(
            'one'
          );
          expect(languages[i].locale.counterpart.pluralize(entry, 2)).toBe(
            'other'
          );
        }
      }
    });
  });
});
