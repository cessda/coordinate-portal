// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateSimilars} from '../actions/search';
import type {Dispatch, State} from '../types';

type Props = {
  item: mixed,
  similars?: {
    id: string,
    title: string
  }[],
  updateSimilars: (item: mixed) => mixed
};

class Similars extends Component<Props> {
  componentDidMount(): void {
    const {item, updateSimilars} = this.props;
    updateSimilars(item);
  }

  render(): Node {
    const {item, similars} = this.props;

    if (item === undefined || similars === undefined) {
      return null;
    }

    let links: Node[] = [];
    for (let i: number = 0; i < similars.length; i++) {
      links.push(<a key={i} href={'/detail?q="' + similars[i].id + '"'}>{similars[i].title}</a>);
    }

    return (
      <div className="similars">
        {links}
        {links.length === 0 &&
         <p>No similar results found.</p>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    item: state.search.displayed[0],
    similars: state.search.similars
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    updateSimilars: bindActionCreators(updateSimilars, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Similars);
