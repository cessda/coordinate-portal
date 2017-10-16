import React from 'react';

export class Reset extends React.Component {
  render() {
    const {bemBlock, hasFilters, translate, resetFilters} = this.props;
    return (
      <div onClick={resetFilters} className={bemBlock().state({disabled: !hasFilters})}>
        <div className={bemBlock('reset')}>Reset</div>
      </div>
    );
  }
}
