// @flow

import counterpart from 'counterpart';
import searchkit from '../utilities/searchkit';
import type {Dispatch, GetState, State, Thunk} from '../types';
import * as ReactGA from 'react-ga';
import * as _ from 'lodash';
import moment from 'moment';
import {getLanguages} from '../utilities/language';

//////////// Redux Action Creator : INIT_TRANSLATIONS

export type InitTranslationsAction = {
  type: 'INIT_TRANSLATIONS',
  list: {
    code: string,
    label: string,
    index: string
  }[]
}

export const initTranslations = (): Thunk => {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Register translations provided from the "/locales" directory.
    let state: State = getState(),
      list: {
        code: string,
        label: string,
        index: string,
      }[] = _.map(getLanguages(), function (language) {
        counterpart.registerTranslations(language.code, language.locale);
        return _.pick(language, ['code', 'label', 'index']);
      });

    counterpart.setLocale(state.language.code);

    moment.locale(state.language.code);

    searchkit.translateFunction = (key: string): string => {
      let numberOfResults: string = process.env.PASC_DEBUG_MODE ? 'numberOfResultsWithTime' :
                                    'numberOfResults',
        translations: Object = {
          'searchbox.placeholder': counterpart.translate('search'),
          'hitstats.results_found': counterpart.translate(numberOfResults, {
            count: searchkit.getHitsCount(),
            time: searchkit.getTime()
          }),
          'NoHits.NoResultsFound': counterpart.translate('noHits.noResultsFound', {
            query: searchkit.getQueryAccessor().state.value || ''
          }),
          'NoHits.SearchWithoutFilters': counterpart.translate('noHits.searchWithoutFilters', {
            query: searchkit.getQueryAccessor().state.value || ''
          }),
          'NoHits.Error': counterpart.translate('noHits.error'),
          'NoHits.ResetSearch': counterpart.translate('noHits.resetSearch')
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
  code: string
}

export const changeLanguage = (code: string): Thunk => {
  return (dispatch: Dispatch): void => {
    code = code.toLowerCase();

    if (!_.includes(counterpart.getAvailableLocales(), code)) {
      code = 'en';
    } else {
      ReactGA.event({
        category: 'Language',
        action: 'Change Language',
        label: code.toUpperCase()
      });
    }

    counterpart.setLocale(code);

    moment.locale(code);

    dispatch({
      type: 'CHANGE_LANGUAGE',
      code
    });

    searchkit.reloadSearch();
  };
};

////////////

export type LanguageAction =
  | InitTranslationsAction
  | ChangeLanguageAction;
