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
import {FaAngleLeft, FaCode, FaExternalLink, FaLanguage} from 'react-icons/lib/fa/index';
import {bindActionCreators} from 'redux';
import Translate from 'react-translate-component';
import Similars from '../components/Similars';
import {goBack} from 'react-router-redux';
import type {Dispatch, State} from '../types';
import {OutboundLink} from 'react-ga';
import {changeLanguage} from '../actions/language';

type Props = {
  item?: Object,
  code: string,
  missing: boolean,
  query: Object,
  goBack: () => void,
  changeLanguage: (code: string) => void
};

class DetailPage extends Component<Props> {
  render(): Node {
    const {item, code, missing, goBack, changeLanguage} = this.props;

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
              {missing &&
               <Panel title="Language"
                      collapsable={true}
                      defaultCollapsed={false}>
                 <span className="fs-14">A user interface translation is not available in your selected language. Displaying text in <strong>English</strong>.</span>
               </Panel>
              }
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

                 <OutboundLink className="button is-small is-white is-pulled-right"
                               eventLabel="Go to Collection/Study"
                               to={item.sourceUrl}
                               target="_blank">
                   <span className="icon is-small"><FaExternalLink/></span>
                   {item.sourceIsCollection &&
                    <Translate component="span" content="goToCollection"/>
                   }
                   {!item.sourceIsCollection &&
                    <Translate component="span" content="goToStudy"/>
                   }
                 </OutboundLink>

                 <OutboundLink className="button is-small is-white is-pulled-right mr-15"
                               eventLabel="View JSON"
                               to={item.jsonUrl}
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
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    item: state.search.displayed.length === 1 ? state.search.displayed[0] : undefined,
    code: state.language.code,
    missing: state.language.missing,
    query: state.routing.locationBeforeTransitions.query
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    goBack: bindActionCreators(goBack, dispatch),
    changeLanguage: bindActionCreators(changeLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
