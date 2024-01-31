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

import React, { FocusEvent, useEffect } from "react";
// import { GroupedSelectedFilters, HitsStats, ResetFilters } from "searchkit";
import LanguageSelector from "./LanguageSelector";
// import { connect, Dispatch } from "react-redux";
// import { browserHistory } from "react-router";
import { Link, useNavigate } from "react-router-dom";
// import Reset from "./Reset";
// import { queryBuilder } from "../utilities/searchkit";
// import SearchBox from "./SearchBox";
// import type { State } from "../types";
// import { AnyAction, bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  toggleMobileFilters,
  toggleSummary,
  toggleAdvancedSearch,
} from "../reducers/search";
import coordinateLogo from '../img/coordinate-logo.png';
import CustomSearchBox from "./CustomSearchBox";
import { useLocation } from 'react-router-dom';
import { UseSearchBoxProps, useClearRefinements, useHitsPerPage, usePagination, useSearchBox, useSortBy } from "react-instantsearch";
import { hitsPerPageItems, getSortByItems } from "../containers/SearchPage";
import Tooltip from "./Tooltip";

const Header = () => {
  const { t, i18n } = useTranslation();
  const showAdvancedSearch = useAppSelector((state) => state.search.showAdvancedSearch);
  const showFilterSummary = useAppSelector((state) => state.search.showFilterSummary);
  const showMobileFilters = useAppSelector((state) => state.search.showMobileFilters);
  const index = useAppSelector((state) => state.search.index);

  const sortByItems = getSortByItems(index);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParamValue = queryParams.get(`${index}[query]`);

  // const filters = useAppSelector((state) => state.search.query.post_filter);
  // const dispatch = useAppDispatch();

  function toggleClassOnFocusBlur(e: FocusEvent<HTMLElement>, className: string) {
    e.target.classList.toggle(className);
  }

  const { refine: refineQuery } = useSearchBox();
  const { refine: refineFilters } = useClearRefinements();
  const { refine: refinePagination } = usePagination();
  const { refine: refineResultsPerPage } = useHitsPerPage({ items: hitsPerPageItems });
  const { refine: refineSortBy } = useSortBy({ items: sortByItems });

  return (
    <header>
      {/* <div id="topstripe" className="is-hidden-mobile">
        <div className="container">
          <div className="columns is-gapless">
            <div className="column">
              <a href="https://www.cessda.eu/" className="cessda-organisation">
                {t("cessda")}
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container columns is-vcentered">
        <div className="column is-one-quarter">
          <div className="logo">
            {/* <Link to="/"
                  onClick={() => {
                    // Only the root path uses routing which needs resetting
                    if (location.pathname === "/") {
                      refineQuery('');
                      refineFilters();
                      refinePagination(1);
                      refineResultsPerPage(30);
                      refineSortBy(index);
                    }
                  }}> */}
              <img src={ coordinateLogo } alt={t("header.frontPage")}
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    refineQuery('');
                    // Root path requires more resets
                    if (location.pathname === "/") {
                      refineFilters();
                      refinePagination(1);
                      refineResultsPerPage(30);
                      refineSortBy(index);
                    }
                  }}/>
            {/* </Link> */}
          </div>
        </div>
        <div className="column p-0">
          <div className="container columns is-flex is-flex-direction-column">
            <div className="column pt-1 pb-0 has-text-centered-mobile">
              <span className="header-description demo-text" dangerouslySetInnerHTML={{ __html: t("header.demoText.label") }}></span>
              <Tooltip content={t("header.demoText.tooltip.content")}
                      ariaLabel={t("header.demoText.tooltip.ariaLabel")}
                      classNames={{container: 'demo-text-tooltip'}}/>&nbsp;
              <span className="header-description" dangerouslySetInnerHTML={{ __html: t("header.portalDescription") }}></span>
            </div>
            <div className="column">
              <div className="container columns is-vcentered is-flex is-flex-direction-row">
                <div className="column is-narrow skip-link-wrapper is-hidden-mobile">
                      <a href="#main" id="skip-to-main" className="link is-sr-only"
                        onFocus={(e: FocusEvent<HTMLElement>) => toggleClassOnFocusBlur(e, "is-sr-only")}
                        onBlur={(e: FocusEvent<HTMLElement>) => toggleClassOnFocusBlur(e, "is-sr-only")}>
                        {t("header.skipToMain")}
                      </a>
                    </div>
                <div className="column is-narrow is-flex is-flex-grow-0"></div>
                <div className="column">
                  <CustomSearchBox />
                  {/* <LanguageSelector /> */}
                </div>
                {/* <div className="column is-narrow">
                  <ClearRefinements excludedAttributes={[]}
                      translations={{
                        resetButtonText: t("reset.query"),
                    }}/>
                </div> */}
                <nav className="column is-4 navbar" aria-label="Main">
                  <div className="buttons is-right">
                    <Link to="/"
                          onClick={() => {
                            refineQuery('');
                            // Only need to reset on the root path
                            if (location.pathname === "/") {
                              refineFilters();
                              refinePagination(1);
                              refineResultsPerPage(30);
                              refineSortBy(index);
                            }
                          }}
                          onFocus={(e: FocusEvent<HTMLElement>) => toggleClassOnFocusBlur(e, "is-sr-only")}
                          onBlur={(e: FocusEvent<HTMLElement>) => toggleClassOnFocusBlur(e, "is-sr-only")}
                          className="link-button link is-sr-only is-hidden-mobile">
                      {t("header.frontPage")}
                    </Link>
                    <Link to="/documentation"
                          className="link-button link">
                      {t("documentation.label")}
                    </Link>
                    <Link to="/about"
                          className="link-button link">
                      {t("about.label")}
                    </Link>
                  </div>
                </nav>
              </div>
              {/* <div className="column is-narrow button-wrapper">
                <Tooltip content={t("searchInfotip")} />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* {showAdvancedSearch && (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title">{t("advancedSearch.label")}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => dispatch(toggleAdvancedSearch(showAdvancedSearch))}
              />
            </div>
            <section className="modal-card-body">
              <p className="pb-10">{t("advancedSearch.introduction")}</p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.and")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.or")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.negates")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.phrase")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.prefix")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.precedence")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.distance")}
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.slop")}
              </p>
              <p className="pt-15">
                <b>{t("advancedSearch.escaping.heading")}</b>
              </p>
              <p className="tag is-light has-text-weight-semibold">
                {t("advancedSearch.escaping.content")}
              </p>
              <p className="pt-15">
                <b>{t("advancedSearch.defaultOperator.heading")}</b>
              </p>
              <p className="has-text-weight-semibold">
                {t("advancedSearch.defaultOperator.content")}
              </p>
            </section>
            <div className="modal-card-foot">
              <button
                className="button is-light"
                onClick={() => dispatch(toggleAdvancedSearch(showAdvancedSearch))}
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </header>
  );
};

export default Header;
