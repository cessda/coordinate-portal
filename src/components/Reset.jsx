// @flow
// Copyright CESSDA ERIC 2017-2019
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
