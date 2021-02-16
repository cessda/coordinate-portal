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

import React, { Component } from 'react';
import { Hits, Layout, LayoutBody, LayoutResults, SearchkitProvider, SideBar } from 'searchkit';
import Header from '../components/Header';
import Language from '../components/Language';
import Detail from '../components/Detail';
import Footer from '../components/Footer.jsx';
import searchkit from '../utilities/searchkit';
import Panel from '../components/Panel';
import { connect } from 'react-redux';
import { FaAngleLeft, FaCode, FaExternalLink } from 'react-icons/lib/fa/index';
import { bindActionCreators } from 'redux';
import Translate from 'react-translate-component';
import Similars from '../components/Similars';
import { goBack } from 'react-router-redux';
import type { Dispatch, State } from '../types';
import _ from 'lodash';

type Props = {
  loading: boolean;
  item?: {
    [key: string]: any;
  };
  jsonLd?: {
    [key: string]: any;
  };
  code: string;
  list: {
    code: string;
    label: string;
    index: string;
  }[];
  query: {
    [key: string]: any;
  };
  goBack: () => void;
};

export class DetailPage extends Component<Props> {

  render() {
    const {
      loading,
      item,
      jsonLd,
      code,
      list,
      goBack
    } = this.props;

    // Get the Elasticsearch index for the current language. Used to pass index to View JSON link.
    let index: string = (_.find(list, { 'code': code }) || {}).index;

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l">
          <Header/>
          <LayoutBody className="columns">
            <SideBar className="is-hidden-mobile column is-4">
              <Panel title={<Translate content='similarResults.heading'/>}
                     collapsable={true}
                     defaultCollapsed={false}>
                <Similars/>
              </Panel>
            </SideBar>
            <LayoutResults className="column is-8">
              {item &&
               <div className="panel">
                 <a className="button is-small is-white is-pulled-left" onClick={goBack}>
                   <FaAngleLeft/><Translate className="ml-5" content="back"/>
                 </a>

                 {item.studyUrl &&
                  <a className="button is-small is-white is-pulled-right"
                     href={item.studyUrl}
                     rel="noreferrer"
                     target="_blank">
                    <span className="icon is-small"><FaExternalLink/></span>
                    <Translate content="goToStudy"/>
                  </a>
                 }

                 <a className="button is-small is-white is-pulled-right mr-15"
                    href={'/api/json/' + index + '/' + encodeURIComponent(item.id)}
                    rel="noreferrer"
                    target="_blank">
                  <span className="icon is-small"><FaCode/></span>
                  <Translate content="viewJson"/>
                 </a>

                 <div className="is-clearfix"/>
               </div>
              }
              <Hits mod="sk-hits-grid" hitsPerPage={1} itemComponent={<Detail/>}/>
              {!loading && !item &&
               <div className="panel pt-15">
                  <p className="fs-14 mb-15">
                    <Translate component="strong" content="language.notAvailable.heading"/>
                  </p>
                 <Translate component="p" className="fs-14 mb-15" content="language.notAvailable.content"/>
                 <Language/>
               </div>
              }
            </LayoutResults>
          </LayoutBody>
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
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
    loading: state.search.loading,
    item: state.search.displayed.length === 1 ? state.search.displayed[0] : undefined,
    jsonLd: state.search.jsonLd,
    code: state.language.code,
    list: state.language.list,
    query: state.routing.locationBeforeTransitions.query
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): {
  [key: string]: any;
} => {
  return {
    goBack: bindActionCreators(goBack, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
