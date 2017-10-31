import {Panel as SearchkitPanel} from 'searchkit';
import PropTypes from 'prop-types';

// Extend the Searchkit Panel component to support translations.
export class Panel extends SearchkitPanel {}

// Override Panel type checking to avoid errors.
Panel.propTypes = Object.assign(SearchkitPanel.propTypes, {
  title: PropTypes.object
});
