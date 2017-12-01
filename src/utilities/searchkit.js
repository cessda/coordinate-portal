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

export const similarQuery = (title: string): Object => {
  return {
    index: 'dc',
    size: 10,
    fields: [
      'dc.title.all',
      'dc.description.all',
      'dc.subject.all',
      'esid'
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

const searchkit: SearchkitManager = new SearchkitManager('/_search');

// Customise searchkit query here.
// searchkit.addDefaultQuery((query) => {
//   return query.addQuery({});
// });

export default searchkit;
