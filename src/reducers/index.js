import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import language from './language';
import search from './search';

const reducers = combineReducers({
  routing: routerReducer,
  language: language,
  search: search
});

export default reducers;
