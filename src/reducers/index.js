import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import language from './language';
import searchkit from './searchkit';

const reducers = combineReducers({
  routing: routerReducer,
  language: language,
  searchkit: searchkit
});

export default reducers;
