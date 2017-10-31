import {
  RenderComponentPropType, SearchkitComponent, SortingSelector as SearchkitSortingSelector
} from 'searchkit';
import PropTypes from 'prop-types';
import counterpart from 'counterpart';
import * as _ from 'lodash';
import {defaults} from 'lodash';

export class SortingSelector extends SearchkitSortingSelector {
  render() {
    // Extend the Searchkit SortingSelector component to support translations.
    _.map(this.accessor.options.options, function (option) {
      option.label = counterpart.translate(option.translation);
      return option;
    });
    return super.render();
  }
}

SortingSelector.propTypes = defaults({
  listComponent: RenderComponentPropType,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      translation: PropTypes.string.isRequired,
      label: PropTypes.string,
      field: PropTypes.string,
      order: PropTypes.string,
      defaultOption: PropTypes.bool
    })
  )
}, SearchkitComponent.propTypes);
