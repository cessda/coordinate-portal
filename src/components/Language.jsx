import React from 'react';
import * as counterpart from 'react-translate-component';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import {connect} from 'react-redux';
import {changeLanguage} from '../actions/language';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

class Language extends React.Component {
  render() {
    return (
      <div className="language-picker">
        <label>{this.props.label}:</label>
        <ReactFlagsSelect countries={['GB', 'DE']}
                          customLabels={{
                            'GB': counterpart.translate('languagePicker.languages.en'),
                            'DE': counterpart.translate('languagePicker.languages.de')
                          }}
                          defaultCountry={this.props.code === 'en' ? 'GB' :
                                          this.props.code.toUpperCase()}
                          onSelect={this.props.changeLanguage}/>
      </div>
    );
  }
}

Language.propTypes = {
  code: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.object.isRequired
  })),
  changeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    code: state.language.code,
    label: state.language.label,
    list: state.language.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: bindActionCreators(changeLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
