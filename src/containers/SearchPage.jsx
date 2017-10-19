import React from 'react';
import {MultiSelect} from '../components/MultiSelect.jsx';
import {Result} from '../components/Result.jsx';
import {Footer} from '../components/Footer.jsx';
import {Header} from '../components/Header.jsx';
import {TopBar} from '../components/Topbar.jsx';
import {Reset} from '../components/Reset';
import * as utilityComponents from '../utilities/componentUtility';
import {
  HierarchicalRefinementFilter, Hits, Layout, LayoutBody, LayoutResults, NoHits, Pagination, Panel,
  RangeFilter, RangeSliderInput, RefinementListFilter, ResetFilters, SearchkitManager,
  SearchkitProvider, SideBar
} from 'searchkit';

require('../css/theme.css');
require('../css/reactselect.css');
require('../css/override.sass');
require('../css/design.scss');

/* CESSDA default query to reduce result set to be CESSDA specific */
const searchkit = new SearchkitManager('/_search');
searchkit.addDefaultQuery((query) => {
  return query.addQuery(
    utilityComponents.CESSDAdefaultQuery
  );
});

// got to be set to all!!
let myLang = 'all';

export class SearchPage extends React.Component {
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
            <SideBar className="is-hidden-mobile column is-3 is-offset-2">
              <h3 className="dsn-list-narrow">Filter results</h3>

              <ResetFilters component={Reset}
                            options={{query: false, filter: true, pagination: true}}/><br/>

              <RangeFilter min={1950}
                           max={2017}
                           field="anydateYear"
                           id="anydateYear"
                           title="Date"
                           rangeComponent={RangeSliderInput}
                           containerComponent={<Panel title="Date"
                                                      className="anydateYear"
                                                      collapsable={true}
                                                      defaultCollapsed={true}/>}/>

              <RefinementListFilter id="language"
                                    title="Language"
                                    field={'dc.language.nn'}
                                    fieldOptions={{type: 'nested', options: {path: 'dc.language'}}}
                                    containerComponent={<Panel title="Language"
                                                               className="language"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search languages"
                                                                title={this.props.children}/>}
                                    size={500} orderKey="_term" orderDirection="asc"/>

              <Panel title="Topic"
                     className="subject"
                     collapsable={true}
                     defaultCollapsed={true}>
                {/*<HierarchicalRefinementFilter id="dc.subject"
                                              title="Topic"
                                              field="dc.subject"/>*/}
                <p>This filter will be available in a future release.</p>
              </Panel>

              <RefinementListFilter id="dc.type"
                                    title="Type"
                                    field={'dc.type.' + myLang}
                                    fieldOptions={{type: 'nested', options: {path: 'dc.type'}}}
                                    containerComponent={<Panel title="Type"
                                                               className="type"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search types"
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="dc.creator"
                                    title="Creator"
                                    translations={{'placeholder': 'Show more coverage terms'}}
                                    field={'dc.creator.all'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.creator', min_doc_count: 1}
                                    }}
                                    containerComponent={<Panel title="Creator"
                                                               className="creator"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search creators"
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="dc.contributor"
                                    title="Contributor"
                                    field={'dc.contributor.all'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.contributor', min_doc_count: 1}
                                    }}
                                    containerComponent={<Panel title="Contributor"
                                                               className="contributor"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search contributors"
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="dc.coverage"
                                    title="Country"
                                    field={'dc.coverage.all'}
                                    fieldOptions={{
                                      type: 'nested',
                                      options: {path: 'dc.coverage', min_doc_count: 1}
                                    }}
                                    containerComponent={<Panel title="Country"
                                                               className="coverage"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search countries"
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="metaDataProvider"
                                    title="Metadata provider"
                                    field="metaDataProvider"
                                    operator="OR"
                                    containerComponent={<Panel title="Metadata provider"
                                                               className="metaDataProvider"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={
                                      <MultiSelect placeholder="Search metadata providers"
                                                   title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="dataProvider"
                                    title="Data provider"
                                    field="dataProvider"
                                    operator="OR"
                                    containerComponent={<Panel title="Data provider"
                                                               className="dataProvider"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search data providers"
                                                                title={this.props.children}/>}
                                    size={500}/>

              <RefinementListFilter id="setHuman"
                                    title="Set "
                                    field="setHuman"
                                    operator="OR"
                                    containerComponent={<Panel title="Set"
                                                               className="setHuman"
                                                               collapsable={true}
                                                               defaultCollapsed={true}/>}
                                    listComponent={<MultiSelect placeholder="Search sets"
                                                                backspaceRemoves={false}
                                                                title={this.props.children}/>}
                                    size={500}/>
            </SideBar>
            <LayoutResults className="column is-6">
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
                        showNumbers={true}
                        translations={{'pagination.previous': '<', 'pagination.next': '>'}}/>
          </div>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}
