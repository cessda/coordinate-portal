
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

import {NoHits as SearchkitNoHits} from 'searchkit';
import {connect} from 'react-redux';
import type {State} from '../types';

type Props = {
  code: string;
};

// Extend the Searchkit NoHits component to support translations.
export class NoHits extends SearchkitNoHits<Props> {}

export const mapStateToProps = (state: State): {
  [key: string]: any;
} => {
  return {
    code: state.language.code
  };
};

export default connect(mapStateToProps, null)(NoHits);
