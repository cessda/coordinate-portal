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
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../webpack.dev.config.js');
const path = require('path');
const helper = require('./helper');

module.exports = {
  start: function () {
    helper.checkEnvironmentVariables();

    const app = express();
    const compiler = webpack(config);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));

    app.use(webpackHotMiddleware(compiler));

    app.use('/api/sk', helper.getSearchkitRouter());

    app.use('/api/json', helper.jsonProxy);

    app.get('*', function (req, res) {
      res.setHeader('Cache-Control', 'no-store');
      res.render('index');
    });

    helper.startListening(app);
  }
};
