// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import * as counterpart from 'react-translate-component';
import Translate from 'react-translate-component';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import {connect} from 'react-redux';
import {changeUiLanguage} from '../actions/language';
import {bindActionCreators} from 'redux';
import type {Dispatch, State} from '../types';

type Props = {
  uiCode: any,
  list: any,
  changeUiLanguage: any
};

class Language extends Component<Props> {
  render(): Node {
    return (
      <div className="language-picker">
        <Translate component="label"
                   content="language.label"/>
        <ReactFlagsSelect countries={['GB', 'DE', 'NO']}
                          customLabels={{
                            'GB': counterpart.translate('language.languages.en'),
                            'DE': counterpart.translate('language.languages.de'),
                            'NO': counterpart.translate('language.languages.nn')
                          }}
                          defaultCountry={this.props.uiCode === 'en' ? 'GB' :
                                          this.props.uiCode.toUpperCase()}
                          onSelect={this.props.changeUiLanguage}/>
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    uiCode: state.language.uiCode,
    list: state.language.list
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    changeUiLanguage: bindActionCreators(changeUiLanguage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
