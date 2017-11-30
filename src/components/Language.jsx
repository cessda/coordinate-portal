// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import * as counterpart from 'react-translate-component';
import Translate from 'react-translate-component';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import {connect} from 'react-redux';
import {changeLanguage} from '../actions/language';
import {bindActionCreators} from 'redux';
import type {Dispatch, State} from '../types';

type Props = {
  code: any,
  list: any,
  changeLanguage: any
};

class Language extends Component<Props> {
  render(): Node {
    return (
      <div className="language-picker">
        <Translate component="label"
                   content="language.label"/>
        <ReactFlagsSelect countries={['GB', 'DE']}
                          customLabels={{
                            'GB': counterpart.translate('language.languages.en'),
                            'DE': counterpart.translate('language.languages.de')
                          }}
                          defaultCountry={this.props.code === 'en' ? 'GB' :
                                          this.props.code.toUpperCase()}
                          onSelect={this.props.changeLanguage}/>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    code: state.language.code,
    list: state.language.list
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    changeLanguage: bindActionCreators(changeLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
