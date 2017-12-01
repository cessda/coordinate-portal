// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import MultiSelect from '../components/MultiSelect.jsx';
import Result from '../components/Result.jsx';
import Footer from '../components/Footer.jsx';
import TopBar from '../components/Topbar';
import Pagination from '../components/Pagination';
import {
  GroupedSelectedFilters, Hits, Layout, LayoutBody, LayoutResults, NoHits,
  Pagination as SearchkitPagination, RangeSliderInput, SearchkitProvider, SideBar
} from 'searchkit';
import moment from 'moment';
import * as counterpart from 'react-translate-component';
import Translate from 'react-translate-component';
import Header from '../components/Header';
import {connect} from 'react-redux';
import Panel from '../components/Panel';
import RangeFilter from '../components/RangeFilter';
import RefinementListFilter from '../components/RefinementListFilter';
import searchkit, {highlight} from '../utilities/searchkit';
import * as _ from 'lodash';
import * as $ from 'jquery';
import type {State} from '../types';

type Props = {
  showMobileFilters: boolean,
  showSummary: boolean,
  filters: Function | Object,
  results: number
};

class SearchPage extends Component<Props> {
  componentDidUpdate(): void {
    // Auto expand the 'Collection dates' filter if it contains selected values.
    let anyDateYearFilter = $('.filter--anydateYear > .is-collapsed');
    if (!anyDateYearFilter.data('expanded') && !_.isEmpty(this.props.filters['anydateYear'])) {
      anyDateYearFilter.data('expanded', true).click();
    }

    // Auto expand the 'Language of data files' filter if it contains selected values.
    let languageOfDataFilesFilter = $('.filter--language > .is-collapsed');
    if (!languageOfDataFilesFilter.data('expanded') && !_.isEmpty(this.props.filters['language'])) {
      languageOfDataFilesFilter.data('expanded', true).click();
    }

    // Auto expand the 'Country' filter if it contains selected values.
    let countryFilter = $('.filter--dc\\.coverage > .is-collapsed');
    if (!countryFilter.data('expanded') && !_.isEmpty(this.props.filters['dc.coverage'])) {
      countryFilter.data('expanded', true).click();
    }
  }

  render(): Node {
    const {showMobileFilters, results} = this.props;
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l" className={showMobileFilters ? 'show-mobile-filters' : ''}>
          <Header/>
          <LayoutBody className={'columns' + (results === 0 ? ' no-results' : '')}>
            <SideBar className="column is-4">
              <Panel title={counterpart.translate('filters.topic.label')}
                     className="subject"
                     collapsable={true}
                     defaultCollapsed={true}>
                {/*<HierarchicalRefinementFilter id="dc.subject"
                 title={counterpart.translate('filters.topic.label')}
                 field="dc.subject"/>*/}
                <Translate component="p"
                           content="forthcoming"/>
              </Panel>

              <RangeFilter min={1950}
                           max={moment().year()}
                           field="anydateYear"
                           id="anydateYear"
                           title={counterpart.translate('filters.collectionDates.label')}
                           rangeComponent={RangeSliderInput}
                           containerComponent={<Panel title={counterpart.translate(
                             'filters.collectionDates.label')}
                                                      className="anydateYear"
                                                      collapsable={true}
                                                      defaultCollapsed={true}/>}/>

              {/*<RefinementListFilter id="rights"
               title={counterpart.translate('filters.availability.label')}
               field={'dc.rights.all'}
               fieldOptions={{type: 'nested', options: {path: 'dc.rights'}}}
               containerComponent={<Panel title={counterpart.translate('filters.availability.label')}
               className="rights"
               collapsable={true}
               defaultCollapsed={true}/>}
               size={5} orderKey="_term" orderDirection="asc"/>*/}

              <Panel title={counterpart.translate('filters.availability.label')}
                     className="rights"
                     collapsable={true}
                     defaultCollapsed={true}>
                <div className="sk-item-list-option sk-item-list__item">
                  <input type="checkbox"
                         className="sk-item-list-option__checkbox is-disabled"
                         disabled/>
                  <div className="sk-item-list-option__text">Open</div>
                  <div className="sk-item-list-option__count">0</div>
                </div>
                <div className="sk-item-list-option sk-item-list__item">
                  <input type="checkbox"
                         className="sk-item-list-option__checkbox is-disabled"
                         disabled/>
                  <div className="sk-item-list-option__text">Restricted</div>
                  <div className="sk-item-list-option__count">0</div>
                </div>
              </Panel>

              <RefinementListFilter id="language"
                                    title={counterpart.translate(
                                      'filters.languageOfDataFiles.label')}
                                    field={'dc.language.nn'}
                                    fieldOptions={{type: 'nested', options: {path: 'dc.language'}}}
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate(
                                      'filters.languageOfDataFiles.label')}
                                                               className="language"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.languageOfDataFiles.placeholder')}/>}
                                    size={500} orderKey="_term" orderDirection="asc"/>

              <RefinementListFilter id="dc.coverage"
                                    title={counterpart.translate('filters.country.label')}
                                    field={'dc.coverage.all'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.coverage', min_doc_count: 1}
                                    }}
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate(
                                      'filters.country.label')}
                                                               className="coverage"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.country.placeholder')}/>}
                                    size={500}/>

              <RefinementListFilter id="dc.publisher"
                                    title={counterpart.translate('filters.publisher.label')}
                                    field={'dc.publisher.all'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.publisher.all', min_doc_count: 1}
                                    }}
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate(
                                      'filters.publisher.label')}
                                                               className="publisher"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.publisher.placeholder')}/>}
                                    size={500}/>

              {/*<RefinementListFilter id="dataProvider"*/}
              {/*title={counterpart.translate('filters.publisher.label')}*/}
              {/*field="dataProvider"*/}
              {/*operator="OR"*/}
              {/*containerComponent={<Panel title={counterpart.translate('filters.publisher.label')}*/}
              {/*className="dataProvider"*/}
              {/*collapsable={true}*/}
              {/*defaultCollapsed={true}/>}*/}
              {/*listComponent={<MultiSelect placeholder={counterpart.translate('filters.publisher.placeholder')}*/}
              {/*title={this.props.children}/>}*/}
              {/*size={500}/>*/}
            </SideBar>
            <LayoutResults className="column is-8">
              {this.props.showSummary &&
               <div className="is-hidden-touch">
                 <GroupedSelectedFilters/>
               </div>
              }

              <TopBar/>

              <Hits scrollTo={true}
                    mod="sk-hits-list"
                    hitsPerPage={30}
                    itemComponent={Result}
                    customHighlight={highlight()}
                    key={'hitList'}/>

              <NoHits mod="is-size-6 sk-no-hits"/>

              <SearchkitPagination pageScope={3}
                                   showLast={true}
                                   showNumbers={true}
                                   listComponent={<Pagination/>}/>
            </LayoutResults>
          </LayoutBody>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    showMobileFilters: state.search.showMobileFilters,
    showSummary: state.search.showSummary,
    filters: state.search.state,
    results: state.search.displayed.length
  };
};

export default connect(mapStateToProps)(SearchPage);
