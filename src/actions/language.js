// @flow

import counterpart from 'counterpart';
import counterpartDe from 'counterpart/locales/de';
import en from '../locales/en';
import de from '../locales/de';
import nn from '../locales/nn';
import searchkit from '../utilities/searchkit';
import type {Dispatch, GetState, Thunk} from '../types';
import * as ReactGA from 'react-ga';
import * as _ from 'lodash';

//////////// Redux Action Creator : INIT_TRANSLATIONS

export type InitTranslationsAction = {
  type: 'INIT_TRANSLATIONS',
  list: {
    id: string,
    label: string
  }[]
}

export const initTranslations = (): Thunk => {
  return (dispatch: Dispatch, getState: GetState): void => {
    counterpart.registerTranslations('de', counterpartDe);
    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('de', de);
    // counterpart.registerTranslations('nn', nn);

    let locales: string[] = counterpart.getAvailableLocales(),
        list: {
          id: string,
          label: string
        }[] = [];

    for (let i: number = 0; i < locales.length; i++) {
      list.push({
        id: locales[i],
        label: counterpart.translate('language.languages.' + locales[i], {
          locale: locales[i]
        })
      });
    }

    counterpart.setLocale(getState().language.code);

    searchkit.translateFunction = (key: string): string => {
      let numberOfResults: string = process.env.PASC_DEBUG_MODE ? 'numberOfResultsWithTime' :
                                    'numberOfResults',
        translations: Object = {
          'searchbox.placeholder': counterpart.translate('search'),
          'hitstats.results_found': counterpart.translate(numberOfResults, {
            count: searchkit.getHitsCount(),
            time: searchkit.getTime()
          })
        };
      return translations[key];
    };

    dispatch({
      type: 'INIT_TRANSLATIONS',
      list
    });
  };
};

//////////// Redux Action Creator : CHANGE_LANGUAGE

export type ChangeLanguageAction = {
  type: 'CHANGE_LANGUAGE',
  code: string,
  missing: boolean
}

export const changeLanguage = (code: string): Thunk => {
  return (dispatch: Dispatch): void => {
    code = (code === 'GB' ? 'EN' : code).toLowerCase();
    code = code === 'no' ? 'nn' : code;

    let missing: boolean = !_.includes(counterpart.getAvailableLocales(), code);
    if (missing) {
      code = 'en';
    } else {
      ReactGA.event({
        category: 'Language',
        action: 'Change Language',
        label: code.toUpperCase()
      });
    }

    counterpart.setLocale(code);

    dispatch({
      type: 'CHANGE_LANGUAGE',
      code,
      missing
    });
  };
};

////////////

export type LanguageAction =
  | InitTranslationsAction
  | ChangeLanguageAction;
