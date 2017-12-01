// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {ActionBar, ActionBarRow, PageSizeSelector} from 'searchkit';
import {connect} from 'react-redux';
import Translate from 'react-translate-component';
import SortingSelector from './SortingSelector';
import {bindActionCreators} from 'redux';
import {toggleSummary} from '../actions/search';
import type {Dispatch, State} from '../types';

type Props = {
  code: string,
  showSummary: boolean,
  filters?: Object,
  toggleSummary: () => void
};

class TopBar extends Component<Props> {
  render(): Node {
    return (
      <ActionBar>
        <ActionBarRow>
          <div className="level is-mobile">
            <div className="level-left">
              <Translate className="level-item"
                         component="label"
                         content="resultsPerPage"/>

              <PageSizeSelector className="level-item" options={[10, 30, 50, 150]}/>
            </div>

            {this.props.filters &&
             <div className="level-item is-hidden-touch">
               <button type="button"
                       className="button is-small is-white"
                       onClick={this.props.toggleSummary}>
                 {this.props.showSummary && <Translate content="hideFilterSummary"/>}
                 {!this.props.showSummary && <Translate content="showFilterSummary"/>}
               </button>
             </div>
            }

            <div className="level-right">
              <Translate className="level-item"
                         component="label"
                         content="sortBy"/>

              <SortingSelector className="level-item" options={[{
                translation: 'sorting.relevance',
                key: 'relevance',
                field: '_score',
                order: 'desc',
                defaultOption: true
              }, {
                translation: 'sorting.titleAscending',
                key: 'title-ascending',
                fields: [{
                  field: 'dc.title.all',
                  options: {
                    nested_path: 'dc.title',
                    mode: 'min',
                    order: 'asc'
                  }
                }]
              }, {
                translation: 'sorting.titleDescending',
                key: 'title-descending',
                fields: [{
                  field: 'dc.title.all',
                  options: {
                    nested_path: 'dc.title',
                    mode: 'min',
                    order: 'desc'
                  }
                }]
              }]}/>
            </div>
          </div>
        </ActionBarRow>
      </ActionBar>
    );
  }
}

const mapStateToProps = (state: State): Object => {
  return {
    code: state.language.code,
    showSummary: state.search.showSummary,
    filters: state.search.query.post_filter
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    toggleSummary: bindActionCreators(toggleSummary, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
