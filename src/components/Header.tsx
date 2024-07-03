// Copyright CESSDA ERIC 2017-2024
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

import React, { FocusEvent } from "react";
import LanguageSelector from "./LanguageSelector";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import coordinateLogo from '../img/coordinate-logo.png';
import CustomSearchBox from "./CustomSearchBox";
import { useLocation } from 'react-router-dom';
import { useClearRefinements, useHitsPerPage, usePagination, useSearchBox, useSortBy } from "react-instantsearch";
import { hitsPerPageItems, getSortByItems } from "../containers/SearchPage";
import Tooltip from "./Tooltip";

const Header = () => {
  const { t } = useTranslation();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const sortByItems = getSortByItems(currentLanguage.index, t);

  const navigate = useNavigate();
  const location = useLocation();

  function toggleClassOnFocusBlur(e: FocusEvent<HTMLElement>, className: string) {
    e.target.classList.toggle(className);
  }

  const { clear: clearQuery } = useSearchBox();
  const { refine: refineFilters } = useClearRefinements();
  const { refine: refinePagination } = usePagination();
  const { refine: refineResultsPerPage } = useHitsPerPage({ items: hitsPerPageItems });
  const { refine: refineSortBy } = useSortBy({ items: sortByItems });

  const resetQueries = () => {
    clearQuery();
    // Root path requires more resets
    if (location.pathname === "/") {
      refineFilters();
      refinePagination(1);
      refineResultsPerPage(30);
      refineSortBy(currentLanguage.index);
    }
  }

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
            <img src={ coordinateLogo } alt={t("header.frontPage")}
                className="cursor-pointer"
                onClick={() => {
                  resetQueries();
                  navigate(currentLanguage.code !== 'en' ? `/?sortBy=${currentLanguage.index}` : "/");
                }}/>
          </div>
        </div>
        <div className="column p-0">
          <div className="container columns is-flex is-flex-direction-column is-flex-wrap-wrap">
            <div className="columns is-flex-direction-row is-vcentered mb-0">
              <div className="column is-narrow skip-link-wrapper is-hidden-mobile pb-0">
                <a href="#main" id="skip-to-main" className="link is-sr-only"
                  onFocus={(e: FocusEvent<HTMLElement>) => toggleClassOnFocusBlur(e, "is-sr-only")}
                  onBlur={(e: FocusEvent<HTMLElement>) => toggleClassOnFocusBlur(e, "is-sr-only")}>
                  {t("header.skipToMain")}
                </a>
              </div>
              <div className="column is-narrow is-flex is-flex-grow-0 is-hidden-mobile p-0"></div>
              <div className="column pb-0 has-text-centered-mobile pb-0">
                <span className="header-description demo-text" dangerouslySetInnerHTML={{ __html: t("header.demoText.label") }}></span>
                <Tooltip content={t("header.demoText.tooltip.content")}
                        ariaLabel={t("header.demoText.tooltip.ariaLabel")}
                        classNames={{container: 'demo-text-tooltip'}}/>&nbsp;
                <span className="header-description" dangerouslySetInnerHTML={{ __html: t("header.portalDescription") }}></span>
              </div>
            </div>
            <div className="column ml-2">
              <div className="container columns is-variable is-1-mobile is-flex is-flex-direction-row is-flex-wrap-wrap">
                <div className="column">
                  <CustomSearchBox />
                </div>
                <div className="column is-narrow">
                  <LanguageSelector />
                </div>
                <nav className="column navbar" aria-label="Main">
                  <div className="buttons is-flex-wrap-nowrap is-right">
                    <Link to={currentLanguage.code !== 'en' ? `/?sortBy=${currentLanguage.index}` : "/"}
                          onClick={() => {
                            resetQueries();
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
                    <Link to="/rest-api"
                          className="link-button link">
                      {t("api.label")}
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
