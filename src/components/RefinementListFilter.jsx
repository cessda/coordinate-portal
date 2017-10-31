import {RefinementListFilter as SearchkitRefinementListFilter} from 'searchkit';
import PropTypes from 'prop-types';

// Extend the Searchkit RefinementListFilter component to support translations.
export class RefinementListFilter extends SearchkitRefinementListFilter {}

// Override RefinementListFilter type checking to avoid errors.
RefinementListFilter.propTypes = Object.assign(SearchkitRefinementListFilter.propTypes, {
  title: PropTypes.object
});
