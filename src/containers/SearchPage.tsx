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

import React, { useState } from "react";
import {
  Hits,
  RefinementList,
  ClearRefinements,
  Stats,
  HitsPerPage,
  SortBy,
  CurrentRefinements,
  useCurrentRefinements,
  RangeInput,
} from "react-instantsearch";
import Result from "../components/Result";
import Pagination from "../components/Pagination";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleMobileFilters, toggleSummary } from "../reducers/search";
import Panel from "../components/Panel";
import Tooltip from "../components/Tooltip";

const hitsPerPageItems = [
  { value: 10, label: 'Show 10 studies' },
  { value: 30, label: 'Show 30 studies', default: true },
  { value: 50, label: 'Show 50 studies' },
  { value: 150, label: 'Show 150 studies' },
]

const getSortByItems = (index: string) => {
  return [
    { value: `${index}`, label: 'Relevance' },
    { value: `${index}_title_asc`, label: 'Title (A-Z)' },
    { value: `${index}_title_desc`, label: 'Title (Z-A)' },
    { value: `${index}_collection_date_desc`, label: 'Coll Date (New-Old)' },
    { value: `${index}_collection_date_asc`, label: 'Coll Date (Old-New)' },
  ];
};

const SearchPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const toggleSummaryRef = React.createRef() as React.RefObject<HTMLButtonElement>;
  const [showAbstract, setShowAbstract] = useState(true);

  // const totalStudies = useAppSelector((state) => state.search.totalStudies);
  const showFilterSummary = useAppSelector((state) => state.search.showFilterSummary);
  const showMobileFilters = useAppSelector((state) => state.search.showMobileFilters);
  const index = useAppSelector((state) => state.search.index);

  const sortByItems = getSortByItems(index);

  // useEffect(() => {
  //   dispatch(updateTotalStudies());
  // }, []);

  const { items } = useCurrentRefinements();
  const hasRefinements = items.length > 0;

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      if (event.target instanceof HTMLElement) {
        event.target.click();
      }
    }
  };

  function focusToggleSummary() {
    if (toggleSummaryRef.current) {
      toggleSummaryRef.current.focus();
    }
  };

  return (
    <div className={'columns layout' + (showMobileFilters ? ' show-mobile-filters' : '')}>
      <div className="column is-8 is-hidden-tablet">
        <button className={'button is-info focus-visible' + (!showFilterSummary ? ' on-top' : '')}
                onClick={() => dispatch(toggleMobileFilters(showMobileFilters))}
                onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e)}>
          {t("showFilters")}
        </button>
      </div>
      <div className="column is-4 filters">
        <div className="float">
          <div className="columns is-vcentered filter-buttons">
            <div className="column is-narrow p-0 mr-4">
              <button className="button is-info focus-visible"
                      onClick={() => dispatch(toggleSummary(showFilterSummary))}
                      onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e)}
                      disabled={!hasRefinements}
                      ref={toggleSummaryRef}>
                {t("filters.summary.label")}
              </button>
              {showFilterSummary && (
                <div className="modal is-active">
                  <div className="modal-background" />
                  <div className="modal-card">
                    <div className="modal-card-head">
                      <h2 className="modal-card-title">{t("filters.summary.label")}</h2>
                      <button className="delete focus-visible"
                              aria-label="close"
                              onClick={() => {dispatch(toggleSummary(showFilterSummary)); focusToggleSummary();}}
                              autoFocus/>
                    </div>
                    <section className="modal-card-body">
                      {hasRefinements ? (
                        <>
                          <p className="pb-10">{t("filters.summary.introduction")}</p>
                          <CurrentRefinements />
                          <p dangerouslySetInnerHTML={{ __html: t('filters.summary.remove') }} />
                        </>
                      ) : (
                        <>
                          <p className="pb-10">{t("filters.summary.noFilters")}</p>
                        </>
                      )}
                      <p dangerouslySetInnerHTML={{ __html: t('filters.summary.close') }} />
                    </section>
                    <div className="modal-card-foot">
                      <button className="button is-info focus-visible"
                              onClick={() => {dispatch(toggleSummary(showFilterSummary)); focusToggleSummary();}}>
                        {t("close")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="column is-narrow p-0">
              <ClearRefinements classNames={{
                                  root: '',
                                  button: 'button is-info focus-visible',
                                }}
                                translations={{
                                  resetButtonText: t("reset.filters") 
                                }} />
            </div>
          </div>
          <Panel title={<h2>{t("metadata.topics.label")}</h2>}
                tooltip={<Tooltip id="filters-topic-tooltip"
                                  content={t("metadata.topics.tooltip.content")}
                                  ariaLabel={t("metadata.topics.tooltip.ariaLabel")}/>}
                collapsable={true}
                defaultCollapsed={true}>
            <RefinementList attribute="classifications" searchable limit={15}
                            classNames={{
                              searchBox: 'focus-visible',
                              checkbox: 'focus-visible'
                            }}/>
          </Panel>
          <Panel title={<h2>{t("metadata.keywords.label")}</h2>}
                tooltip={<Tooltip id="filters-keywords-tooltip"
                                  content={t("metadata.keywords.tooltip.content")}
                                  ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}/>}
                collapsable={true}
                defaultCollapsed={true}>
            <RefinementList attribute="keywords" searchable limit={15}
                            classNames={{
                              searchBox: 'focus-visible',
                              checkbox: 'focus-visible'
                            }}/>
          </Panel>
          <Panel title={<h2>{t("metadata.publisher")}</h2>}
                collapsable={true}
                defaultCollapsed={true}>
            <RefinementList attribute="publisher" searchable sortBy={['name:asc']} limit={20} showMore={true} showMoreLimit={30}
                            classNames={{
                              searchBox: 'focus-visible',
                              checkbox: 'focus-visible'
                            }}/>
          </Panel>
          <Panel title={<h2>{t("metadata.country")}</h2>}
                collapsable={true}
                defaultCollapsed={true}>
            <RefinementList attribute="country" searchable sortBy={['name:asc']} limit={200} showMore={true} showMoreLimit={500}
                            classNames={{
                              searchBox: 'focus-visible',
                              checkbox: 'focus-visible',
                              list: 'ais-CustomRefinementList'
                            }}/>
          </Panel>
          {/* Add switch to toggle between values from CV (id) and non-CV (term)? */}
          <Panel title={<h2>{t("metadata.timeMethod")}</h2>}
                collapsable={true}
                defaultCollapsed={true}>
            <RefinementList attribute="timeMethod" searchable limit={16} showMore={true} showMoreLimit={100}
                            classNames={{
                              searchBox: 'focus-visible',
                              checkbox: 'focus-visible',
                              list: 'ais-CustomRefinementList'
                            }}/>
          </Panel>
          <Panel title={<h2>{t("metadata.timeMethodCV")}</h2>}
                collapsable={true}
                defaultCollapsed={true}>
            <RefinementList attribute="timeMethodCV" searchable limit={16}
                            classNames={{
                              searchBox: 'focus-visible',
                              checkbox: 'focus-visible'
                            }}/>
          </Panel>
          <Panel title={<h2>{t("metadata.collectionYear")}</h2>}
                collapsable={true}
                defaultCollapsed={true}>
            <RangeInput attribute="collectionYear"
                        classNames={{
                          input: 'focus-visible',
                          submit: 'focus-visible'
                        }}/>
                        {/* Shows up in filter summary if set */}
                        {/* min={1900}/> */}
          </Panel>
        </div>
      </div>
      <div className="column is-8">
        <div className="columns is-vcentered ais-Stats-Dropdowns">
          <div className="column is-half">
            <Stats />
          </div>
          <div className="column is-half">
            <div className="columns is-vcentered is-flex is-flex-wrap-wrap">
              <div className="column is-half">
                <HitsPerPage items={hitsPerPageItems}/>
              </div>
              <div className="column is-half">
                <SortBy items={sortByItems}/>
              </div>
            </div>
          </div>
        </div>
        <Pagination />
        <div className="field show-abstract">
          <input id="switchRoundedInfo" type="checkbox" name="switchRoundedInfo" className="switch is-rounded is-info"
                checked={showAbstract} onChange={() => (setShowAbstract(!showAbstract))}/>
          <label htmlFor="switchRoundedInfo">{t("showAbstract")}</label>
        </div>
        <Hits hitComponent={(({ hit }) => ( <Result hit={hit} showAbstract={showAbstract} /> ))} />
        {/* <Hits hitComponent={Result}/> */}
        <Pagination />
      </div>
    </div>
  )
};

export { hitsPerPageItems, getSortByItems };
export default SearchPage;
