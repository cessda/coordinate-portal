// @flow

import {SearchBox as SearchkitSearchBox} from 'searchkit';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit SearchBox component to limit maximum characters.
class SearchBox extends SearchkitSearchBox<Props> {
  onChange(event: any): void {
    if (event.target.value.length > 250) {
      return;
    }
    super.onChange(event);
  }
}

export default connect(null, null)(SearchBox);
