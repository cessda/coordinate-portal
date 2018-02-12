// @flow

import {PageSizeSelector as SearchkitPageSizeSelector} from 'searchkit';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit PageSizeSelector component to stay visible at all times.
class PageSizeSelector extends SearchkitPageSizeSelector<Props> {
  hasHits(): boolean {
    // Override behaviour to always return true so that the control is never disabled and hidden.
    return true;
  }
}

export default connect()(PageSizeSelector);
