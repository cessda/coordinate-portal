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
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
// @ts-ignore
import config from '../webpack.dev.config.js';
import path from 'path';
import { checkEnvironmentVariables, startListening } from './helper';

export function start() {
    checkEnvironmentVariables(false);

    const app = express();
    const compiler = webpack(config);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // @ts-expect-error - incorrect typings
    app.use(webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      index: 'src',
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

    startListening(app, (_req, res) => {
      res.setHeader('Cache-Control', 'no-store');
      res.render('index');
    });
};
