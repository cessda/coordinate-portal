// @flow

import {getJsonLd, getStudyModel} from '../utilities/metadata';
import type {Action} from '../actions';
import * as _ from 'lodash';

type State = {
  showMobileFilters: boolean,
  showAdvancedSearch: boolean,
  showFilterSummary: boolean,
  displayed: Object[],
  jsonLd?: ?Object,
  similars?: {
    id: string,
    title: string
  }[],
  query: any,
  state: any
};

const initialState: State = {
  showMobileFilters: false,
  showAdvancedSearch: false,
  showFilterSummary: false,
  displayed: [],
  query: Object,
  state: Object
};

const search = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'INIT_SEARCHKIT':
      return state;

    case 'TOGGLE_MOBILE_FILTERS':
      return Object.assign({}, state, {
        showMobileFilters: !state.showMobileFilters
      });

    case 'TOGGLE_ADVANCED_SEARCH':
      return Object.assign({}, state, {
        showAdvancedSearch: !state.showAdvancedSearch
      });

    case 'TOGGLE_SUMMARY':
      return Object.assign({}, state, {
        showFilterSummary: !state.showFilterSummary
      });

    case 'TOGGLE_LONG_DESCRIPTION':
      let array: Object[] = _.cloneDeep(state.displayed);

      array[action.index].abstractExpanded = !array[action.index].abstractExpanded;

      return Object.assign({}, state, {
        displayed: array
      });

    case 'UPDATE_DISPLAYED':
      let displayed: Object[] = [];

      for (let i: number = 0; i < action.displayed.length; i++) {
        if (action.displayed[i]._source === undefined) {
          continue;
        }
        let study = getStudyModel(action.displayed[i]);

        // TODO : Elasticsearch CMMStudy JSON does not contain a list of languages for which other
        //        metadata is available. This is required for the language buttons displayed for
        //        each result on the search page. Therefore just add the current language as a
        //        temporary fix.
        study.languages = [action.language.toUpperCase()];

        displayed.push(study);
      }

      return Object.assign({}, state, {
        displayed: displayed,
        jsonLd: displayed.length === 1 ? getJsonLd(displayed[0]) : undefined
      });

    case 'UPDATE_QUERY':
      return Object.assign({}, state, {
        query: action.query
      });

    case 'UPDATE_STATE':
      return Object.assign({}, state, {
        state: action.state
      });

    case 'UPDATE_SIMILARS':
      let similars: {
        id: string,
        title: string
      }[] = [];

      for (let i: number = 0; i < action.similars.length; i++) {
        if (action.similars[i]._source === undefined) {
          continue;
        }
        similars.push({
          id: action.similars[i]._source.id,
          title: action.similars[i]._source.titleStudy
        });
        if (i > 3) {
          break;
        }
      }

      return Object.assign({}, state, {
        similars: similars
      });

    case 'RESET_SEARCH':
      return state;

    default:
      return state;
  }
};

export default search;
