// @flow

import {SearchkitManager} from 'searchkit';

export const queryBuilder = (query: string, options: any): Object => {
  let qob = {};
  qob[options.fullpath] = query;
  return {
    simple_query_string: {
      query: query,
      fields: [
        'dc.title.all^8',
        'dc.description.all^5',
        'dc.subject.all^3',
        '_all'
      ]
    }
  };
};

export const highlight = (): Object => {
  return {
    fields: {
      'dc.title.all': {},
      'dc.description.all': {}
    }
  };
};

// Query used to retrieve a single record by its ID (for detail page).
export const detailQuery = (id: string): Object => {
  return {
    bool: {
      must: {
        match: {
          _id: id
        }
      }
    }
  };
};

// Query used to retrieve similar records for a specific title (for detail page).
export const similarQuery = (title: string): Object => {
  return {
    index: 'dc',
    size: 10,
    fields: [
      'dc.title.all',
      'dc.description.all',
      'dc.subject.all'
    ],
    body: {
      query: {
        filtered: {
          query: {
            match: {
              _all: title
            }
          }
        }
      }
    }
  };
};

const searchkit: SearchkitManager = new SearchkitManager('/api/sk');

// Customise searchkit query here.
// searchkit.addDefaultQuery((query) => {
//   return query.addQuery({});
// });

export default searchkit;
