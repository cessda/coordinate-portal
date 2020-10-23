// Copyright CESSDA ERIC 2017-2019
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { getLanguages } from '../../src/utilities/language';

describe('Language utilities', () => {
  describe('getLanguages()', () => {
    it('should return a list of languages', () => {
      expect(getLanguages()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: expect.any(String),
            label: expect.any(String),
            index: expect.any(String)
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
