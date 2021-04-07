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

import {CMMStudy, getJsonLd, getStudyModel} from '../utilities/metadata';
import type {Action} from '../actions';
import _ from 'lodash';
import { 
  INIT_SEARCHKIT, 
  RESET_SEARCH, 
  SearchkitState, 
  TOGGLE_ADVANCED_SEARCH, 
  TOGGLE_LOADING, 
  TOGGLE_LONG_DESCRIPTION, 
  TOGGLE_METADATA_PANELS,
  TOGGLE_MOBILE_FILTERS, 
  TOGGLE_SUMMARY, 
  UPDATE_DISPLAYED, 
  UPDATE_QUERY, 
  UPDATE_SIMILARS, 
  UPDATE_STATE, 
  UPDATE_TOTAL_STUDIES 
} from '../actions/search';

export type SearchState = {
  loading: boolean;
  showMobileFilters: boolean;
  showAdvancedSearch: boolean;
  showFilterSummary: boolean;
  expandMetadataPanels: boolean;
  displayed: CMMStudy[];
  jsonLd?: {
    [key: string]: any;
  } | null;
  similars: {
    id: string;
    title: string;
  }[];
  query: Record<string, any>;
  state: SearchkitState;
  totalStudies: number;
};

const initialState: SearchState = {
  loading: true,
  showMobileFilters: false,
  showAdvancedSearch: false,
  showFilterSummary: false,
  similars: [],
  expandMetadataPanels: false,
  displayed: [],
  query: Object,
  state: { q: '' },
  totalStudies: 0
};

const search = (state: SearchState = initialState, action: Action): SearchState => {
  switch (action.type) {
    case INIT_SEARCHKIT:
      return state;

    case TOGGLE_LOADING:
      return Object.assign({}, state, {
        loading: action.loading
      });

    case TOGGLE_MOBILE_FILTERS:
      return Object.assign({}, state, {
        showMobileFilters: !state.showMobileFilters
      });

    case TOGGLE_ADVANCED_SEARCH:
      return Object.assign({}, state, {
        showAdvancedSearch: !state.showAdvancedSearch
      });

    case TOGGLE_SUMMARY:
      return Object.assign({}, state, {
        showFilterSummary: !state.showFilterSummary
      });

    case TOGGLE_METADATA_PANELS:
      return Object.assign({}, state, {
        expandMetadataPanels: !state.expandMetadataPanels
      });

    case TOGGLE_LONG_DESCRIPTION: {
      let array = _.cloneDeep(state.displayed);

      array[action.index].abstractExpanded = !array[action.index].abstractExpanded;

      return Object.assign({}, state, {
        displayed: array
      });
    }

    case UPDATE_DISPLAYED: {
      const displayed = getStudyModel(action.displayed);

      return Object.assign({}, state, {
        displayed: displayed,
        jsonLd: displayed.length === 1 ? getJsonLd(displayed[0]) : undefined
      });
    }

    case UPDATE_QUERY:
      return Object.assign({}, state, {
        query: action.query
      });

    case UPDATE_STATE:
      return Object.assign({}, state, {
        state: action.state
      });

    case UPDATE_SIMILARS: {
      let similars: {
        id: string;
        title: string;
      }[] = [];

      for (let i: number = 0; i < action.similars.length; i++) {
        if (!action.similars[i]) {
          continue;
        }
        similars.push({
          id: action.similars[i].id,
          title: action.similars[i].titleStudy
        });
        if (i > 3) {
          break;
        }
      }

      return Object.assign({}, state, {
        similars: similars
      });
    }

    case RESET_SEARCH:
      return state;

    case UPDATE_TOTAL_STUDIES:
      return Object.assign({}, state, {
        totalStudies: action.totalStudies
      });

    default:
      return state;
  }
};

export default search;
