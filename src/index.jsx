import * as React from "react";
import * as ReactDOM from "react-dom";
import {SearchFields} from "./SearchFields";
import {Start} from "./Start";
import {SearchPageDCText} from "./SearchPageDCText";
import {DetailPageDC} from "./DetailPageDC";
import {App} from "./AppPage";
import {Router, Link, Route, browserHistory, IndexRoute } from 'react-router';

const Home = () => {
  return (
    <div>
    <Link to="searchfields">Go to search per field</Link><br/>
    <Link to="search">Go to faceted search</Link><br/>
    <Link to="Start">Go to Start</Link>
    </div>
  )
}

ReactDOM.render((
<Router history={browserHistory} >
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="start" component={Start}/>
    <Route path="search" component={SearchPageDCText}/>
    <Route path="searchfields" component={SearchFields} />
    <Route path="detail" component={DetailPageDC} />
  </Route>
</Router>
), document.getElementById('root'));
