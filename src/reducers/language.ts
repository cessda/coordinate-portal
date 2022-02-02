
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

import { Action } from "../actions";
import { CHANGE_LANGUAGE, INIT_TRANSLATIONS } from "../actions/language";
import { languages, Language } from "../utilities/language";

export interface LanguageState {
  currentLanguage: Language;
  list: readonly Language[];
}

const initialState: LanguageState = {
  currentLanguage: languages.find(l => l.code === "en") || languages[0],
  list: []
};

export default function language(state = initialState, action: Action): LanguageState {
  switch (action.type) {
    case INIT_TRANSLATIONS:
      return Object.assign({}, state, {
        currentLanguage: languages.find(l => l.code === action.initialLanguage) || languages.find(l => l.code === "en") || languages[0],
        list: action.languages
      });

    case CHANGE_LANGUAGE:
      return Object.assign({}, state, {
        currentLanguage: languages.find(l => l.code === action.code) || languages[0],
        label: action.label
      });

    default:
      return state;
  }
}
