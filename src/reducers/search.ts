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
// import { stat } from "fs";

// export type SearchkitState = any;

// instantsearch keeps track of query so also using store for it just makes things more complicated

// type AsyncThunkConfig = {
//   /** return type for `thunkApi.getState` */
//   state?: unknown;
//   /** type for `thunkApi.dispatch` */
//   dispatch?: Dispatch;
//   /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
//   extra?: unknown;
//   /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
//   rejectValue?: unknown
//   /** return type of the `serializeError` option callback */
//   serializedErrorType?: unknown;
//   /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
//   pendingMeta?: unknown;
//   /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
//   fulfilledMeta?: unknown;
//   /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
//   rejectedMeta?: unknown;
// }

type Metrics = {
  studies: number,
  creators: number,
  countries: number
} | undefined;

export interface SearchState {
  index: string;
  loading: boolean;
  showMobileFilters: boolean;
  showAdvancedSearch: boolean;
  showFilterSummary: boolean;
  expandMetadataPanels: boolean;
  displayed: CMMStudy[];
  study: CMMStudy | undefined;
  // query: Record<string, any>;
  query: string;
  // state: SearchkitState;
  totalStudies: number;
  metrics: Metrics
}

const initialState: SearchState = {
  index: 'coordinate_en',
  loading: true,
  showMobileFilters: false,
  showAdvancedSearch: false,
  showFilterSummary: false,
  study: undefined,
  expandMetadataPanels: false,
  displayed: [],
  // query: {},
  query: "",
  // state: { q: "" },
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
    const response = await fetch(`${window.location.origin}/api/sk/_about_metrics/${state.search.index}`);

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
    // setQuery(state: SearchState, action: PayloadAction<string>) {
    //   state.query = action.payload.toLowerCase();
    // },
    toggleLoading: (state: SearchState, action: PayloadAction<boolean>) => {
      state.loading = !action.payload;
      //state.loading = current(state.loading) ? false : true;
    },
    toggleSummary: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showFilterSummary = !action.payload;
      //state.showFilterSummary = current(state.showFilterSummary) ? false : true;
    },
    toggleAdvancedSearch: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showAdvancedSearch = !action.payload;
      //state.showAdvancedSearch = current(state.showAdvancedSearch) ? false : true;
    },
    toggleMobileFilters: (state: SearchState, action: PayloadAction<boolean>) => {
      state.showMobileFilters = !action.payload;
      //state.showMobileFilters = current(state.showMobileFilters) ? false : true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMetrics.fulfilled, (state, action) => {
      state.metrics = action.payload;
    });
    builder.addCase(updateTotalStudies.fulfilled, (state, action) => {
      state.totalStudies = action.payload;
    });
    // builder.addCase(updateMetrics.rejected, (state, action) => {
    //   if (action.payload) {
    //     // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
    //     state.error = action.payload.errorMessage
    //   } else {
    //     state.error = action.error
    //   }
    // })
  },
});

export const { setMetrics, toggleLoading, toggleSummary, toggleAdvancedSearch, toggleMobileFilters } =
  searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectShowAdvancedSearch = (state: RootState) =>
//   state.showAdvancedSearch;

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
