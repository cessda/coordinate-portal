import React from 'react';

export class Reset extends React.Component {
  render() {
    const {bemBlock, hasFilters, translate, resetFilters} = this.props;
    return (
      <a className={bemBlock().mix('link').state({disabled: !hasFilters})}
         onClick={resetFilters}>{translate('reset.clear_all')}</a>
    );
  }
}
