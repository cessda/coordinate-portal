// @flow

import React from 'react';
import { Panel as SearchkitPanel } from 'searchkit';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from './Tooltip';
import type { Dispatch, State } from '../types';
import { bindActionCreators } from 'redux';
import { toggleMetadataPanels } from '../actions/search';

type Props = {
  tooltip: any,
  linkCollapsedState: boolean,
  expandMetadataPanels: boolean,
  toggleMetadataPanels: () => void
};

// Extend the Searchkit Panel component to support tooltips and translations.
class Panel extends SearchkitPanel<Props> {
  componentDidUpdate(prevProps: Props): void {
    if (this.props.linkCollapsedState &&
        this.props.expandMetadataPanels !== prevProps.expandMetadataPanels) {
      if (this.state.collapsed !== !this.props.expandMetadataPanels) {
        this.toggleCollapsed();
      }
    }
  }

  toggleCollapsed(): void {
    super.toggleCollapsed();
    if (this.props.linkCollapsedState &&
        this.state.collapsed !== this.props.expandMetadataPanels) {
      this.props.toggleMetadataPanels();
    }
  }

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
  tooltip: PropTypes.object,
  linkCollapsedState: PropTypes.bool,
  expandMetadataPanels: PropTypes.bool,
  toggleMetadataPanels: PropTypes.func
});

const mapStateToProps = (state: State): Object => {
  return {
    expandMetadataPanels: state.search.expandMetadataPanels
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    toggleMetadataPanels: bindActionCreators(toggleMetadataPanels, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
