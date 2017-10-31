import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import SearchPage from './containers/SearchPage';
import {DetailPage} from './containers/DetailPage';
import {App} from './containers/App';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import reducers from './reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SearchPage}/>
        <Route path="detail" component={DetailPage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
