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
  const { refine: refineFilters } = useClearRefinements({
    includedAttributes: ['classifications', 'keywords', 'timeMethod']
  });

  const languageOptions: LanguageOption[] = language.list.map((lang: Language) => ({
    label: lang.label,
    value: lang.code,
  }));

  const changeLanguage = (value: string) => {
    dispatch(updateLanguage(value));
    const detailRouteRegex = /^\/detail\//;
    if(location.pathname === '/'){
      // Reset filters that don't work in another language
      refineFilters();
    } else if(detailRouteRegex.test(location.pathname)){
      // Add lang to query params if on detail page (also triggers navigation)
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
