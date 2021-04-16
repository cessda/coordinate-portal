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
const fs = require('fs');
const path = require('path');
const url = require('url');
const _ = require('lodash');
const proxy = require('express-http-proxy');
const express = require('express');
const debug = require('debug')('SearchkitExpress');
const request = require('request');
const helper = {};

// Defaults to localhost if unspecified
const elasticsearchUrl = process.env.PASC_ELASTICSEARCH_URL || "http://localhost:9200/";
const debugEnabled = process.env.PASC_DEBUG_MODE === 'true';

helper.checkBuildDirectory = function () {
  if (!fs.existsSync(path.join(__dirname, '../dist'))) {
    console.error('ERROR : Unable to start Data Catalogue application.');
    console.error('        Missing \'/dist\' directory as application has not been built.');
    console.error('        Run command \'npm run build\' and try again.');
    process.exit(16);
  }
};

helper.checkEnvironmentVariables = function (production) {
  if (_.isEmpty(elasticsearchUrl)) {
    console.error('ERROR : Unable to start Data Catalogue application.');
    console.error('        Missing environment variable PASC_ELASTICSEARCH_URL.');
    process.exit(17);
  } else {
    console.log('NOTICE : Using Elasticsearch instance at ' + elasticsearchUrl);
  }

  if (production) {
    if (debugEnabled) {
      console.warn('WARNING : Debug mode is enabled. Disable for production use.');
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn('WARNING : Node environment is not set to production.');
    }
  } else {
    if (debugEnabled) {
      console.log('NOTICE : Debug mode is enabled.');
    }
  }
};

helper.getSearchkitRouter = function () {
  const router = express.Router();
  const config = {
    host: _.trimEnd(elasticsearchUrl, '/'),
    queryProcessor: (query) => query
  };
  const requestClient = request.defaults({ pool: { maxSockets: 500 } });

  const elasticRequest = function (url, body) {
    let fullUrl = config.host + '/' + (body.index || 'cmmstudy_en') + '/cmmstudy' + url;
    debug('Start Elastic Request', fullUrl);
    if (_.isObject(body)) {
      debug('Request body', body);
    }
    delete body.index;
    return requestClient.post({
      url: fullUrl,
      body: body,
      json: _.isObject(body),
      forever: true
    }).on('response', function (response) {
      debug('Finished Elastic Request', fullUrl, response.statusCode);
    }).on('error', function (response) {
      debug('Error Elastic Request', fullUrl, response.statusCode);
    });
  };

  router.post('/_search', function (req, res) {
    res.setHeader('Cache-Control', 'no-cache, max-age=0');
    let queryBody = config.queryProcessor(req.body || {});
    elasticRequest(req.url, queryBody).pipe(res);
  });

  return router;
};

helper.jsonProxy = proxy(elasticsearchUrl, {
  parseReqBody: false,
  proxyReqPathResolver: (req) => {
    const arr = _.trim(req.url, '/').split('/');
    const index = arr[0];
    const id = arr[1];
    return _.trimEnd(url.parse(elasticsearchUrl).pathname, '/') + '/' + index + '/cmmstudy/' + id;
  },
  userResDecorator: (_proxyRes, proxyResData) => {
    const json = JSON.parse(proxyResData.toString('utf8'));
    let result;
    if (!_.isEmpty(json._source)) {
      result = JSON.stringify(json._source);
    } else {
      // When running in debug mode, return the actual response from Elasticsearch
      if (debugEnabled) {
        result = proxyResData;
      } else {
        result = "{\"error\":\"Requested record was not found.\"}";
      }
    }
    return result;
  },
  filter: (req) => req.method === 'GET' && req.url.match(/[\/?]/gi).length === 2
});

helper.startListening = function (app) {
  let port = Number(process.env.PASC_PORT || 8088);
  
  const server = app.listen(port, () => {
    console.log('SUCCESS : Data Catalogue application is running at http://localhost:' + port);
  });

  process.on('exit', () => {
    console.log('NOTICE : Shutting down');
    server.close();
  })
};

module.exports = helper;
