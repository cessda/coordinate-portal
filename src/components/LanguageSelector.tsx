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
import { updateLanguage } from "../reducers/language"
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from "../hooks";
import { Language } from "../utilities/language";
import { useLocation, useSearchParams } from "react-router-dom";
import { useClearRefinements } from "react-instantsearch";

type LanguageOption = {
  label: string;
  value: string;
};

const LanguageSelector = () => {
  const language = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const resetAttributes = ['classifications', 'keywords', 'timeMethod'];
  const { refine: refineFilters } = useClearRefinements({
    includedAttributes: resetAttributes
  });

  const languageOptions: LanguageOption[] = language.list.map((lang: Language) => ({
    label: lang.label,
    value: lang.code,
  }));

  const changeLanguage = (value: string) => {
    dispatch(updateLanguage(value));
    if (location.pathname === '/') {
      // Reset filters that don't work in another language
      refineFilters();

      // Make sure location.search is also reset
      setSearchParams(searchParams => {
        const queryParamsObject: { [key: string]: string } = {};
        searchParams.forEach((value, key) => {
          queryParamsObject[key] = value;
        });

        // Remove attributes with indexes (e.g., keywords[0], keywords[1], timeMethod[0], etc.)
        Object.keys(queryParamsObject).forEach(key => {
          resetAttributes.forEach(attribute => {
            if (key.startsWith(`${attribute}[`)) {
              delete queryParamsObject[key];
            }
          });
        });

        // Convert the modified object back to URLSearchParams
        const newSearchParams = new URLSearchParams(queryParamsObject);

        newSearchParams.set("lang", value);
        return newSearchParams;
      });
    } else {
      setSearchParams(searchParams => {
        searchParams.set("lang", value);
        return searchParams;
      });
    }
  }

  return (
    <div className="language-picker">
      <Select
        value={{ value: language.currentLanguage.code, label: language.currentLanguage.label}}
        options={languageOptions}
        isSearchable={false}
        isClearable={false}
        onChange={(option) => {
          if (option && !Array.isArray(option) && option.valueOf()) {
            changeLanguage(option.value);
          }
        }}
      />
    </div>
  );
};

export default LanguageSelector;
