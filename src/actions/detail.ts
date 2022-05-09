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

import { SearchResponse } from "elasticsearch";
import _ from "lodash";
import { CMMStudy } from "../../common/metadata";
import { Thunk } from "../types";
import elasticsearch from "../utilities/elasticsearch";
import { detailQuery, similarQuery } from "../utilities/searchkit";

//////////// Redux Action Creator : UPDATE_STUDY
export const UPDATE_STUDY = "UPDATE_STUDY";

export type UpdateStudyAction = {
  type: typeof UPDATE_STUDY;
  displayed: Pick<SearchResponse<CMMStudy>, "hits">;
};

export function updateStudy(id: string): Thunk<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState();

    const response = await elasticsearch.search<CMMStudy>({
      size: 1,
      body: {
        index: state.language.currentLanguage.index,
        query: detailQuery(id)
      }
    });

    dispatch({
      type: UPDATE_STUDY,
      displayed: response
    });
    
    if (response.hits.hits.length > 0) {
      dispatch(updateSimilars(response.hits.hits[0]._source));
    } else {
      dispatch({ 
        type: UPDATE_SIMILARS,
        similars: []
      });
    }
  };
}

//////////// Redux Action Creator : UPDATE_SIMILARS
export const UPDATE_SIMILARS = "UPDATE_SIMILARS";

export type UpdateSimilarsAction = {
  type: typeof UPDATE_SIMILARS;
  similars: CMMStudy[];
};

export function updateSimilars(item: CMMStudy): Thunk<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState();

    const response = await elasticsearch.search<CMMStudy>({
      size: 5,
      body: {
        index: state.language.currentLanguage.index,
        query: similarQuery(item.id, item.titleStudy)
      }
    });

    dispatch({
      type: UPDATE_SIMILARS,
      similars: response.hits.hits.map(hit => hit._source)
    });
  };
}

////////////

export type DetailAction = 
  | UpdateStudyAction
  | UpdateSimilarsAction;
