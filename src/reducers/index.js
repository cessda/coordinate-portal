// @flow

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import language from './language';
import search from './search';

const reducers = {
  routing: routerReducer,
  language,
  search
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
