import React from 'react';
import ReactDOM from 'react-dom';
import {SearchPage} from './containers/SearchPage';
import {DetailPage} from './containers/DetailPage';
import {App} from './containers/App';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SearchPage}/>
      <Route path="detail" component={DetailPage}/>
    </Route>
  </Router>
), document.getElementById('root'));
