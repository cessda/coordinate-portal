// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {ActionBar, ActionBarRow} from 'searchkit';
import Translate from 'react-translate-component';
import {connect} from 'react-redux';
import SortingSelector from './SortingSelector';
import PageSizeSelector from './PageSizeSelector';
import type {State} from '../types';

type Props = {
  code: string
};

export class TopBar extends Component<Props> {
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
                field: 'titleStudy.raw',
                order: 'asc'
              }, {
                translation: 'sorting.titleDescending',
                key: 'title-descending',
                field: 'titleStudy.raw',
                order: 'desc'
              }, {
                translation: 'sorting.dateAscending',
                key: 'date-ascending',
                field: 'dataCollectionPeriodStartdate',
                order: 'asc'
              }, {
                translation: 'sorting.dateDescending',
                key: 'date-descending',
                field: 'dataCollectionPeriodStartdate',
                order: 'desc'
              }]}/>
            </div>
          </div>
        </ActionBarRow>
      </ActionBar>
    );
  }
}

export const mapStateToProps = (state: State): Object => {
  return {
    code: state.language.code
  };
};

export default connect(mapStateToProps, null)(TopBar);
