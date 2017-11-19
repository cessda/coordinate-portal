// @flow

import * as globals from '../../config';
import counterpart from 'counterpart';
import counterpartDe from 'counterpart/locales/de';
import en from '../locales/en';
import de from '../locales/de';
import nn from '../locales/nn';
import searchkit from '../utilities/searchkit';
import type {Dispatch, Thunk} from '../types';

//////////// Redux Action Creator : INIT_TRANSLATIONS

export type InitTranslationsAction = {
  type: 'INIT_TRANSLATIONS',
  code: string
}

export const initTranslations = (): Thunk => {
  return (dispatch: Dispatch): void => {
    let code: string = (globals.initialLanguage === 'GB' ? 'EN' :
                        globals.initialLanguage).toLowerCase();

    counterpart.registerTranslations('de', counterpartDe);
    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('de', de);
    counterpart.registerTranslations('nn', nn);

    counterpart.setLocale(code);

    searchkit.translateFunction = (key: string): string => {
      let translations: Object = {
        'searchbox.placeholder': counterpart.translate('search'),
        'hitstats.results_found': counterpart.translate('numberOfResults', {
          count: searchkit.getHitsCount()
        })
      };
      return translations[key];
    };

    dispatch({
      type: 'INIT_TRANSLATIONS',
      code
    });
  };
};

//////////// Redux Action Creator : CHANGE_UI_LANGUAGE

export type ChangeUiLanguageAction = {
  type: 'CHANGE_UI_LANGUAGE',
  code: string
}

export const changeUiLanguage = (code: string): Thunk => {
  return (dispatch: Dispatch): void => {
    code = (code === 'GB' ? 'EN' : code).toLowerCase();
    code = code === 'no' ? 'nn' : code;

    counterpart.setLocale(code);

    dispatch({
      type: 'CHANGE_UI_LANGUAGE',
      code
    });
  };
};

//////////// Redux Action Creator : CHANGE_DATA_LANGUAGE

export type ChangeDataLanguageAction = {
  type: 'CHANGE_DATA_LANGUAGE',
  code: string
}

export const changeDataLanguage = (code: string): Thunk => {
  return (dispatch: Dispatch): void => {
    code = (code === 'GB' ? 'EN' : code).toLowerCase();
    code = code === 'no' ? 'nn' : code;

    dispatch({
      type: 'CHANGE_DATA_LANGUAGE',
      code
    });

    searchkit.reloadSearch();
  };
};

////////////

export type LanguageAction =
  | InitTranslationsAction
  | ChangeUiLanguageAction
  | ChangeDataLanguageAction;
