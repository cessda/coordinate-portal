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



import {RefinementListFilter as SearchkitRefinementListFilter} from 'searchkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit RefinementListFilter component to support translations.
export class RefinementListFilter extends SearchkitRefinementListFilter<Props> {}

// Override RefinementListFilter type checking to avoid errors.
RefinementListFilter.propTypes = Object.assign(SearchkitRefinementListFilter.propTypes, {
  title: PropTypes.string
});

export default connect()(RefinementListFilter);
