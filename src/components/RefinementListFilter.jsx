// @flow

import {RefinementListFilter as SearchkitRefinementListFilter} from 'searchkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit RefinementListFilter component to support translations.
export class RefinementListFilter extends SearchkitRefinementListFilter<Props> {}

// Override RefinementListFilter type checking to avoid errors.
RefinementListFilter.propTypes = Object.assign(SearchkitRefinementListFilter.propTypes, {
  title: PropTypes.object
});

export default connect()(RefinementListFilter);
