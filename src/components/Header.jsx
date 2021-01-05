// @flow
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



import type { Node } from 'react';
import React, { Component } from 'react';
import { GroupedSelectedFilters, HitsStats, ResetFilters } from 'searchkit';
import Language from './Language';
import { connect } from 'react-redux';
import counterpart from 'counterpart';
import Reset from './Reset';
import { queryBuilder } from '../utilities/searchkit';
import SearchBox from './SearchBox';
import type { Dispatch, State } from '../types';
import { bindActionCreators } from 'redux';
import {
  resetSearch, toggleAdvancedSearch, toggleMobileFilters, toggleSummary
} from '../actions/search';
import { push } from 'react-router-redux';
import Translate from 'react-translate-component';

type Props = {
  pathname: string,
  code: string,
  filters?: Object,
  showFilterSummary: boolean,
  showMobileFilters: boolean,
  showAdvancedSearch: boolean,
  push: (path: string) => void,
  resetSearch: () => void,
  toggleSummary: () => void,
  toggleMobileFilters: () => void,
  toggleAdvancedSearch: () => void
};

export class Header extends Component<Props> {
  render(): Node {
    const {
      pathname,
      push,
      resetSearch,
      filters,
      showFilterSummary,
      toggleSummary,
      showMobileFilters,
      toggleMobileFilters,
      showAdvancedSearch,
      toggleAdvancedSearch
    } = this.props;

    return (
      <header>

        <div className="container">
          <Translate component="a" className="cessda-organisation" href="https://www.cessda.eu/" content="cessda" />
          <Language />
        </div>

        <div className="container">
          <div className="columns">
            <div className="column is-narrow">
              <div className="logo">
                <a className="cessda-eric" onClick={() => {
                  push('/');
                  resetSearch();
                }} />
              </div>
              {pathname === '/' &&
                <HitsStats className="hits-count" />
              }
            </div>
            <div className="column">
              <SearchBox autofocus={true} searchOnChange={true} queryBuilder={queryBuilder} />

              <div className="reset-search">
                {pathname === '/' &&
                  <a className="sk-reset-filters link mobile-filters-toggle" onClick={toggleMobileFilters}>
                    {showMobileFilters && <Translate content="hideFilters" />}
                    {!showMobileFilters && <Translate content="showFilters" />}
                  </a>
                }

                {filters &&
                  <Translate component="a" className="sk-reset-filters link" onClick={toggleSummary} content="filters.summary.label" />
                }

                <Translate component="a" className="sk-reset-filters link" onClick={toggleAdvancedSearch} content="advancedSearch.label" />

                <ResetFilters component={Reset}
                              options={{query: false, filter: true, pagination: true}}
                              translations={{
                                'reset.clear_all': counterpart.translate('reset.filters')
                              }}/>
                <ResetFilters component={Reset}
                              options={{query: true, filter: false, pagination: true}}
                              translations={{
                                'reset.clear_all': counterpart.translate('reset.query')
                              }}/>
              </div>
            </div>
          </div>
        </div>

        <div className={'modal' + (showFilterSummary ? ' is-active' : '')}>
          <div className="modal-background" />
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title"><Translate content="filters.summary.label" /></p>
              <button className="delete" aria-label="close" onClick={toggleSummary} />
            </div>
            <section className="modal-card-body">
              {filters &&
                <div>
                  <Translate component="p" className="pb-10" content="filters.summary.introduction" />
                  <GroupedSelectedFilters />
                  <Translate component="p" content="filters.summary.remove" />
                </div>
              }
              {!filters &&
                <div>
                  <Translate component="p" className="pb-10" content="filters.summary.noFilters" />
                  <Translate component="p" content="filters.summary.close" unsafe />
                </div>
              }
            </section>
            <div className="modal-card-foot">
              <button className="button is-light" onClick={toggleSummary}>
                <Translate content="close" />
              </button>
            </div>
          </div>
        </div>

        <div className={'modal' + (showAdvancedSearch ? ' is-active' : '')}>
          <div className="modal-background" />
          <div className="modal-card">
            <div className="modal-card-head">
              <Translate component="p" className="modal-card-title" content="advancedSearch.label" />
              <button className="delete" aria-label="close" onClick={toggleAdvancedSearch} />
            </div>
            <section className="modal-card-body">
              <Translate component="p" className="pb-10" content="advancedSearch.introduction" />
              {this.generateTranslatedParagraph("advancedSearch.and")}
              {this.generateTranslatedParagraph("advancedSearch.or")}
              {this.generateTranslatedParagraph("advancedSearch.negates")}
              {this.generateTranslatedParagraph("advancedSearch.phrase")}
              {this.generateTranslatedParagraph("advancedSearch.prefix")}
              {this.generateTranslatedParagraph("advancedSearch.precedence")}
              {this.generateTranslatedParagraph("advancedSearch.distance")}
              {this.generateTranslatedParagraph("advancedSearch.slop")}
              <p className="pt-15">
                <Translate component="strong" content="advancedSearch.escaping.heading" unsafe />
              </p>
              {this.generateTranslatedParagraph("advancedSearch.escaping.content")}
              <p className="pt-15">
                <Translate component="strong" content="advancedSearch.defaultOperator.heading" unsafe />
              </p>
              <Translate component="p" content="advancedSearch.defaultOperator.content"
                            with={{className: 'has-text-weight-semibold'}}
                            unsafe/>
            </section>
            <div className="modal-card-foot">
              <Translate component="button" className="button is-light" 
                            onClick={toggleAdvancedSearch} 
                            content="close"/>
            </div>
          </div>
        </div>
      </header>
    );
  }

  /**
   * Returns a translatable \<p\> element with substitution enabled.
   * @param {String} translationString the string to translate
   */
  generateTranslatedParagraph(translationString: string) {
    return <Translate component="p" content={translationString}
      with={{ className: 'tag is-light has-text-weight-semibold' }}
      unsafe />;
  }
}

export const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    code: state.language.code,
    filters: state.search.query.post_filter,
    showFilterSummary: state.search.showFilterSummary,
    showMobileFilters: state.search.showMobileFilters,
    showAdvancedSearch: state.search.showAdvancedSearch
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch),
    resetSearch: bindActionCreators(resetSearch, dispatch),
    toggleSummary: bindActionCreators(toggleSummary, dispatch),
    toggleMobileFilters: bindActionCreators(toggleMobileFilters, dispatch),
    toggleAdvancedSearch: bindActionCreators(toggleAdvancedSearch, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
