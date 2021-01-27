// @flow
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



import {SearchBox as SearchkitSearchBox} from 'searchkit';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import type {State} from '../types';
import {detect} from 'detect-browser';
import * as _ from 'lodash';

type Props = {
  pathname: string,
  push: (path: string) => void,
  query: string
};

// Extend the Searchkit SearchBox component to limit maximum characters and provide redirection.
export class SearchBox extends SearchkitSearchBox<Props> {
  onChange(event: any): void {
    const {
      pathname,
      push,
      query
    } = this.props;

    // Do not process queries with more than 250 characters.
    if (event.target.value.length > 250) {
      return;
    }

    // Redirect from 'detail' page to 'search results' page if users change search query text.
    if (_.trim(pathname, '/') === 'detail') {
      if (detect().name === 'ie') {
        // Workaround for legacy Internet Explorer bug where change event is fired multiple times.
        if (event.target.value !== query) {
          push('/');
        }
      } else {
        push('/');
      }
    }

    super.onChange(event);
  }

  /**
   * Clears the query on the detail page
   */
  getValue(): string {
    if (_.trim(this.props.pathname, '/') === 'detail') {
      return "";
    } else {
      return super.getValue();
    }
  }
}

export const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    query: state.search.state.q
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
