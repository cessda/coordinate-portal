// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import MultiSelect from '../components/MultiSelect.jsx';
import Result from '../components/Result.jsx';
import Footer from '../components/Footer.jsx';
import TopBar from '../components/Topbar';
import Pagination from '../components/Pagination';
import {
  Hits, Layout, LayoutBody, LayoutResults, NoHits, Pagination as SearchkitPagination,
  RangeSliderInput, SearchkitProvider, SideBar
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
  filters: Function | Object,
  results: number
};

class SearchPage extends Component<Props> {
  componentDidUpdate(): void {
    // Auto expand the 'Collection years' filter if it contains selected values.
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
    const {showMobileFilters, filters, results} = this.props;
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l" className={showMobileFilters ? 'show-mobile-filters' : ''}>
          <Header/>
          <LayoutBody className="columns">
            <SideBar className="column is-4">
              <Panel title={counterpart.translate('filters.topic.label')}
                     tooltip={counterpart.translate('filters.topic.tooltip')}
                     className="subject"
                     collapsable={true}
                     defaultCollapsed={true}>
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
                                                      tooltip={counterpart.translate(
                                                        'filters.collectionDates.tooltip')}
                                                      className="anydateYear"
                                                      collapsable={true}
                                                      defaultCollapsed={true}/>}/>

              {/*<Panel title={counterpart.translate('filters.availability.label')}*/}
                     {/*tooltip={counterpart.translate('filters.availability.tooltip')}*/}
                     {/*className="rights"*/}
                     {/*collapsable={true}*/}
                     {/*defaultCollapsed={true}>*/}
                {/*<div className="sk-item-list-option sk-item-list__item">*/}
                  {/*<input type="checkbox"*/}
                         {/*className="sk-item-list-option__checkbox is-disabled"*/}
                         {/*disabled/>*/}
                  {/*<div className="sk-item-list-option__text">Unrestricted</div>*/}
                  {/*<div className="sk-item-list-option__count">0</div>*/}
                {/*</div>*/}
                {/*<div className="sk-item-list-option sk-item-list__item">*/}
                  {/*<input type="checkbox"*/}
                         {/*className="sk-item-list-option__checkbox is-disabled"*/}
                         {/*disabled/>*/}
                  {/*<div className="sk-item-list-option__text">Authentication/registration required</div>*/}
                  {/*<div className="sk-item-list-option__count">0</div>*/}
                {/*</div>*/}
                {/*<div className="sk-item-list-option sk-item-list__item">*/}
                  {/*<input type="checkbox"*/}
                         {/*className="sk-item-list-option__checkbox is-disabled"*/}
                         {/*disabled/>*/}
                  {/*<div className="sk-item-list-option__text">Restricted</div>*/}
                  {/*<div className="sk-item-list-option__count">0</div>*/}
                {/*</div>*/}
              {/*</Panel>*/}

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
                                                               tooltip={counterpart.translate(
                                                                 'filters.country.tooltip')}
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
                                                               tooltip={counterpart.translate(
                                                                 'filters.publisher.tooltip')}
                                                               className="publisher"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.publisher.placeholder')}/>}
                                    size={500}/>

              <RefinementListFilter id="language"
                                    title={counterpart.translate(
                                      'filters.languageOfDataFiles.label')}
                                    field={'dc.language.nn'}
                                    fieldOptions={{type: 'nested', options: {path: 'dc.language'}}}
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate(
                                      'filters.languageOfDataFiles.label')}
                                                               tooltip={counterpart.translate(
                                                                 'filters.languageOfDataFiles.tooltip')}
                                                               className="language"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.languageOfDataFiles.placeholder')}/>}
                                    size={500} orderKey="_term" orderDirection="asc"/>
            </SideBar>
            <LayoutResults className="column is-8">
              <TopBar/>

              <SearchkitPagination pageScope={3}
                                   showLast={true}
                                   showNumbers={true}
                                   listComponent={<Pagination/>}/>

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
    filters: state.search.state,
    results: state.search.displayed.length
  };
};

export default connect(mapStateToProps)(SearchPage);
