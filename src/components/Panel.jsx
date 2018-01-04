// @flow

import React from 'react';
import {Panel as SearchkitPanel} from 'searchkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Tooltip from './Tooltip';

type Props = {
  tooltip: any
};

// Extend the Searchkit Panel component to support tooltips and translations.
class Panel extends SearchkitPanel<Props> {
  render(): any {
    const {
      tooltip
    } = this.props;

    return (
      <div className={'sk-panel__container' + (this.state.collapsed ? ' sk-panel__collapsed' : '')}>
        {tooltip &&
         <Tooltip content={tooltip}/>
        }
        {super.render()}
      </div>
    );
  }
}

// Override Panel type checking to avoid errors.
Panel.propTypes = Object.assign(SearchkitPanel.propTypes, {
  title: PropTypes.object,
  tooltip: PropTypes.object
});

export default connect()(Panel);
