import React from 'react';
import {HitsStats, ResetFilters, SearchBox} from 'searchkit';
import Language from './Language';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import counterpart from 'counterpart';
import {Reset} from './Reset';
import {queryBuilder} from '../utilities/searchkit';

class Header extends React.Component {
  render() {
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
                <div className="cessda"><a href="/">cessda</a></div>
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
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  code: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    code: state.language.code
  };
};

export default connect(mapStateToProps)(Header);
