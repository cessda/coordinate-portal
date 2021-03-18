// Copyright CESSDA ERIC 2017-2021
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

import language from '../../src/reducers/language';
import { getLanguages } from '../../src/utilities/language';
import * as _ from 'lodash';

describe('Language reducer', () => {
  const languages = getLanguages();

  it('should return the initial state', () => {
    expect(language(undefined, {})).toEqual({
      code: 'en',
      label: 'English'
    });
  });

  it('should handle INIT_TRANSLATIONS', () => {
    const list = _.map(languages, function(language) {
      return _.pick(language, ['code', 'label', 'index']);
    });
    expect(
      language(
        {},
        {
          type: 'INIT_TRANSLATIONS',
          languages: list
        }
      )
    ).toEqual({
      list: list
    });
  });

  it('should handle CHANGE_LANGUAGE', () => {
    expect(
      language(
        {},
        {
          type: 'CHANGE_LANGUAGE',
          code: languages[0].code
        }
      )
    ).toEqual({
      code: languages[0].code
    });
  });

  it('should handle unknown action type', () => {
    const state = {
      code: 'en'
    };
    expect(language(state, {})).toEqual(state);
  });
});
