// @flow

import {SearchkitManager} from 'searchkit';

export const queryBuilder = (query: string, options: any): Object => {
  let qob = {};
  qob[options.fullpath] = query;
  return {
    function_score: {
      query: {
        multi_match: {
          query: query,
          type: 'cross_fields',
          fields: [
            '_all'
          ]
        }
      }
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
