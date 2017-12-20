// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {ActionBar, ActionBarRow, PageSizeSelector} from 'searchkit';
import {connect} from 'react-redux';
import Translate from 'react-translate-component';
import SortingSelector from './SortingSelector';
import type {State} from '../types';

type Props = {
  code: string
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
              }, {
                disabled: true,
                translation: 'sorting.dateAscending',
                key: 'date-ascending',
                field: '_score',
                order: 'asc'
              }, {
                disabled: true,
                translation: 'sorting.dateDescending',
                key: 'date-descending',
                field: '_score',
                order: 'desc'
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
    code: state.language.code
  };
};

export default connect(mapStateToProps, null)(TopBar);
