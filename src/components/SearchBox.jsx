// @flow

import {SearchBox as SearchkitSearchBox} from 'searchkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import type {Dispatch, State} from '../types';

type Props = {
  pathname: string,
  push: (path: string) => void
};

// Extend the Searchkit SearchBox component to redirect on change.
class SearchBox extends SearchkitSearchBox<Props> {
  onChange(event: any): void {
    if (event.target.value.length > 250) {
      return;
    }
    const {pathname, push} = this.props;
    if (pathname !== '/') {
      push('/');
    }
    super.onChange(event);
  }
}

// Override SearchBox type checking to avoid errors.
SearchBox.propTypes = Object.assign(SearchkitSearchBox.propTypes, {
  pathname: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
});

const mapStateToProps = (state: State): Object => {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    push: bindActionCreators(push, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
