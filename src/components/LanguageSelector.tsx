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
  const [searchParams, setSearchParams] = useSearchParams();
  const resetAttributes = ['classifications', 'keywords', 'timeMethod'];
  const { refine: resetFiltersFromArray } = useClearRefinements({
    includedAttributes: resetAttributes
  });

  const languageOptions: LanguageOption[] = language.list.map((lang: Language) => ({
    label: lang.label,
    value: lang.code,
  }));

  const changeLanguage = (value: string) => {
    if (location.pathname === '/') {
      // Reset filters that don't work in another language
      resetFiltersFromArray();
    } else {
      setSearchParams(searchParams => {
        searchParams.set("lang", value);
        return searchParams;
      });
    }
    dispatch(updateLanguage(value));
  }

  return (
    <div className="language-picker">
      <Select
        classNamePrefix="react-select"
        value={{ value: language.currentLanguage.code, label: language.currentLanguage.label}}
        options={languageOptions}
        isSearchable={false}
        isClearable={false}
        onChange={(option) => {
          if (option) {
            changeLanguage(option.value);
          }
        }}
        classNames={{
          menu: () => 'mt-0'
        }}
      />
    </div>
  );
};

export default LanguageSelector;
