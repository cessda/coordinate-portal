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



import {PageSizeSelector as SearchkitPageSizeSelector} from 'searchkit';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit PageSizeSelector component to stay visible at all times.
export class PageSizeSelector extends SearchkitPageSizeSelector<Props> {
  hasHits(): boolean {
    // Override behaviour to always return true so that the control is never disabled and hidden.
    return true;
  }
}

export default connect()(PageSizeSelector);
