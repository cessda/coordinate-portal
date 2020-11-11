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
import {FaQuestionCircle} from 'react-icons/lib/fa/index';
import counterpart from 'counterpart';

type Props = {
  content: any
};

export class Tooltip extends Component<Props> {
  render(): Node {
    const {
      content
    } = this.props;

    return (
      <div className="dropdown is-hoverable is-right">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true">
            <FaQuestionCircle/>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <p dangerouslySetInnerHTML={{__html: counterpart.translate(content.props.content)}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Tooltip);
