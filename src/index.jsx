// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import SearchPage from './containers/SearchPage';
import DetailPage from './containers/DetailPage';
import App from './containers/App';
import {browserHistory, IndexRoute, Redirect, Route, Router} from 'react-router';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'string.prototype.includes';
import './styles/design.scss';
import type {Store} from './types';

const store: Store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory)))
);

const history: Object = syncHistoryWithStore(browserHistory, store);

let root: ?HTMLElement = document.getElementById('root');

if (root instanceof HTMLElement) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={SearchPage}/>
          <Route path="detail" component={DetailPage}/>
          <Redirect from='*' to='/'/>
        </Route>
      </Router>
    </Provider>,
    root
  );
}
