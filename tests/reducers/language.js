import language from '../../src/reducers/language';
import { getLanguages } from '../../src/utilities/language';
import * as _ from 'lodash';

describe('Language reducer', () => {
  const languages = getLanguages();

  it('should return the initial state', () => {
    expect(language(undefined, {})).toEqual({
      code: 'en'
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
          list: list
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
