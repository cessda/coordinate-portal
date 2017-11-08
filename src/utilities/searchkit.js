import {SearchkitManager} from 'searchkit';

export const queryBuilder = (query, options) => {
  let qob = {};
  qob[options.fullpath] = query;
  return {
    'function_score': {
      'query': {
        'multi_match': {
          'query': query,
          'type': 'cross_fields',
          'fields': [
            '_all'
          ]
        }
      }
    }
  };
};

const searchkit = new SearchkitManager('/_search');

// Customise searchkit query here.
// searchkit.addDefaultQuery((query) => {
//   return query.addQuery({});
// });

export default searchkit;
