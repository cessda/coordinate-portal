import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {initTranslations} from '../actions/language';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.initTranslations();
  }

  render() {
    return this.props.children;
  }
}

App.propTypes = {
  initTranslations: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    initTranslations: bindActionCreators(initTranslations, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
