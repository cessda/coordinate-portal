// Copyright CESSDA ERIC 2017-2021
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
const compression = require('compression');
const methodOverride = require('method-override');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helper = require('./helper');

module.exports = {
  start: function () {
    helper.checkBuildDirectory();
    helper.checkEnvironmentVariables(true);

    let app = express();

    // Disable the x-powered-by HTTP header
    app.disable("x-powered-by");

    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use('/api/sk', helper.getSearchkitRouter());

    app.use('/api/json', helper.jsonProxy);

    app.use('/static', express.static(path.join(__dirname, '../dist')));

    app.get('*', function (req, res) {
      res.sendFile(path.join(path.join(__dirname, '../dist'), 'index.html'));
    });

    helper.startListening(app);
  }
};
