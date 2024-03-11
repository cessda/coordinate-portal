// Copyright CESSDA ERIC 2017-2023
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

import { CMMStudy } from "../../common/metadata";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type Metrics = {
  studies: number,
  creators: number,
  countries: number
} | undefined;

export interface SearchState {
  loading: boolean;
  showMobileFilters: boolean;
  showAdvancedSearch: boolean;
  showFilterSummary: boolean;
  showAbstract: boolean;
  expandMetadataPanels: boolean;
  displayed: CMMStudy[];
  study: CMMStudy | undefined;
  totalStudies: number;
  metrics: Metrics
}

const initialState: SearchState = {
  loading: true,
  showMobileFilters: false,
  showAdvancedSearch: false,
  showFilterSummary: false,
  showAbstract: true,
  study: undefined,
  expandMetadataPanels: false,
  displayed: [],
  totalStudies: 0,
  metrics: {
    studies: 0,
    creators: 0,
    countries: 0
  }
};

export const updateMetrics = createAsyncThunk('search/updateMetrics', async (_, { getState }) => {
  try {
    const state = getState() as RootState;
    const response = await fetch(`${window.location.origin}/api/sk/_about_metrics/${state.language.currentLanguage.index}`);

    if (response.ok) {
      const source = await response.json();

      return {
        studies: source.studies,
        creators: source.creators,
        countries: source.countries
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export const updateTotalStudies = createAsyncThunk('search/updateTotalStudies', async () => {
  try {
    const response = await fetch(`${window.location.origin}/api/sk/_total_studies`);

    if (response.ok) {
      const source = await response.json();
      const totalStudies = source.totalStudies;

      // Return the updated totalStudies value
      return totalStudies;
    }
  } catch (e) {
    console.error(e);
    throw e; // Rethrow the error to be handled by Redux Toolkit
  }
});

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    toggleLoading: (state: SearchState, action: PayloadAction<boolean>) => {
      state.loading = !action.payload;
    },
    toggleSummary: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showFilterSummary = !action.payload;
    },
    toggleAdvancedSearch: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showAdvancedSearch = !action.payload;
    },
    toggleMobileFilters: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showMobileFilters = !action.payload;
    },
    toggleAbstract: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showAbstract = !action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMetrics.fulfilled, (state, action) => {
      state.metrics = action.payload;
    });
    builder.addCase(updateTotalStudies.fulfilled, (state, action) => {
      state.totalStudies = action.payload;
    });
  },
});

export const { setMetrics, toggleLoading, toggleSummary, toggleAdvancedSearch, toggleMobileFilters, toggleAbstract } =
  searchSlice.actions;

export default searchSlice.reducer;

// import {
//   INIT_SEARCHKIT,
//   RESET_SEARCH,
//   SearchkitState,
//   TOGGLE_ADVANCED_SEARCH,
//   TOGGLE_LOADING,
//   TOGGLE_METADATA_PANELS,
//   TOGGLE_MOBILE_FILTERS,
//   TOGGLE_SUMMARY,
//   UPDATE_DISPLAYED,
//   UPDATE_QUERY,
//   UPDATE_STATE,
//   UPDATE_TOTAL_STUDIES,
// } from "../actions/search";

// const searchReducer = (state: SearchState = initialState, action: Action) => {
//   switch (action.type) {
//     case INIT_SEARCHKIT:
//       return state;

//     case TOGGLE_LOADING:
//       return Object.assign({}, state, {
//         loading: action.loading,
//       });

//     case TOGGLE_MOBILE_FILTERS:
//       return Object.assign({}, state, {
//         showMobileFilters: !state.showMobileFilters,
//       });

//     case TOGGLE_ADVANCED_SEARCH:
//       return Object.assign({}, state, {
//         showAdvancedSearch: !state.showAdvancedSearch,
//       });

//     case TOGGLE_SUMMARY:
//       return Object.assign({}, state, {
//         showFilterSummary: !state.showFilterSummary,
//       });

//     case TOGGLE_METADATA_PANELS:
//       return Object.assign({}, state, {
//         expandMetadataPanels: !state.expandMetadataPanels,
//       });

//     case UPDATE_DISPLAYED: {
//       return Object.assign({}, state, {
//         displayed: action.displayed,
//       });
//     }

//     case UPDATE_QUERY:
//       return Object.assign({}, state, {
//         query: action.query,
//       });

//     case UPDATE_STATE:
//       return Object.assign({}, state, {
//         state: action.state,
//       });

//     case RESET_SEARCH:
//       return state;

//     case UPDATE_TOTAL_STUDIES:
//       return Object.assign({}, state, {
//         totalStudies: action.totalStudies,
//       });

//     default:
//       return state;
//   }
// };
