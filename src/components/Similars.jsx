// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch, State} from '../types';
import searchkit from '../utilities/searchkit';
import {push} from 'react-router-redux';
import Translate from 'react-translate-component';

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

    let links: Node[] = [];

    if (item !== undefined && similars !== undefined) {
      for (let i: number = 0; i < similars.length; i++) {
        links.push(<a key={i} onClick={() => {
          push({
            pathname: 'detail',
            search: '?q="' + similars[i].id + '"'
          });
          searchkit.reloadSearch();

        }}>{similars[i].title}</a>);
      }
    }

    return (
      <div className="similars">
        {links}
        {links.length === 0 &&
         <Translate component="p" content="similarResults.notAvailable"/>
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
