// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch, State} from '../types';
import searchkit from '../utilities/searchkit';
import {push} from 'react-router-redux';

type Props = {
  item: mixed,
  similars?: {
    id: string,
    title: string
  }[],
  push: (state: Object) => void
};

class Similars extends Component<Props> {
  render(): Node {
    const {item, similars, push} = this.props;

    if (item === undefined || similars === undefined) {
      return null;
    }

    let links: Node[] = [];
    for (let i: number = 0; i < similars.length; i++) {
      links.push(<a key={i} onClick={() => {
        push({
          pathname: 'detail',
          search: '?q="' + similars[i].id + '"'
        });
        searchkit.reloadSearch();

      }}>{similars[i].title}</a>);
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
    push: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Similars);
