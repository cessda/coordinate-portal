// @flow
// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



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
export class Panel extends SearchkitPanel<Props> {
  componentDidUpdate(prevProps: Props): void {
    if (this.props.linkCollapsedState &&
        this.props.expandMetadataPanels !== prevProps.expandMetadataPanels &&
        this.state.collapsed !== !this.props.expandMetadataPanels) {
      this.toggleCollapsed();
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
      <section className={'sk-panel__container' + (this.state.collapsed ? ' sk-panel__collapsed' : '')}>
        {tooltip && <Tooltip content={tooltip}/>}
        {super.render()}
      </section>
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

export const mapStateToProps = (state: State): Object => {
  return {
    expandMetadataPanels: state.search.expandMetadataPanels
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    toggleMetadataPanels: bindActionCreators(toggleMetadataPanels, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
