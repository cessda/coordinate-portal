// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {GroupedSelectedFilters, HitsStats, ResetFilters} from 'searchkit';
import Language from './Language';
import {connect} from 'react-redux';
import counterpart from 'counterpart';
import Reset from './Reset';
import {queryBuilder} from '../utilities/searchkit';
import SearchBox from './SearchBox';
import type {State} from '../types';
import {bindActionCreators} from 'redux';
import {
  resetSearch, toggleAdvancedSearch, toggleMobileFilters, toggleSummary
} from '../actions/search';
import {push} from 'react-router-redux';
import Translate from 'react-translate-component';
import * as _ from "lodash";

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

class Header extends Component<Props> {
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
        <div className="background"/>

        <span className="beta">Beta</span>

        <div className="container">
          <Language/>
        </div>

        <div className="container">
          <div className="columns">
            <div className="column is-narrow">
              <div className="logo">
                <a className="cessda-eric" onClick={() => {
                  push('/');
                  resetSearch();
                }}/>
                <span className="cessda-pasc">Products and Services Catalogue</span>
              </div>
            </div>
            {!(_.trim(pathname, '/') === 'terms') &&
              <div className="column">
                <SearchBox
                  autofocus={true}
                  searchOnChange={true}
                  prefixQueryFields={['_all']}
                  prefixQueryOptions={{type: 'cross_fields'}}
                  queryBuilder={queryBuilder}/>

                {pathname === '/' &&
                 <div className="reset-search">
                   <HitsStats className="hits-count"/>

                   <a className="sk-reset-filters link mobile-filters-toggle"
                      onClick={toggleMobileFilters}>
                     {showMobileFilters && <Translate content="hideFilters"/>}
                     {!showMobileFilters && <Translate content="showFilters"/>}
                   </a>

                   <a className="sk-reset-filters link" onClick={toggleAdvancedSearch}>
                     <Translate content="advancedSearch"/>
                   </a>

                   {filters &&
                    <a className="sk-reset-filters link" onClick={toggleSummary}>
                      <Translate content="filterSummary"/>
                    </a>
                   }

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
                }
              </div>
            }
          </div>
        </div>

        <div className={'modal' + (showFilterSummary ? ' is-active' : '')}>
          <div className="modal-background"/>
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title">Filter summary</p>
              <button className="delete" aria-label="close" onClick={toggleSummary}/>
            </div>
            <section className="modal-card-body">
              {filters &&
               <div>
                 <p className="pb-10">The following filters have been applied to your search.</p>
                 <GroupedSelectedFilters/>
                 <p>Select a filter to remove it from this search.</p>
               </div>
              }
              {!filters &&
               <div>
               <p className="pb-10">No additional filters have been applied to your search.</p>
               <p>Select <strong>Close</strong> to dismiss this window.</p>
               </div>
              }
            </section>
            <div className="modal-card-foot">
              <button className="button is-light" onClick={toggleSummary}>Close</button>
            </div>
          </div>
        </div>

        <div className={'modal' + (showAdvancedSearch ? ' is-active' : '')}>
          <div className="modal-background"/>
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title">Advanced search</p>
              <button className="delete" aria-label="close" onClick={toggleAdvancedSearch}/>
            </div>
            <section className="modal-card-body">
              <p className="pb-10">The following special characters can be used to perform advanced search queries:</p>
              <p><span className="tag is-light has-text-weight-semibold">+</span> signifies <strong>AND</strong> operation.</p>
              <p><span className="tag is-light has-text-weight-semibold">|</span> signifies <strong>OR</strong> operation.</p>
              <p><span className="tag is-light has-text-weight-semibold">-</span> <strong>negates</strong> a single token.</p>
              <p><span className="tag is-light has-text-weight-semibold">"</span> wraps a number of tokens to signify a <strong>phrase</strong> for searching.</p>
              <p><span className="tag is-light has-text-weight-semibold">*</span> at the end of a term signifies a <strong>prefix</strong> query.</p>
              <p><span className="tag is-light has-text-weight-semibold">(</span> and <span className="tag is-light has-text-weight-semibold">)</span> signify <strong>precedence</strong>.</p>
              <p><span className="tag is-light has-text-weight-semibold">~N</span> after a word signifies edit <strong>distance</strong> (fuzziness).</p>
              <p><span className="tag is-light has-text-weight-semibold">~N</span> after a phrase signifies <strong>slop</strong> amount.</p>
              <p className="pt-15"><strong>Escaping</strong></p>
              <p>The above characters are reserved. In order to search for any of these special characters, they will need to be escaped with <span className="tag is-light has-text-weight-semibold">\</span>.</p>
              <p className="pt-15"><strong>Default operator</strong></p>
              <p>The default operator when there are no special characters in a given search term is <strong>OR</strong>. For example when searching for <em className="has-text-weight-semibold">Social Science</em>, this will be interpreted as <em className="has-text-weight-semibold">Social</em> <strong>OR</strong> <em className="has-text-weight-semibold">Science</em>.</p>
            </section>
            <div className="modal-card-foot">
              <button className="button is-light" onClick={toggleAdvancedSearch}>Close</button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    code: state.language.code,
    filters: state.search.query.post_filter,
    showFilterSummary: state.search.showFilterSummary,
    showMobileFilters: state.search.showMobileFilters,
    showAdvancedSearch: state.search.showAdvancedSearch
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch),
    resetSearch: bindActionCreators(resetSearch, dispatch),
    toggleSummary: bindActionCreators(toggleSummary, dispatch),
    toggleMobileFilters: bindActionCreators(toggleMobileFilters, dispatch),
    toggleAdvancedSearch: bindActionCreators(toggleAdvancedSearch, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
