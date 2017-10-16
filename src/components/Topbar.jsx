import React from 'react';
import {ActionBar, ActionBarRow, HitsStats, PageSizeSelector, SortingSelector} from 'searchkit';

export class TopBar extends React.Component {
  render() {
    return (
      <ActionBar>
        <ActionBarRow>
          <HitsStats translations={{
            'hitstats.results_found': '{hitCount} results found'
          }}/>
          <div className="level">
            <label className="level-left sk-hits-stats__info">Results</label>
            <PageSizeSelector className="level-right mr-10" options={[10, 30, 50, 150]}/>
            <label className="level-left sk-hits-stats__info">Sort by</label>
            <SortingSelector className="level-right" options={[
              {label: 'Relevance', field: '_score', order: 'desc', defaultOption: true},
              {label: 'Latest', field: 'oaiDatestamp', order: 'desc'},
              {label: 'First', field: 'oaiDatestamp', order: 'asc'}
            ]}/>
          </div>
        </ActionBarRow>
      </ActionBar>
    );
  }
}
