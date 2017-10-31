import React from 'react';
import {HitsStats, ResetFilters, SearchBox} from 'searchkit';
import * as utilityComponents from '../utilities/componentUtility';
import Language from './Language';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import counterpart from 'counterpart';
import {Reset} from './Reset';

class Header extends React.Component {
  componentDidMount() {
    $('.nav-toggle').on('click', function () {
      if (!$('.nav .nav-toggle').hasClass('is-active')) {
        $('.nav .nav-toggle').addClass('is-active');
        $('.nav .nav-menu').addClass('is-active');
      } else {
        $('.nav .nav-toggle').removeClass('is-active');
        $('.nav .nav-menu').removeClass('is-active');
      }
    });
  }

  render() {
    return (
      <header className="container is-fluid is-fullwidth">
        <div className="cessda_top">
          <div className="container">
            <Language/>
          </div>
        </div>
        <nav className="nav">
          <span className="nav-toggle">
            <i className="fa fa-search" aria-hidden="true"/>
          </span>

          <div className="nav-left">
            <div className="nav-item">
              <div className="cessda"><a href="/">cessda</a></div>
              <div className="cessda_beta">Products and Services Catalogue</div>
              <span className="cessda_beta--blue">Beta Version</span>
            </div>
          </div>

          <div className="nav-right nav-menu">
            <div className="nav-item">
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={['_all^1']}
                queryFields={['_all']}
                queryBuilder={utilityComponents.functionCESSDAQueryBuilder}/>

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
        </nav>
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
