// Copyright CESSDA ERIC 2017-2022
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

import { CMMStudy, getStudyModel } from "../../common/metadata";
import { Action } from "../actions";
import { UPDATE_STUDY, UPDATE_SIMILARS } from "../actions/detail";

export interface DetailState {
  study: CMMStudy | undefined;
  similars: {
    id: string;
    title: string;
  }[]
}

const initialState: DetailState = {
  study: undefined,
  similars: []
}

export default function detail(state: DetailState = initialState, action: Action): DetailState {
  switch(action.type) {
    case UPDATE_STUDY: {
      const study = getStudyModel(action.displayed)[0];

      return Object.assign({}, state, {
        study: study
      });
    }

    case UPDATE_SIMILARS: {
      const similars = action.similars.map(s => ({
        id: s.id,
        title: s.titleStudy
      }));

      return Object.assign({}, state, {
        similars: similars
      });
    }

    default:
      return state;
  }
}
