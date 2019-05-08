// @flow

import type { Node } from 'react';
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
import Translate, * as counterpart from 'react-translate-component';
import Similars from '../components/Similars';
import { goBack } from 'react-router-redux';
import type { Dispatch, State } from '../types';
import * as _ from 'lodash';

type Props = {
  loading: boolean,
  item?: Object,
  jsonLd?: Object,
  code: string,
  list: {
    code: string,
    label: string,
    index: string
  }[],
  query: Object,
  goBack: () => void
};

export class DetailPage extends Component<Props> {
  render(): Node {
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
              <Panel title={counterpart.translate('similarResults.heading')}
                     collapsable={true}
                     defaultCollapsed={false}>
                <Similars/>
              </Panel>
            </SideBar>
            <LayoutResults className="column is-8">
              {item &&
               <div className="panel">
                 <a className="button is-small is-white is-pulled-left"
                    onClick={goBack}>
                   <FaAngleLeft/><span className="ml-5"><Translate content="back"/></span>
                 </a>

                 {item.studyUrl &&
                  <a className="button is-small is-white is-pulled-right"
                     href={item.studyUrl}
                     target="_blank">
                    <span className="icon is-small"><FaExternalLink/></span>
                    <Translate component="span" content="goToStudy"/>
                  </a>
                 }

                 <a className="button is-small is-white is-pulled-right mr-15"
                    href={'/api/json/' + index + '/' + encodeURIComponent(item.id)}
                    target="_blank">
                  <span className="icon is-small">
                    <FaCode/>
                  </span>
                   <Translate component="span" content="viewJson"/>
                 </a>

                 <div className="is-clearfix"/>
               </div>
              }
              <Hits mod="sk-hits-grid" hitsPerPage={1} itemComponent={<Detail/>}/>
              {!loading && !item &&
               <div className="panel pt-15">
                 <p className="fs-14 mb-15"><Translate component="strong"
                                                       content="language.notAvailable.heading"/></p>
                 <p className="fs-14 mb-15"><Translate content="language.notAvailable.content"/></p>
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

export const mapStateToProps = (state: State): Object => {
  return {
    loading: state.search.loading,
    item: state.search.displayed.length === 1 ? state.search.displayed[0] : undefined,
    jsonLd: state.search.jsonLd,
    code: state.language.code,
    list: state.language.list,
    query: state.routing.locationBeforeTransitions.query
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    goBack: bindActionCreators(goBack, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
