// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

type Props = {
  bemBlock: Function,
  hasFilters: boolean,
  translate: (string) => string,
  resetFilters: () => void
};

class Reset extends Component<Props> {
  render(): Node {
    const {bemBlock, hasFilters, translate, resetFilters} = this.props;
    return (
      <a className={bemBlock().mix('link').state({disabled: !hasFilters})}
         onClick={resetFilters}>{translate('reset.clear_all')}</a>
    );
  }
}

export default connect()(Reset);
