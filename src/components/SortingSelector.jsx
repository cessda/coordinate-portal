import {SortingSelector as SearchkitSortingSelector} from 'searchkit';
import PropTypes from 'prop-types';
import counterpart from 'counterpart';
import * as _ from 'lodash';

// Extend the Searchkit SortingSelector component to support translations.
export class SortingSelector extends SearchkitSortingSelector {
  render() {
    _.map(this.accessor.options.options, function (option) {
      option.label = counterpart.translate(option.translation);
      return option;
    });
    return super.render();
  }
}

// Override SortingSelector type checking to avoid errors.
SortingSelector.propTypes = Object.assign(SearchkitSortingSelector.propTypes, {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      translation: PropTypes.string.isRequired,
      label: PropTypes.string,
      field: PropTypes.string,
      order: PropTypes.string,
      defaultOption: PropTypes.bool
    })
  )
});
