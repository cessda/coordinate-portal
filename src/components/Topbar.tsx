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
import {ActionBar, ActionBarRow} from 'searchkit';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import SortingSelector from './SortingSelector';
import PageSizeSelector from './PageSizeSelector';

export default class TopBar extends React.Component {

  render() {
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
                label: counterpart.translate('sorting.relevance'),
                key: 'relevance',
                field: '_score',
                order: 'desc',
                defaultOption: true
              }, {
                label: counterpart.translate('sorting.titleAscending'),
                key: 'title-ascending',
                field: 'titleStudy.raw',
                order: 'asc',
                defaultOption: false
              }, {
                label: counterpart.translate('sorting.titleDescending'),
                key: 'title-descending',
                field: 'titleStudy.raw',
                order: 'desc',
                defaultOption: false
              }, {
                label: counterpart.translate('sorting.dateAscending'),
                key: 'date-ascending',
                field: 'dataCollectionPeriodStartdate',
                order: 'asc',
                defaultOption: false
              }, {
                label: counterpart.translate('sorting.dateDescending'),
                key: 'date-descending',
                field: 'dataCollectionPeriodStartdate',
                order: 'desc',
                defaultOption: false
              }]}/>
            </div>
          </div>
        </ActionBarRow>
      </ActionBar>
    );
  }
}
