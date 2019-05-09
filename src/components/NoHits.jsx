// @flow

import {NoHits as SearchkitNoHits} from 'searchkit';
import {connect} from 'react-redux';
import type {State} from '../types';

type Props = {
  code: string
};

// Extend the Searchkit NoHits component to support translations.
export class NoHits extends SearchkitNoHits<Props> {}

export const mapStateToProps = (state: State): Object => {
  return {
    code: state.language.code
  };
};

export default connect(mapStateToProps, null)(NoHits);
