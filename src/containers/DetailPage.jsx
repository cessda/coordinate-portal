// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {Hits, Layout, LayoutBody, LayoutResults, SearchkitProvider, SideBar} from 'searchkit';
import Header from '../components/Header';
import Detail from '../components/Detail';
import Footer from '../components/Footer.jsx';
import searchkit from '../utilities/searchkit';
import Panel from '../components/Panel';
import {connect} from 'react-redux';
import {FaAngleLeft, FaCode, FaExternalLink} from 'react-icons/lib/fa/index';
import {bindActionCreators} from 'redux';
import Translate, * as counterpart from 'react-translate-component';
import Similars from '../components/Similars';
import NoHits from '../components/NoHits';
import {goBack} from 'react-router-redux';
import type {Dispatch, State} from '../types';
import {OutboundLink} from 'react-ga';
import * as _ from 'lodash';

type Props = {
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

class DetailPage extends Component<Props> {
  render(): Node {
    const {item, jsonLd, code, list, goBack} = this.props;

    // Get the Elasticsearch index for the current language. Used to pass index to View JSON link.
    let index: string = (_.find(list, {'code': code}) || {}).index;

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l">
          <Header/>
          <LayoutBody className="columns">
            <SideBar className="is-hidden-mobile column is-4">
              <Panel title={counterpart.translate('similarResults')}
                     collapsable={true}
                     defaultCollapsed={false}>
                {item &&
                 <Similars/>
                }
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
                  <OutboundLink className="button is-small is-white is-pulled-right"
                                eventLabel="Go to study"
                                to={item.studyUrl}
                                target="_blank">
                    <span className="icon is-small"><FaExternalLink/></span>
                    <Translate component="span" content="goToStudy"/>
                  </OutboundLink>
                 }

                 <OutboundLink className="button is-small is-white is-pulled-right mr-15"
                               eventLabel="View JSON"
                               to={'/api/json/' + index + '/' + item.id}
                               target="_blank">
                  <span className="icon is-small">
                    <FaCode/>
                  </span>
                   <Translate component="span" content="viewJson"/>
                 </OutboundLink>

                 <div className="is-clearfix"/>
               </div>
              }
              <Hits mod="sk-hits-grid" hitsPerPage={1} itemComponent={<Detail/>}/>
              <NoHits/>
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

const mapStateToProps = (state: State): Object => {
  return {
    item: state.search.displayed.length === 1 ? state.search.displayed[0] : undefined,
    jsonLd: state.search.jsonLd,
    code: state.language.code,
    list: state.language.list,
    query: state.routing.locationBeforeTransitions.query
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    goBack: bindActionCreators(goBack, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
