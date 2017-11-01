import * as globals from '../../config';
import counterpart from 'counterpart';
import counterpartDe from 'counterpart/locales/de';
import en from '../locales/en';
import de from '../locales/de';
import searchkit from '../utilities/searchkit';

export const INIT_TRANSLATIONS = 'INIT_TRANSLATIONS';

export const initTranslations = () => {
  return (dispatch, getState) => {
    let code = (globals.initialLanguage === 'GB' ? 'EN' : globals.initialLanguage).toLowerCase();

    counterpart.registerTranslations('de', counterpartDe);
    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('de', de);

    counterpart.setLocale(code);

    searchkit.translateFunction = (key) => {
      let translations = {
        'pagination.previous': '<',
        'pagination.next': '>',
        'searchbox.placeholder': counterpart.translate('search'),
        'hitstats.results_found': counterpart.translate('numberOfResults', {
          count: searchkit.getHitsCount()
        })
      };
      return translations[key];
    };

    dispatch({
      type: INIT_TRANSLATIONS,
      code
    });
  };
};

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const changeLanguage = code => {
  return dispatch => {
    code = (code === 'GB' ? 'EN' : code).toLowerCase();

    counterpart.setLocale(code);

    dispatch({
      type: CHANGE_LANGUAGE,
      code
    });
  };
};
