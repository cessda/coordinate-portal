// Copyright CESSDA ERIC 2017-2024
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

import { CMMStudy, Similar } from "../../common/metadata";
import { Action } from "../actions";
import { CLEAR_STUDY, UPDATE_STUDY } from "../actions/detail";
import { Language } from "../utilities/language";

export interface DetailState {
  languageAvailableIn: Language[],
  study: CMMStudy | undefined;
  similars: Similar[];
}

const initialState: DetailState = {
  languageAvailableIn: [],
  study: undefined,
  similars: []
}

export default function detail(state: DetailState = initialState, action: Action): DetailState {
  switch(action.type) {
    case CLEAR_STUDY: {
      return Object.assign({}, state, {
        languageAvailableIn: action.languageAvailableIn,
        study: undefined,
        similars: []
      });
    }

    case UPDATE_STUDY: {
      return Object.assign({}, state, {
        languageAvailableIn: [],
        study: action.displayed,
        similars: action.similars
      });
    }

    default:
      return state;
  }
}
