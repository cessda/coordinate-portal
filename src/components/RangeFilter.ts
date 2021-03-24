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

import {RangeFilter as SearchkitRangeFilter} from 'searchkit';
import PropTypes from 'prop-types';

// Extend the Searchkit RangeFilter component to support translations.
export default class RangeFilter extends SearchkitRangeFilter {}

// Override RangeFilter type checking to avoid errors.
RangeFilter.propTypes = Object.assign(SearchkitRangeFilter.propTypes, {
  title: PropTypes.object,
});
