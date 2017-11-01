import React from 'react';
import {MultiSelect} from '../components/MultiSelect.jsx';
import Result from '../components/Result.jsx';
import {Footer} from '../components/Footer.jsx';
import TopBar from '../components/Topbar';
import {Reset} from '../components/Reset';
import * as utilityComponents from '../utilities/componentUtility';
import {
  HierarchicalRefinementFilter, Hits, Layout, LayoutBody, LayoutResults, NoHits, Pagination,
  RangeSliderInput, ResetFilters, SearchkitManager,
  SearchkitProvider, SideBar
} from 'searchkit';
import moment from 'moment';

import '../css/theme.css';
import '../css/reactselect.css';
import '../css/override.sass';
import '../css/design.scss';
import * as counterpart from 'react-translate-component';
import counterpartString from 'counterpart';
import Header from '../components/Header';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import {Panel} from '../components/Panel';
import {RangeFilter} from '../components/RangeFilter';
import {RefinementListFilter} from '../components/RefinementListFilter';
import searchkit from '../utilities/searchkit';

// got to be set to all!!
let myLang = 'all';

class SearchPage extends React.Component {
  render() {
    let dynlang = this.props.location.query.showlang;
    if (dynlang) {
      myLang = dynlang;
    }

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l" className="root__search">
          <Header/>
          <LayoutBody className="columns">
            <SideBar className="is-hidden-mobile column is-4">
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
                           containerComponent={<Panel title={counterpart.translate('filters.collectionDates.label')}
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
                  <input type="checkbox" className="sk-item-list-option__checkbox is-disabled" disabled/>
                  <div className="sk-item-list-option__text">Open</div>
                  <div className="sk-item-list-option__count">0</div>
                </div>
                <div className="sk-item-list-option sk-item-list__item">
                  <input type="checkbox" className="sk-item-list-option__checkbox is-disabled" disabled/>
                  <div className="sk-item-list-option__text">Restricted</div>
                  <div className="sk-item-list-option__count">0</div>
                </div>
              </Panel>

              <RefinementListFilter id="language"
                                    title={counterpart.translate('filters.languageOfDataFiles.label')}
                                    field={'dc.language.nn'}
                                    fieldOptions={{type: 'nested', options: {path: 'dc.language'}}}
                                    containerComponent={<Panel title={counterpart.translate('filters.languageOfDataFiles.label')}
                                                               className="language"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate('filters.languageOfDataFiles.placeholder')}
                                                                title={this.props.children}/>}
                                    size={500} orderKey="_term" orderDirection="asc"/>

              <RefinementListFilter id="dc.coverage"
                                    title={counterpart.translate('filters.country.label')}
                                    field={'dc.coverage.all'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.coverage', min_doc_count: 1}
                                    }}
                                    containerComponent={<Panel title={counterpart.translate('filters.country.label')}
                                                               className="coverage"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate('filters.country.placeholder')}
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="dc.publisher"
                                    title={counterpart.translate('filters.publisher.label')}
                                    field={'dc.publisher.all10'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.publisher.all10', min_doc_count: 1}
                                    }}
                                    containerComponent={<Panel title={counterpart.translate('filters.publisher.label')}
                                                               className="publisher"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate('filters.publisher.placeholder')}
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="dataProvider"
                                    title={counterpart.translate('filters.publisher.label')}
                                    field="dataProvider"
                                    operator="OR"
                                    containerComponent={<Panel title={counterpart.translate('filters.publisher.label')}
                                                               className="dataProvider"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder={counterpart.translate('filters.publisher.placeholder')}
                                                                title={this.props.children}/>}
                                    size={500}/>
            </SideBar>
            <LayoutResults className="column is-8">
              <TopBar/>

              <Hits className="column"
                    scrollTo={true}
                    mod="sk-hits-list"
                    hitsPerPage={30}
                    itemComponent={Result}
                    key={'hitList'}/>

              <NoHits/>
            </LayoutResults>
          </LayoutBody>
          <div className="dsn-list-pagination">
            <Pagination pageScope={3}
                        showLast={true}
                        showNumbers={true}/>
          </div>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}

SearchPage.propTypes = {
  searchkit: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    searchkit: state.searchkit
  };
};

export default connect(mapStateToProps)(SearchPage);
