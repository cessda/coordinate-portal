import searchkit from '../utilities/searchkit';

export const INIT_SEARCHKIT = 'INIT_SEARCHKIT';

export const initSearchkit = () => {
  return dispatch => {
    searchkit.addResultsListener((results) => {
      dispatch(updateDisplayed(results.hits.hits));
    });

    searchkit.setQueryProcessor((query) => {
      dispatch(updateQuery(query));
      dispatch(updateState(searchkit.state));
      return query;
    });

    dispatch({
      type: INIT_SEARCHKIT
    });
  };
};

export const TOGGLE_SUMMARY = 'TOGGLE_SUMMARY';

export const toggleSummary = () => {
  return {
    type: TOGGLE_SUMMARY
  };
};

export const UPDATE_DISPLAYED = 'UPDATE_DISPLAYED';

export const updateDisplayed = displayed => {
  return {
    type: UPDATE_DISPLAYED,
    displayed
  };
};

export const UPDATE_QUERY = 'UPDATE_QUERY';

export const updateQuery = query => {
  return {
    type: UPDATE_QUERY,
    query
  };
};

export const UPDATE_STATE = 'UPDATE_STATE';

export const updateState = state => {
  return {
    type: UPDATE_STATE,
    state
  };
};
