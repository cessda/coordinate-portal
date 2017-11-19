// @flow

import {Panel as SearchkitPanel} from 'searchkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

type Props = {};

// Extend the Searchkit Panel component to support translations.
class Panel extends SearchkitPanel<Props> {}

// Override Panel type checking to avoid errors.
Panel.propTypes = Object.assign(SearchkitPanel.propTypes, {
  title: PropTypes.object
});

export default connect()(Panel);
