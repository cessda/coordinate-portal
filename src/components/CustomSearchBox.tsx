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
import {
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps
} from 'react-instantsearch-hooks-web';
import { useNavigate } from 'react-router-dom';

const CustomSearchBox = (props: UseSearchBoxProps) => {
  const { t, i18n } = useTranslation();
  // const stateQuery = useAppSelector((state) => state.search.query);
  // const index = useAppSelector((state) => state.search.index);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const queryParamValue = queryParams.get(`${index}[query]`);

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === 'stalled';

  // useEffect(() => {
  //   if (queryParamValue) {
  //     setNewQuery(queryParamValue);
  //   }
  //   else {
  //     setNewQuery('');
  //   }
  // }, [queryParamValue]);

  function setNewQuery(newQuery: string) {
    if (location.pathname !== "/") {
      navigate("/");
    }
    refine(newQuery);
  }

  const handleChange = (event: { target: { value: string; }; }) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      setNewQuery(inputValue);
    }
  };

  return (
    <form action="/"
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

            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
    >
      <div className="columns is-gapless">
        <div className="column">
          <input className="input"
                ref={inputRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder=""
                spellCheck={false}
                maxLength={512}
                type="search"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus />
        </div>
        <div className="columns is-gapless is-flex">
          <div className="column is-narrow is-flex-grow-0">
            <button {...(isSearchStalled ? {'className': 'button is-loading'} : {'className': 'button'})}
                    type="submit">
              {t("search.label")}
            </button>
          </div>
          <div className="column is-narrow is-flex-grow-0">
            <button className="button"
                    {...(inputValue.length === 0 || isSearchStalled ? {'disabled': true} : undefined)}
                    type="reset" hidden={inputValue.length === 0 || isSearchStalled}>
              {t("search.reset")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CustomSearchBox;
