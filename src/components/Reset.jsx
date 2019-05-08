// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {State} from '../types';

type Props = {
  pathname: string,
  bemBlock: Function,
  hasFilters: boolean,
  translate: (string) => string,
  resetFilters: () => void
};

export class Reset extends Component<Props> {
  render(): Node {
    const {
      pathname,
      bemBlock,
      hasFilters,
      translate,
      resetFilters
    } = this.props;

    return (
      <a className={bemBlock().mix('link').state({disabled: pathname !== '/' || !hasFilters})}
         onClick={() => {
           if (pathname === '/' && hasFilters) {
             resetFilters();
           }
         }}>{translate('reset.clear_all')}</a>
    );
  }
}

export const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname
  };
};

export default connect(mapStateToProps, null)(Reset);
