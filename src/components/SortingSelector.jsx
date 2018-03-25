// @flow

import {SortingSelector as SearchkitSortingSelector} from 'searchkit';
import PropTypes from 'prop-types';
import counterpart from 'counterpart';
import * as _ from 'lodash';
import type {Node} from 'react';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit SortingSelector component to support translations.
class SortingSelector extends SearchkitSortingSelector<Props> {
  hasHits(): boolean {
    // Override behaviour to always return true so that the control is never disabled and hidden.
    return true;
  }

  render(): Node {
    _.map(this.accessor.options.options, (option: Object): Object => {
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

export default connect()(SortingSelector);
