import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import language from './language';

const reducers = combineReducers({
  routing: routerReducer,
  language: language
});

export default reducers;
