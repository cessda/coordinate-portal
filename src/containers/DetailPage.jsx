// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {
  Hits, Layout, LayoutBody, LayoutResults, NoHits, SearchkitProvider, SideBar
} from 'searchkit';
import Header from '../components/Header';
import Detail from '../components/Detail';
import Footer from '../components/Footer.jsx';
import searchkit from '../utilities/searchkit';
import Panel from '../components/Panel';
import {connect} from 'react-redux';
import {FaAngleLeft, FaCode, FaExternalLink} from 'react-icons/lib/fa/index';
import {bindActionCreators} from 'redux';
import {changeDataLanguage} from '../actions/language';
import Translate from 'react-translate-component';
import Select from 'react-select';
import Similars from '../components/Similars';
import {goBack, push} from 'react-router-redux';
import * as _ from 'lodash';
import type {Dispatch, State} from '../types';

type Props = {
  item?: Object,
  dataCode: string,
  query: Object,
  push: (path: string) => void,
  goBack: () => void,
  changeDataLanguage: (code: string) => void
};

class DetailPage extends Component<Props> {
  shouldComponentUpdate(props: Props): boolean {
    const {query, item, push} = props;

    if (item !== undefined && (query.q === undefined || _.trim(query.q, '"') !== item.id)) {
      push('/');
      return false;
    }

    return true;
  }

  render(): Node {
    const {item, dataCode, goBack, changeDataLanguage} = this.props;

    let languages = [];
    if (item) {
      for (let i: number = 0; i < item.languages.length; i++) {
        languages.push({
          label: item.languages[i],
          value: item.languages[i].toLowerCase()
        });
      }
    }

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l">
          <Header/>
          <LayoutBody className="columns">
            <SideBar className="is-hidden-mobile column is-4">
              <Panel title="Language"
                     collapsable={true}
                     defaultCollapsed={false}>
                <Select value={dataCode} options={languages} onChange={(o) => {
                  changeDataLanguage(o.value);
                }}/>
              </Panel>
              <Panel title="Similar results"
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
                    onClick={goBack}><FaAngleLeft/><span className="ml-5">Back</span></a>

                 <a className="button is-small is-white is-pulled-right"
                    href={item.sourceUrl}
                    target="_blank">
                   <span className="icon is-small"><FaExternalLink/></span>
                   {item.sourceIsCollection &&
                    <Translate component="span" content="goToCollection"/>
                   }
                   {!item.sourceIsCollection &&
                    <Translate component="span" content="goToStudy"/>
                   }
                 </a>

                 <a className="button is-small is-white is-pulled-right mr-15"
                    href={item.jsonUrl}
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
              <NoHits/>
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
    item: state.search.displayed.length === 1 ? state.search.displayed[0] : undefined,
    dataCode: state.language.dataCode,
    query: state.routing.locationBeforeTransitions.query
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch),
    goBack: bindActionCreators(goBack, dispatch),
    changeDataLanguage: bindActionCreators(changeDataLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
