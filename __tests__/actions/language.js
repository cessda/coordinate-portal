import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import counterpart from 'counterpart';
import searchkit from '../../src/utilities/searchkit';
import { changeLanguage, initTranslations } from '../../src/actions/language';
import { getLanguages } from '../../src/utilities/language';
import type { Store } from '../../src/types';
import * as _ from 'lodash';

const mockStore: Store = configureMockStore([thunk]);

describe('Language actions', () => {
  const languages = getLanguages();

  beforeEach(() => {
    // Register a few translations required for tests.
    counterpart.registerTranslations(languages[0].code, languages[0].locale);
    counterpart.registerTranslations(languages[1].code, languages[1].locale);

    // Not running in browser so need to manually initialise history.
    searchkit.history = [];
  });

  describe('INIT_TRANSLATIONS action', () => {
    it('is created when initialising language support', () => {
      // Mock Redux state.
      let store = mockStore({
        language: {
          code: languages[0].code
        }
      });

      // Dispatch action.
      store.dispatch(initTranslations());

      // All locales should have been registered.
      expect(counterpart.getAvailableLocales().length).toBe(languages.length);

      // Translations should not include debug information.
      expect(searchkit.translateFunction('hitstats.results_found')).toBe(counterpart.translate('numberOfResults', {
        count: 0,
        time: 0
      }));

      // State should list all available languages.
      expect(store.getActions()).toEqual([{
        type: 'INIT_TRANSLATIONS',
        list: _.map(languages, function(language) {
          return _.pick(language, ['code', 'label', 'index']);
        })
      }]);
    });

    it('includes debug output when debug mode is enabled', () => {
      // Mock Redux state.
      let store = mockStore({
        language: {
          code: languages[0].code
        }
      });

      // Enable debug mode for test.
      process.env.PASC_DEBUG_MODE = 'true';

      // Dispatch action.
      store.dispatch(initTranslations());

      // Translations should include debug information.
      expect(searchkit.translateFunction('hitstats.results_found')).toBe(counterpart.translate('numberOfResultsWithTime', {
        count: 0,
        time: 0
      }));
    });
  });

  describe('CHANGE_LANGUAGE action', () => {
    it('is created when selecting a language with a registered locale', () => {
      // Mock Redux state.
      let store = mockStore({
        language: {
          code: languages[0].code
        }
      });

      // Dispatch action with registered locale.
      store.dispatch(changeLanguage(languages[1].code));

      // Locale registered so should use selected language.
      expect(store.getActions()).toEqual([{
        type: 'CHANGE_LANGUAGE',
        code: languages[1].code
      }]);
    });

    it('is created when selecting a language without a registered locale', () => {
      // Mock Redux state.
      let store = mockStore({
        language: {
          code: languages[0].code
        }
      });

      // Dispatch action with unregistered locale.
      store.dispatch(changeLanguage('xyz'));

      // Locale not registered so should default to English (en).
      expect(store.getActions()).toEqual([{
        type: 'CHANGE_LANGUAGE',
        code: 'en'
      }]);
    });

    it('logs user metrics when analytics is enabled', () => {
      // Mock Redux state.
      let store = mockStore({
        language: {
          code: languages[0].code
        }
      });

      // Enable analytics for test.
      process.env.PASC_ENABLE_ANALYTICS = 'true';

      // Dispatch action with registered locale.
      store.dispatch(changeLanguage(languages[1].code));

      // Locale registered so should use selected language.
      expect(store.getActions()).toEqual([{
        type: 'CHANGE_LANGUAGE',
        code: languages[1].code
      }]);
    });
  });
});
