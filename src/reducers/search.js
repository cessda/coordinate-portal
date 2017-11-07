import {
  INIT_SEARCHKIT, TOGGLE_SUMMARY, UPDATE_DISPLAYED, UPDATE_QUERY, UPDATE_STATE
} from '../actions/search';

const initialState = {
  showSummary: false,
  displayed: [],
  query: {},
  state: {}
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SEARCHKIT:
      return state;

    case TOGGLE_SUMMARY:
      return Object.assign({}, state, {
        showSummary: !state.showSummary
      });

    case UPDATE_DISPLAYED:
      return Object.assign({}, state, {
        displayed: action.displayed
      });

    case UPDATE_QUERY:
      return Object.assign({}, state, {
        query: action.query
      });

    case UPDATE_STATE:
      return Object.assign({}, state, {
        state: action.state
      });

    default:
      return state;
  }
};

export default search;
