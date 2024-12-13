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

import React, { FocusEvent, useContext } from "react";
import IndexSwitcher from "./IndexSwitcher";
import ThematicViewSwitcher from "./ThematicViewSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import CustomSearchBox from "./CustomSearchBox";
import { useLocation } from 'react-router-dom';
import { useClearRefinements, useHitsPerPage, usePagination, useSearchBox, useSortBy } from "react-instantsearch";
import { hitsPerPageItems, getSortByItems } from "../containers/SearchPage";
import { FaWindows } from "react-icons/fa";


const Header = () => {
  const { t } = useTranslation();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  const currentIndex = useAppSelector((state) => state.thematicView.currentIndex);
  const sortByItems = getSortByItems(currentLanguage.index, t);
  const navigate = useNavigate();
  const location = useLocation();

 // const logoFolder = require.context('../img/logos/', true, /\.(jpe?g|png|gif|svg)$/)
  //const logoImg = currentThematicView.icon;
  const logoImg = require('../img/icons/' + currentThematicView.icon);
  const longTitle = currentThematicView.longTitle;
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

      <div className="container columns is-vcentered">
        <div className="column is-narrow">
        <Link to={currentThematicView.path} className="columns is-vcentered is-gapless">
          <div className="logo column is-narrow">
          <img src={ logoImg } alt="Home" />
             
             </div>
              <div className="logo-title column is-narrow">
                <h1>{currentThematicView.title}</h1>
              </div>
              
            </Link>
          

        </div>
        <div className="column">
        <ThematicViewSwitcher /> 
        </div>
        <div className="column p-0">

          <div className="columns is-12 is-vcentered mb-0">
            <div className="column is-narrow has-text-centered-mobile p-0">

              
              {/* <span className="header-description" dangerouslySetInnerHTML={{ __html: longTitle }}></span> */}
            </div>
            <nav className="column navbar has-text-right is-flex-grow-1" aria-label="Main">
              <div className="is-right">
                <Link to={currentLanguage.code !== 'en' ? `/?sortBy=${currentLanguage.index}` : "/"}
                  onClick={() => {
                    resetQueries();
                  }}
                  onFocus={e => toggleClassOnFocusBlur(e, "is-sr-only")}
                  onBlur={e => toggleClassOnFocusBlur(e, "is-sr-only")}
                  className="link-button link is-sr-only is-hidden-mobile">
                  {t("header.frontPage")}
                </Link>
          
                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/documentation` : "/documentation"}
                  className="link">
                  {t("documentation.label")}
                </Link>
                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/about` : "/about"}
                  className="link">
                  {t("about.label")}
                </Link>
                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/rest-api` : "/rest-api"}
                  className="link">
                  API
                  </Link>
                 

              </div>
            </nav>
            <div className="column is-narrow hidden skip-link-wrapper is-hidden-mobile pb-0">
              <a href="#main" id="skip-to-main" className="link is-sr-only"
                onFocus={e => toggleClassOnFocusBlur(e, "is-sr-only")}
                onBlur={e => toggleClassOnFocusBlur(e, "is-sr-only")}>
                {t("header.skipToMain")}
              </a>
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
