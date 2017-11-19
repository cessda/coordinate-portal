// @flow

import type {ChildrenArray, Node} from 'react';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initSearchkit} from '../actions/search';
import {initTranslations} from '../actions/language';
import type {Dispatch} from '../types';

type Props = {
  initSearchkit: () => void,
  initTranslations: () => void,
  children: ChildrenArray<Node>
};

class App extends Component<Props> {
  constructor(props: Props): void {
    super(props);
    props.initSearchkit();
    props.initTranslations();
  }

  render(): Node {
    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    initSearchkit: bindActionCreators(initSearchkit, dispatch),
    initTranslations: bindActionCreators(initTranslations, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(App);
