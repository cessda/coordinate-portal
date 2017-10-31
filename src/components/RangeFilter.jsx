import {RangeFilter as SearchkitRangeFilter} from 'searchkit';
import PropTypes from 'prop-types';

// Extend the Searchkit RangeFilter component to support translations.
export class RangeFilter extends SearchkitRangeFilter {}

// Override RangeFilter type checking to avoid errors.
RangeFilter.propTypes = Object.assign(SearchkitRangeFilter.propTypes, {
  title: PropTypes.object
});
