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

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInstantSearch, useSearchBox, UseSearchBoxProps } from 'react-instantsearch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from "../hooks";
import { Helmet } from "react-helmet-async";


const CustomSearchBox = (props: UseSearchBoxProps) => {
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  

  const isSearchStalled = status === 'stalled';

  function setNewQuery(newQuery: string) {
    if (location.pathname !== currentThematicView.path) {
      navigate( `${currentThematicView.path}?query=${newQuery}`); 
    }
    refine(newQuery);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      setNewQuery(inputValue);
    }
  };

  const pageTitle = searchParams.get("query") ? currentThematicView.longTitle + ' - search results for "' + searchParams.get("query") + '"' : currentThematicView.longTitle;
  return (
    <form action={currentThematicView.path}
          role="search"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setNewQuery(inputValue);

            if (inputRef.current) {
              inputRef.current.blur();
            }
          }}
          onReset={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setInputValue('');
            setNewQuery('');

            // Make sure location.search.query is also reset
            setSearchParams(searchParams => {
              const queryParamsObject: { [key: string]: string } = {};
              searchParams.forEach((value, key) => {
                queryParamsObject[key] = value;
              });
              delete queryParamsObject['query'];
              const newSearchParams = new URLSearchParams(queryParamsObject);
              return newSearchParams;
            });

            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
    >
      <div className="columns is-narrow is-gapless">
      <Helmet>
            <title>{pageTitle}</title>
            </Helmet>
        <div className="column is-narrow is-narrow-mobile">
          <input className="input searchbox"
                aria-label="Search field"
                ref={inputRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Search in selected language"
                spellCheck={false}
                maxLength={512}
                type="search"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus />
                 <button {...(isSearchStalled ? {'className': 'button is-loading'} : {'className': 'button'})}
                    type="submit">
              {t("search.label")}
            </button>
          </div>
          <div className="column is-narrow is-flex-grow-0 ml-1 is-hidden-mobile">
            <button className="button"
                    {...(inputValue.length === 0 || isSearchStalled ? {'disabled': true} : undefined)}
                    type="reset" hidden={inputValue.length === 0 || isSearchStalled}>
              {t("search.reset")}
            </button>
        </div>

      </div>
    </form>
  );
}

export default CustomSearchBox;
