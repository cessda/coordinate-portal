// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch, State} from '../types';
import searchkit from '../utilities/searchkit';
import {push} from 'react-router-redux';
import Translate from 'react-translate-component';

type Props = {
  item: unknown;
  similars?: {
    id: string;
    title: string;
  }[];
  push: (state: {
    [key: string]: any;
  }) => void;
};

export class Similars extends Component<Props> {

  render() {
    const {
      item,
      similars,
      push
    } = this.props;

    let links: JSX.Element[] = [];

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

export const mapStateToProps = (state: State): {
  [key: string]: any;
} => {
  return {
    item: state.search.displayed[0],
    similars: state.search.similars
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): {
  [key: string]: any;
} => {
  return {
    push: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Similars);
