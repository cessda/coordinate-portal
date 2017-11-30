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
import * as ReactGA from 'react-ga';
import './styles/design.scss';
import type {Store} from './types';

if (process.env.PASC_DEBUG_MODE) {
  console.warn('PaSC debug mode is enabled. Disable for production use.');
}

if (process.env.PASC_ANALYTICS_ID !== null) {
  ReactGA.initialize(process.env.PASC_ANALYTICS_ID, {
    debug: process.env.PASC_DEBUG_MODE === 'true'
  });
}

const store: Store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory)))
);

const history: Object = syncHistoryWithStore(browserHistory, store);

history.listen((location: Object): void => {
  ReactGA.pageview(location.pathname + location.search);
});

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
