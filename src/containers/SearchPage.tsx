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
import Translate from 'react-translate-component';
import Header from '../components/Header';
import {connect} from 'react-redux';
import Panel from '../components/Panel';
import RangeFilter from '../components/RangeFilter';
import RefinementListFilter from '../components/RefinementListFilter';
import NoHits from '../components/NoHits';
import searchkit from '../utilities/searchkit';
import _ from 'lodash';
import $ from 'jquery';
import type {State} from '../types';
import moment from 'moment';

type Props = {
  showMobileFilters: boolean;
  filters: ((...args: Array<any>) => any) | {
    [key: string]: any;
  };
  results: number;
};

export class SearchPage extends Component<Props> {

  componentDidUpdate(): void {
    // Auto expand filters if they contain selected values.
    this.autoExpandFilter('classifications.term');
    this.autoExpandFilter('dataCollectionYear');
    this.autoExpandFilter('studyAreaCountries.country');
    this.autoExpandFilter('publisher.publisher');
  }

  autoExpandFilter(filterName: string): void {
    let filter = $(`.filter--${filterName.replace('.', '\\.')} > .is-collapsed`);
    if (!filter.data('expanded') && !_.isEmpty(this.props.filters[filterName])) {
      filter.data('expanded', true).trigger("click");
    }
  }

  render() {
    const {
      showMobileFilters
    } = this.props;
    const customHighlight = {
      "fields": {
        "titleStudy": { "number_of_fragments": 0 },
        "abstract": { "number_of_fragments": 0 }
      }
    };
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l" className={showMobileFilters ? 'show-mobile-filters' : ''}>
          <Header/>
          <LayoutBody className="columns">
            <SideBar className="column is-4">
              <RefinementListFilter id="classifications.term"
                                    title={<Translate content='filters.topic.label'/>}
                                    field={'classifications.term'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'classifications', min_doc_count: 1}
                                    }}
                                    orderKey="_term"
                                    orderDirection="asc"
                                    operator="OR"
                                    containerComponent={<Panel title={<Translate content='filters.topic.label'/>}
                                                               tooltip={<Translate content="filters.topic.tooltip" unsafe/>}
                                                               className="classifications"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={<Translate content='filters.topic.placeholder'/>}/>}
                                    size={2700}/>

              <RangeFilter min={1900}
                           max={moment().year()}
                           field="dataCollectionYear"
                           id="dataCollectionYear"
                           title={<Translate content='filters.collectionDates.label'/>}
                           rangeComponent={RangeSliderInput}
                           containerComponent={<Panel title={<Translate content='filters.collectionDates.label'/>}
                                                      tooltip={<Translate content='filters.collectionDates.tooltip'/>}
                                                      className="dataCollectionYear"
                                                      collapsable={true}
                                                      defaultCollapsed={true}/>}/>

              <RefinementListFilter id="studyAreaCountries.searchField"
                                    title={<Translate content='filters.country.label'/>}
                                    field={'studyAreaCountries.searchField'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'studyAreaCountries', min_doc_count: 1}
                                    }}
                                    orderKey="_term"
                                    orderDirection="asc"
                                    operator="OR"
                                    containerComponent={<Panel title={<Translate content='filters.country.label'/>}
                                                               tooltip={<Translate content='filters.country.tooltip'/>}
                                                               className="studyAreaCountries"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={<Translate content='filters.country.placeholder'/>}/>}
                                    size={500}/>

              <RefinementListFilter id="publisher.publisher"
                                    title={<Translate content='filters.publisher.label'/>}
                                    field={'publisher.publisher'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'publisher', min_doc_count: 1}
                                    }}
                                    orderKey="_term"
                                    orderDirection="asc"
                                    operator="OR"
                                    containerComponent={<Panel title={<Translate content='filters.publisher.label'/>}
                                                               tooltip={<Translate content='filters.publisher.tooltip'/>}
                                                               className="publisher"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={<Translate content='filters.publisher.placeholder'/>}/>}
                                    size={500}/>

              {/* <RefinementListFilter id="fileLanguages"
                                    title={<Translate content='filters.languageOfDataFiles.label'/>}
                                    field={'fileLanguages'}
                                    orderKey="_term"
                                    orderDirection="asc"
                                    operator="OR"
                                    containerComponent={<Panel title={<Translate content='filters.languageOfDataFiles.label'/>}
                                                               tooltip={<Translate content='filters.languageOfDataFiles.tooltip'/>}
                                                               className="language"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={<Translate content='filters.languageOfDataFiles.placeholder'/>}/>}
                                    size={500}/> */}
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
                    customHighlight={customHighlight}
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

export const mapStateToProps = (state: State): {
  [key: string]: any;
} => {
  return {
    showMobileFilters: state.search.showMobileFilters,
    filters: state.search.state,
    results: state.search.displayed.length
  };
};

export default connect(mapStateToProps)(SearchPage);
