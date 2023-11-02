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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, languages } from "../utilities/language";

export interface LanguageState {
  currentLanguage: Language;
  list: readonly Language[];
}

const initialState: LanguageState = {
  currentLanguage: languages.find((l) => l.code === "en") as Language,
  list: languages,
};

const languageSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    changeLanguage(state: LanguageState, action: PayloadAction<string>) {
      let code = action.payload.toLowerCase();
      // Only dispatch a change language action if the language has changed.
      if (code === state.currentLanguage.code) {
        return;
      }
      const language = languages.find((l) => l.code === code);
      state.currentLanguage = language
        ? language
        : languages.find((l) => l.code === "en")!;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;

// import { Action } from "../actions";
// import { CHANGE_LANGUAGE, INIT_TRANSLATIONS } from "../actions/language";
// import { languages, Language } from "../utilities/language";

// export interface LanguageState {
//   currentLanguage: Language;
//   list: readonly Language[];
// }

// const initialState: LanguageState = {
//   currentLanguage: languages.find((l) => l.code === "en") as Language,
//   list: [],
// };

// const languageReducer = (
//   state: LanguageState = initialState,
//   action: Action
// ) => {
//   switch (action.type) {
//     case INIT_TRANSLATIONS:
//       return Object.assign({}, state, {
//         currentLanguage:
//           languages.find((l) => l.code === action.initialLanguage) ||
//           initialState.currentLanguage,
//         list: action.languages,
//       });

//     case CHANGE_LANGUAGE:
//       return Object.assign({}, state, {
//         currentLanguage:
//           languages.find((l) => l.code === action.code) ||
//           initialState.currentLanguage,
//         label: action.label,
//       });

//     default:
//       return state;
//   }
// };

// export default languageReducer;
