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

import React from "react";
import { esIndex } from "../utilities/thematicViews";
import { updateThematicView } from "../reducers/thematicView"
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from "../hooks";
import { useLocation, useSearchParams } from "react-router-dom";
import { useClearRefinements } from "react-instantsearch";

// No longer using the concept of language selection from a technical standpoint. We are switching the indexe, not the language in terms of i18n.
// However, for the UI it makes more sense to present it as a language selector.

type ESIndexOption = {
  label: string;
  indexName: string;
  value: any;
};

const IndexSwitcher = () => {

  const thematicView = useAppSelector((state) => state.thematicView);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const resetAttributes = ['classifications', 'keywords', 'timeMethod'];
  const { refine: resetFiltersFromArray } = useClearRefinements({
    includedAttributes: resetAttributes
  });

  const esIndexOptions: ESIndexOption[] = thematicView.currentThematicView.esIndexes.map((lang: esIndex) => ({
    label: lang.language,
    indexName: lang.indexName,
    value: { path: thematicView.currentThematicView.path, esIndex: lang.indexName }
  }));

  const changeIndex = (value: any) => {
 /*   if (location.pathname === '/') {
      // Reset filters that don't work in another language
      resetFiltersFromArray();
    } else {
      setSearchParams(searchParams => {
        searchParams.set("lang", value);
        return searchParams;
      });
    }
      */
        dispatch(updateThematicView(value));
  }
  
const currentLabel = (esIndexOptions.find((l) => l.indexName === thematicView.currentIndex ) as ESIndexOption).label;
  return (
    
    <div className="language-picker">
      <Select
        classNamePrefix="react-select"
        value={{ value: thematicView.currentIndex, label: currentLabel}}
        options={esIndexOptions}
        isSearchable={false}
        isClearable={false}
        onChange={(option) => {
          if (option) {
            changeIndex(option.value);
          }
       }}
      />
    </div>
  );
};

export default IndexSwitcher;