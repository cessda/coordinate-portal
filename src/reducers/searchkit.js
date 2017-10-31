import {SearchkitManager} from 'searchkit';
import * as utilityComponents from '../utilities/componentUtility';
import counterpart from 'counterpart';

const searchkit = (state = new SearchkitManager('/_search'), action) => {
  switch (action.type) {
    default:
      state.addDefaultQuery((query) => {
        return query.addQuery(
          utilityComponents.CESSDAdefaultQuery
        );
      });

      state.translateFunction = (key) => {
        let translations = {
          'pagination.previous': '<',
          'pagination.next': '>',
          'searchbox.placeholder': counterpart.translate('search'),
          'hitstats.results_found': counterpart.translate('numberOfResults', {
            count: state.getHitsCount()
          })
        };
        return translations[key];
      };

      return state;
  }
};

export default searchkit;
