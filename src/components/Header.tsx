/* eslint-disable @typescript-eslint/no-require-imports */
// Copyright CESSDA ERIC 2017-2025
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
import ThematicViewSwitcher from "./ThematicViewSwitcher";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import { useClearRefinements, useHitsPerPage, usePagination, useSearchBox, useSortBy } from "react-instantsearch";
import { hitsPerPageItems, getSortByItems } from "../containers/SearchPage";
import { VirtualSortBy } from "../components/VirtualComponents";

const Header = () => {
  const { t } = useTranslation();
  const currentIndex = useAppSelector((state) => state.thematicView.currentIndex);
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  let virtualSortByItems: { value: string, label: string }[] = [];
  const sortByItems = getSortByItems(currentIndex.indexName, t);
  virtualSortByItems = virtualSortByItems.concat(sortByItems);

  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const logoImg = require('../img/icons/' + currentThematicView.icon);
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
    if (location.pathname === currentThematicView.path) {
      refineFilters();
      refinePagination(1);
      refineResultsPerPage(30);
      refineSortBy(currentIndex.indexName);
    }
  }
  const [isActive, setisActive] = React.useState(false);

const searchform = document.querySelector<HTMLFormElement>('#searchform');
  return (
    <header>
      <VirtualSortBy items={virtualSortByItems} />
      <div className="container columns is-mobile is-vcentered">
        <div className="column is-narrow p-1">

        <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/?sortBy=${currentIndex.indexName}` : `/?sortBy=${currentIndex.indexName}`} onClick={() => {
                  resetQueries();
                  useEffect(() => {
                    searchform?.reset();
                  });
                }}>
            <div id="home" className="columns is-mobile is-vcentered is-gapless">
              <div className="logo column is-narrow">
                <img src={logoImg} alt="Home" />

              </div>
              <div className="logo-title column is-narrow">
                <h1>{currentThematicView.title}</h1>
              </div>

            </div>
          </Link>

        </div>
        <div className="column is-narrow hidden skip-link-wrapper is-hidden-mobile p-0">
          <a href="#main" id="skip-to-main" className="link is-sr-only"
            onFocus={e => toggleClassOnFocusBlur(e, "is-sr-only")}
            onBlur={e => toggleClassOnFocusBlur(e, "is-sr-only")}>
            &nbsp;{t("header.skipToMain")}&nbsp;
          </a>
        </div>
        <div className="column is-narrow p-0">
          <ThematicViewSwitcher />
        </div>
        <div className="column p-0">

          <div className="columns is-vcentered is-justify-content-end p-0">

            <nav className="column navbar is-narrow p-0" aria-label="Main">

              <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>


                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/documentation` : "/documentation"}
                  className="link navbar-item">
                  User Guide
                </Link>
                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/collections` : "/collections"}
                  className="link navbar-item">
                  Collections
                </Link>
                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/about` : "/about"}
                  className="link navbar-item">
                  About
                </Link>
                <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/rest-api` : "/rest-api"}
                  className="link navbar-item">
                  API
                </Link>
              </div>
              <div className="navbar-brand">
                <a role="button" className={`navbar-burger burger ${isActive ? "is-active" : ""}`} data-target="navMenu" onClick={() => {
                  setisActive(!isActive);
                }} aria-label="menu" aria-expanded="false">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>

                </a>

              </div>
            </nav>

          </div>


        </div>
      </div>
    </header>
  );
};

export default Header;
