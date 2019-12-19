// @flow
// Copyright CESSDA ERIC 2017-2019
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import SearchPage from './containers/SearchPage';
import DetailPage from './containers/DetailPage';
import App from './containers/App';
import { browserHistory, IndexRoute, Redirect, Route, Router } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { detect } from 'detect-browser';
import './styles/design.scss';
import type { Store } from './types';

if (process.env.PASC_DEBUG_MODE === 'true') {
  console.warn('Data Catalogue debug mode is enabled. Disable for production use.');
}

if (process.env.PASC_ENABLE_ANALYTICS === 'true') {
  // Initialise Matomo Analytics.
  let _paq = window._paq || [];
  let url = '//analytics.cessda.eu/';

  _paq.push(['setTrackerUrl', url + 'matomo.php']);
  _paq.push(['setSiteId', '2']);

  let element = document.createElement('script'),
    script = document.getElementsByTagName('script')[0];

  element.type = 'text/javascript';
  element.async = true;
  element.defer = true;
  element.src = url + 'matomo.js';

  if (script.parentNode) {
    script.parentNode.insertBefore(element, script);
  }

  window._paq = _paq;
}

const store: Store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory)))
);

const history: Object = syncHistoryWithStore(browserHistory, store);

history.listen((location: Object): void => {
  if (process.env.PASC_ENABLE_ANALYTICS === 'true') {
    // Notify Matomo Analytics of page change.
    let _paq = window._paq || [];
    _paq.push(['setReferrerUrl', location.pathname + location.search]);
    _paq.push(['setCustomUrl', location.pathname + location.search]);
    _paq.push(['setDocumentTitle', 'CESSDA Data Catalogue']);

    // Remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
    _paq.push(['deleteCustomVariables', 'page']);
    _paq.push(['setGenerationTimeMs', 0]);
    _paq.push(['trackPageView']);

    // Make Matomo aware of newly added content
    let content = document.getElementById('root');
    _paq.push(['MediaAnalytics::scanForMedia', content]);
    _paq.push(['FormAnalytics::scanForForms', content]);
    _paq.push(['trackContentImpressionsWithinNode', content]);
    _paq.push(['enableLinkTracking']);
  }
});

let root: ?HTMLElement = document.getElementById('root');

if (root instanceof HTMLElement) {
  if (document.documentElement instanceof HTMLElement && detect().name === 'ie') {
    document.documentElement.classList.add('legacy-browser');
  }
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={App}>
          <IndexRoute component={SearchPage}/>
          <Route path="detail" component={DetailPage}/>
          <Redirect from="*" to="/"/>
        </Route>
      </Router>
    </Provider>,
    root
  );
}
