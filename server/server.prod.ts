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
import compression from 'compression';
import methodOverride from 'method-override';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { checkBuildDirectory, checkEnvironmentVariables, externalApiV1, getSearchkitRouter, jsonProxy, startListening } from './helper';

export function start () {
    checkBuildDirectory();
    checkEnvironmentVariables(true);

    const app = express();

    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use('/api/sk', getSearchkitRouter());

    app.use('/api/json', jsonProxy());

    app.use('/api/DataSets/v1', externalApiV1());

    app.use('/static', express.static(path.join(__dirname, '../dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(path.join(__dirname, '../dist'), 'index.html'));
    });

    startListening(app);
};
