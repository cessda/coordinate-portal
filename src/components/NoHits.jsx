// @flow

import {NoHits as SearchkitNoHits} from 'searchkit';
import {connect} from 'react-redux';
import type {State} from '../types';

type Props = {
  code: string
};

// Extend the Searchkit NoHits component to support translations.
class NoHits extends SearchkitNoHits<Props> {}

const mapStateToProps = (state: State): Object => {
  return {
    code: state.language.code
  };
};

export default connect(mapStateToProps, null)(NoHits);
