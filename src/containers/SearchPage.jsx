// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import MultiSelect from '../components/MultiSelect.jsx';
import Result from '../components/Result.jsx';
import Footer from '../components/Footer.jsx';
import TopBar from '../components/Topbar';
import Pagination from '../components/Pagination';
import {
  Hits, Layout, LayoutBody, LayoutResults, Pagination as SearchkitPagination, RangeSliderInput,
  SearchkitProvider, SideBar
} from 'searchkit';
import * as counterpart from 'react-translate-component';
import Header from '../components/Header';
import {connect} from 'react-redux';
import Panel from '../components/Panel';
import RangeFilter from '../components/RangeFilter';
import RefinementListFilter from '../components/RefinementListFilter';
import NoHits from '../components/NoHits';
import searchkit from '../utilities/searchkit';
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
    // Auto expand the 'Topics' filter if it contains selected values.
    let topicsFilter = $('.filter--keywords\\.term > .is-collapsed');
    if (!topicsFilter.data('expanded') &&
        !_.isEmpty(this.props.filters['keywords.term'])) {
      topicsFilter.data('expanded', true).click();
    }

    // Auto expand the 'Collection years' filter if it contains selected values.
    let collectionYearsFilter = $('.filter--dataCollectionPeriodStartdate > .is-collapsed');
    if (!collectionYearsFilter.data('expanded') &&
        !_.isEmpty(this.props.filters['dataCollectionPeriodStartdate'])) {
      collectionYearsFilter.data('expanded', true).click();
    }

    // Auto expand the 'Country' filter if it contains selected values.
    let countryFilter = $('.filter--studyAreaCountries\\.country > .is-collapsed');
    if (!countryFilter.data('expanded') &&
        !_.isEmpty(this.props.filters['studyAreaCountries.country'])) {
      countryFilter.data('expanded', true).click();
    }

    // Auto expand the 'Publisher' filter if it contains selected values.
    let publisherFilter = $('.filter--publisher\\.publisher > .is-collapsed');
    if (!publisherFilter.data('expanded') &&
        !_.isEmpty(this.props.filters['publisher.publisher'])) {
      publisherFilter.data('expanded', true).click();
    }

    // Auto expand the 'Language of data files' filter if it contains selected values.
    let languageOfDataFilesFilter = $('.filter--fileLanguages > .is-collapsed');
    if (!languageOfDataFilesFilter.data('expanded') &&
        !_.isEmpty(this.props.filters['fileLanguages'])) {
      languageOfDataFilesFilter.data('expanded', true).click();
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
              <RefinementListFilter id="keywords.term"
                                    title={counterpart.translate('filters.topic.label')}
                                    field={'keywords.term'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'keywords', min_doc_count: 1}
                                    }}
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate(
                                      'filters.topic.label')}
                                                               tooltip={counterpart.translate(
                                                                 'filters.topic.tooltip')}
                                                               className="keywords"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.topic.placeholder')}/>}
                                    size={500}/>

              {/*<RangeFilter field="dataCollectionPeriodStartdate"
                           id="dataCollectionPeriodStartdate"
                           title={counterpart.translate('filters.collectionDates.label')}
                           rangeComponent={RangeSliderInput}
                           containerComponent={<Panel title={counterpart.translate(
                             'filters.collectionDates.label')}
                                                      tooltip={counterpart.translate(
                                                        'filters.collectionDates.tooltip')}
                                                      className="dataCollectionPeriodStartdate"
                                                      collapsable={true}
                                                      defaultCollapsed={true}/>}/>*/}

              <RefinementListFilter id="studyAreaCountries.country"
                                    title={counterpart.translate('filters.country.label')}
                                    field={'studyAreaCountries.country'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'studyAreaCountries', min_doc_count: 1}
                                    }}
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate(
                                      'filters.country.label')}
                                                               tooltip={counterpart.translate(
                                                                 'filters.country.tooltip')}
                                                               className="studyAreaCountries"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate(
                                      'filters.country.placeholder')}/>}
                                    size={500}/>

              <RefinementListFilter id="publisher.publisher"
                                    title={counterpart.translate('filters.publisher.label')}
                                    field={'publisher.publisher'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'publisher', min_doc_count: 1}
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

              <RefinementListFilter id="fileLanguages"
                                    title={counterpart.translate(
                                      'filters.languageOfDataFiles.label')}
                                    field={'fileLanguages'}
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
                                    size={500}/>
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
