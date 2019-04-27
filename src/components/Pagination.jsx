// @flow

import type {Node} from 'react';
import React from 'react';
import {FaChevronLeft, FaChevronRight, FaEllipsisH} from 'react-icons/lib/fa/index';
import {connect} from 'react-redux';
import {AbstractItemList} from 'searchkit';

type Props = {
  items: {
    key: string | number,
    label: string,
    page: number
  }[],
  selectedItems: number[],
  setItems: (number[]) => void
};

class Pagination extends AbstractItemList<Props> {
  render(): Node {
    const {items, selectedItems, setItems} = this.props;
    let links = [];

    for (let i: number = 0; i < items.length; i++) {
      if (i === 0 || i === items.length - 1) {
        continue;
      }
      if (items[i].label === '...') {
        links.push(<li key={items[i].key}>
          <span className="pagination-ellipsis"><FaEllipsisH/></span>
        </li>);
      } else {
        let current = items[i].page === selectedItems[0] ? ' is-current' : '';
        links.push(<li key={items[i].key}>
          <a className={'pagination-link' + current}
             href={'/?p=' + items[i].page}
             onClick={(e) => {e.preventDefault(); setItems([items[i].page]);}}>{items[i].label}</a>
        </li>);
      }
    }

    return (
      <nav className="pagination is-centered is-small" role="navigation" aria-label="pagination">
        <a className="pagination-previous"
           href={'/?p=' + items[0].page}
           onClick={(e) => {e.preventDefault(); setItems([items[0].page]);}}>
          <FaChevronLeft/>
        </a>
        <a className="pagination-next"
           href={'/?p=' + items[items.length - 1].page}
           onClick={(e) => {e.preventDefault(); setItems([items[items.length - 1].page]);}}>
          <FaChevronRight/>
        </a>
        <ul className="pagination-list">
          {links}
        </ul>
      </nav>
    );
  }
}

export default connect()(Pagination);
