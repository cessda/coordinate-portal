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

import { CMMStudy, getStudyModel, Similar } from "../../common/metadata";
import { Thunk } from "../types";
import { Language, languageMap } from "../utilities/language";

//////////// Redux Action Creator : UPDATE_STUDY
export const UPDATE_STUDY = "UPDATE_STUDY";

export type UpdateStudyAction = {
  type: typeof UPDATE_STUDY;
  displayed: CMMStudy | undefined;
  similars: Similar[]
};


//////////// Redux Action Creator : CLEAR_STUDY
export const CLEAR_STUDY = "CLEAR_STUDY";

export type ClearStudyAction = {
  type: typeof CLEAR_STUDY;
  languageAvailableIn: Language[];
};

export function updateStudy(id: string): Thunk<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState();

    const response = await fetch(`${window.location.origin}/api/sk/_get/${state.language.currentLanguage.index}/${encodeURIComponent(id)}`);

    if (response.ok) {

      // Get the study model from the hit.
      const json = await response.json() as { source: CMMStudy, similars: Similar[] };
      const study = getStudyModel(json.source);

      // Dispatch the study for display.
      dispatch({
        type: UPDATE_STUDY,
        displayed: study,
        similars: json.similars
      });

    } else {

      if(response.status === 404) {
        // If 404, get the languages that the study is available in
        const languageCodes = await response.json() as string[];

        const languagesArray: Language[] = [];

        for (const code of languageCodes) {
          const lang = languageMap.get(code);
          if (lang) {
            languagesArray.push(lang);
          }
        }

        // Study not found, clear the current study from the store.
        dispatch({
          type: CLEAR_STUDY,
          languageAvailableIn: languagesArray
        });
      } else {
        // Server issues
        dispatch({
          type: CLEAR_STUDY,
          languageAvailableIn: []
        });
        return;
      }
    }
  };
}

const elsstURI = "https://thesauri.cessda.eu/rest/v1/elsst-4";

interface SkosLookupResponse {
  result: {
    uri: string;
  }[];
}

export interface TermURIResult extends Record<string, string> {}

export async function getELSSTTerm(labels: string[], lang: string): Promise<TermURIResult> {

  // Request term from ELSST, the label is encoded
  const termUris = labels.map(async label => {
    const response = await fetch(`${elsstURI}/lookup?label=${encodeURIComponent(label)}&lang=${lang}`);

    // Match potentially found - try to extract the URI
    if (response.ok) {
      const results = await response.json() as SkosLookupResponse;
      if (results.result.length > 0) {
        return {
          label: label,
          uri: results.result[0].uri
        };
      }
    }

    // Match not found
    return {
      label: label,
      uri: undefined
    };
  });


  const destObject: TermURIResult = {}

  // Copy each result into the destination object, awaiting each in turn
  for (const promise of termUris) {
    const termResult = await promise;
    if (termResult.uri) {
      destObject[termResult.label] = termResult.uri;
    }
  }

  return destObject;
}

// TO BE SENT TO THE SERVER
// {
//    "lang": "${lang}",
//    "labels": [${label1}, ${label2}, ...]
// }

////////////

export type DetailAction =
  | ClearStudyAction
  | UpdateStudyAction;
