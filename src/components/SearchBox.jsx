// @flow

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
class SearchBox extends SearchkitSearchBox<Props> {
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
}

const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
    query: state.search.state.q
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
