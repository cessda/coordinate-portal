// @flow
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



import counterpart from 'counterpart';
import searchkit from '../utilities/searchkit';
import type {Dispatch, GetState, State, Thunk} from '../types';
import _ from 'lodash';
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
};

export function initTranslations(): Thunk {
  return (dispatch: Dispatch, getState: GetState): void => {
    // Register translations provided from the "/locales" directory.
    let state: State = getState(),
      list: {
        code: string;
        label: string;
        index: string;
      }[] = _.map(getLanguages(), (language) => {
          // Register translations from the respective JSON files
          try {
            counterpart.registerTranslations(language.code, require(`../../translations/${language.code}.json`));
          } catch (e) {
            console.debug(`Couldn't load translation for language '${language.code}': ${e.message}`);
          }
          return _.pick(language, ['code', 'label', 'index']);
        });

    counterpart.setLocale(state.language.code);

    // Fallback to English if the locale is not available
    counterpart.setFallbackLocale('en');

    moment.locale(state.language.code);

    searchkit.translateFunction = (key: string): string => {
      let numberOfResults: string = process.env.PASC_DEBUG_MODE === 'true' ? 'numberOfResultsWithTime' : 'numberOfResults',
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
}

//////////// Redux Action Creator : CHANGE_LANGUAGE

export type ChangeLanguageAction = {
  type: 'CHANGE_LANGUAGE',
  code: string
};

export function changeLanguage(code: string): Thunk {
  return (dispatch: Dispatch): void => {
    code = code.toLowerCase();

    if (!getLanguages().find(element => element.code === code)) {
      code = "en";
    } else {
      if (process.env.PASC_ENABLE_ANALYTICS === 'true') {
        // Notify Matomo Analytics of language change.
        let _paq = window._paq || [];
        _paq.push(['trackEvent', 'Language', 'Change Language', code.toUpperCase()]);
      }
    }

    counterpart.setLocale(code);

    moment.locale(code);

    dispatch({
      type: 'CHANGE_LANGUAGE',
      code
    });

    searchkit.reloadSearch();
  };
}

////////////

export type LanguageAction =
  | InitTranslationsAction
  | ChangeLanguageAction;
