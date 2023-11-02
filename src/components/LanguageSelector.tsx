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
import { changeLanguage } from "../reducers/language"
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from "../hooks";
import { Language } from "../utilities/language";

type LanguageOption = {
  label: string;
  value: string;
};

const LanguageSelector = () => {
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const list = useAppSelector((state) => state.language.list);
  const dispatch = useAppDispatch();

  // const languageOptions: LanguageOption[] = list.map((language: Language) => {
  //   return {
  //     label: language.label,
  //     value: language.code
  //   };
  // });

  const languageOptions: LanguageOption[] = list.map((lang: Language) => ({
    label: lang.label,
    value: lang.code,
  }));

  // const languageOptions = [
  //   {label: "fi", value: "fi"},
  //   {label: "en", value: "en"}
  // ]

  return (
    <div className="language-picker">
      <Select
        // value={currentLanguage.code}
        options={languageOptions}
        isSearchable={false}
        isClearable={false}
        onChange={(option) => {
          if (option && !Array.isArray(option) && option.valueOf()) {
            // const currentLocation = browserHistory.getCurrentLocation();
            // if (currentLocation.pathname === "/") {
            // Change language directly on the search page
            dispatch(changeLanguage(option.value));
            // } else {
            //   // Change the language parameter in the URL, this triggers the language change and updates the history
            //   push({
            //     pathname: currentLocation.pathname,
            //     query: {
            //       ...currentLocation.query,
            //       lang: option.value,
            //     },
            //   });
            // }
          }
        }}
      />
    </div>
  );
};

export default LanguageSelector;
