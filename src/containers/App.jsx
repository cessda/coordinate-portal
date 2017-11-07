import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {initSearchkit} from '../actions/search';
import {initTranslations} from '../actions/language';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.initSearchkit();
    props.initTranslations();
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  initSearchkit: PropTypes.func.isRequired,
  initTranslations: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    initSearchkit: bindActionCreators(initSearchkit, dispatch),
    initTranslations: bindActionCreators(initTranslations, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
