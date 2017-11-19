// @flow

import {RangeFilter as SearchkitRangeFilter} from 'searchkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit RangeFilter component to support translations.
class RangeFilter extends SearchkitRangeFilter<Props> {}

// Override RangeFilter type checking to avoid errors.
RangeFilter.propTypes = Object.assign(SearchkitRangeFilter.propTypes, {
  title: PropTypes.object
});

export default connect()(RangeFilter);
