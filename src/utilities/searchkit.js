// @flow

import {BoolShould, FilteredQuery, SearchkitManager, TermQuery} from 'searchkit';

// Query builder used to create the query going to Elasticsearch (for search page).
export const queryBuilder = (query: string, options: any): Object => {
  let qob = {};
  qob[options.fullpath] = query;
  return {
    simple_query_string: {
      query: query
      // Can limit to searching specific fields if required. Weightings can also be added.
      // fields: [
      //   'titleStudy',
      //   'abstract',
      // ]
    }
  };
};

// Query used to retrieve a single record by its ID (for detail page).
export const detailQuery = (id: string): Object => {
  return {
    bool: {
      must: {
        match: {
          id: id
        }
      }
    }
  };
};

// Query used to retrieve similar records for a specific title (for detail page).
export const similarQuery = (title: string): Object => {
  return {
    bool: {
      must: {
        match: {
          titleStudy: title
        }
      }
    }
  };
};

// Define a single searchkit manager instance to power the application.
const searchkit: SearchkitManager = new SearchkitManager('/api/sk');

// Customise default Elasticsearch query here.
searchkit.addDefaultQuery((query) => {
  // Filter results to only return active study records.
  return query.addQuery(FilteredQuery({
    filter: BoolShould([
      TermQuery('isActive', true)
    ])
  }));
});

export default searchkit;
