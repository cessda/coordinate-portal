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
                <span className="cessda-pasc"><Translate content="application"/></span>
              </div>
            </div>
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
                   <Translate content="advancedSearch.label"/>
                 </a>

                 {filters &&
                  <a className="sk-reset-filters link" onClick={toggleSummary}>
                    <Translate content="filters.summary.label"/>
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
          </div>
        </div>

        <div className={'modal' + (showFilterSummary ? ' is-active' : '')}>
          <div className="modal-background"/>
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title"><Translate content="filters.summary.label"/></p>
              <button className="delete" aria-label="close" onClick={toggleSummary}/>
            </div>
            <section className="modal-card-body">
              {filters &&
               <div>
                 <p className="pb-10"><Translate content="filters.summary.introduction"/></p>
                 <GroupedSelectedFilters/>
                 <p><Translate content="filters.summary.remove"/></p>
               </div>
              }
              {!filters &&
               <div>
               <p className="pb-10"><Translate content="filters.summary.noFilters"/></p>
               <p><Translate content="filters.summary.close" unsafe/></p>
               </div>
              }
            </section>
            <div className="modal-card-foot">
              <button className="button is-light" onClick={toggleSummary}><Translate content="close"/></button>
            </div>
          </div>
        </div>

        <div className={'modal' + (showAdvancedSearch ? ' is-active' : '')}>
          <div className="modal-background"/>
          <div className="modal-card">
            <div className="modal-card-head">
              <p className="modal-card-title"><Translate content="advancedSearch.label"/></p>
              <button className="delete" aria-label="close" onClick={toggleAdvancedSearch}/>
            </div>
            <section className="modal-card-body">
              <p className="pb-10"><Translate content="advancedSearch.introduction"/></p>
              <p><Translate content="advancedSearch.and" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.or" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.negates" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.phrase" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.prefix" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.precedence" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.distance" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p><Translate content="advancedSearch.slop" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p className="pt-15"><strong><Translate content="advancedSearch.escaping.heading" unsafe/></strong></p>
              <p><Translate content="advancedSearch.escaping.content" with={{ className: "tag is-light has-text-weight-semibold" }} unsafe/></p>
              <p className="pt-15"><strong><Translate content="advancedSearch.defaultOperator.heading" unsafe/></strong></p>
              <p><Translate content="advancedSearch.defaultOperator.content" with={{ className: "has-text-weight-semibold" }} unsafe/></p>
            </section>
            <div className="modal-card-foot">
              <button className="button is-light" onClick={toggleAdvancedSearch}><Translate content="close"/></button>
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
