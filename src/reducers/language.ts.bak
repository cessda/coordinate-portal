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

import { createSlice } from "@reduxjs/toolkit";
import { Language, languages } from "../utilities/language";
import i18n from "../i18n/config";

export interface LanguageState {
  currentLanguage: Language;
  list: readonly Language[];
}

const initialState: LanguageState = {
  currentLanguage: languages.find((l) => l.code === "en") as Language,
  list: languages
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    updateLanguage: (state, action) => {
      let code = action.payload;
      const language = languages.find(element => element.code === code);
      let label: string;
      let index: string;

      if (!language) {
        code = "en";
        label = languages.find(element => element.code === code)?.label || '';
        index = languages.find(element => element.code === code)?.index || '';
      } else {
        // Notify Matomo Analytics of language change.
        // const _paq = getPaq();
        // _paq.push(['trackEvent', 'Language', 'Change Language', code.toUpperCase()]);

        label = language.label;
        index = language.index;
      }
      i18n.changeLanguage(code);
      state.currentLanguage = {code: code, label: label, index: index};
    },
  }
});

export const { updateLanguage } = languageSlice.actions;

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
