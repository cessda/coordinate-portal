// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import Translate from 'react-translate-component';
import {connect} from 'react-redux';
import {changeLanguage} from '../actions/language';
import {bindActionCreators} from 'redux';
import type {Dispatch, State} from '../types';
import Select from 'react-select';

type Props = {
  code: string,
  list: {
    code: string,
    label: string,
    index: string
  }[],
  changeLanguage: any
};

class Language extends Component<Props> {
  render(): Node {
    const {
      code,
      list,
      changeLanguage
    } = this.props;

    let countries: {
      label: string,
      value: string
    }[] = [];
    for (let i: number = 0; i < list.length; i++) {
      countries.push({
        label: list[i].label,
        value: list[i].code
      });
    }

    return (
      <div className="language-picker">
        <Translate component="label"
                   content="language.label"/>
        <Select value={code}
                options={countries}
                searchable={false}
                clearable={false}
                autosize={true}
                onChange={(option) => changeLanguage(option.value)}/>
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
