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
import {connect, Dispatch} from 'react-redux';
import {AnyAction, bindActionCreators} from 'redux';
import type {State} from '../types';
import searchkit from '../utilities/searchkit';
import {push} from 'react-router-redux';
import Translate from 'react-translate-component';
import { CMMStudy } from '../utilities/metadata';

export interface Props {
  item: CMMStudy;
  similars: {
    id: string;
    title: string;
  }[];
  push: typeof push;
}

export class Similars extends Component<Props> {

  render() {
    const {
      item,
      similars    
    } = this.props;

    const links: JSX.Element[] = [];

    if (item && similars) {
      for (let i: number = 0; i < similars.length; i++) {
        links.push(<a key={i} onClick={() => {
          this.props.push({
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

export const mapStateToProps = (state: State) => {
  return {
    item: state.search.displayed[0],
    similars: state.search.similars
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    push: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Similars);
