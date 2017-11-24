// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {HitsStats, ResetFilters} from 'searchkit';
import Language from './Language';
import {connect} from 'react-redux';
import counterpart from 'counterpart';
import Reset from './Reset';
import {queryBuilder} from '../utilities/searchkit';
import SearchBox from './SearchBox';
import type {State} from '../types';
import {bindActionCreators} from 'redux';
import {resetSearch} from '../actions/search';
import {push} from 'react-router-redux';

type Props = {
  pathname: string,
  code: string,
  push: (path: string) => void,
  resetSearch: () => void
};

class Header extends Component<Props> {
  render(): Node {
    const {pathname, push, resetSearch} = this.props;
    return (
      <header>
        <div className="cessda_top">
          <div className="container">
            <Language/>
          </div>
        </div>

        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="logo">
                <div className="cessda"><a onClick={() => {
                  push('/');
                  resetSearch();
                }}>cessda</a></div>
                <div className="cessda_beta">Products and Services Catalogue</div>
                <span className="cessda_beta--blue">Beta Version</span>
              </div>
            </div>
            <div className="column">
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={['_all^1']}
                queryFields={['_all']}
                queryBuilder={queryBuilder}/>

              {pathname === '/' &&
               <div className="reset-search">
                 <HitsStats className="hits-count"/>

                 <ResetFilters component={Reset}
                               options={{query: false, filter: true, pagination: true}}
                               translations={{
                                 'reset.clear_all': counterpart.translate('reset.filters')
                               }}/>
                 <ResetFilters component={Reset}
                               options={{query: true, filter: false, pagination: true}}
                               translations={{
                                 'reset.clear_all': counterpart.translate('reset.query')
                               }}/>
               </div>
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    code: state.language.code
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch),
    resetSearch: bindActionCreators(resetSearch, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
