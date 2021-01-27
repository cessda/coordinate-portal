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

  if (process.env.PASC_ENABLE_ANALYTICS === 'true') {
    console.log('NOTICE : Matomo Analytics tracking is enabled.');
  } else {
    console.log('NOTICE : Matomo Analytics tracking is disabled.');
  }

  if (production) {
    if (process.env.PASC_DEBUG_MODE === 'true') {
      console.warn('WARNING : Debug mode is enabled. Disable for production use.');
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn('WARNING : Node environment is not set to production.');
    }
  } else {
    if (process.env.PASC_DEBUG_MODE === 'true') {
      console.log('NOTICE : Debug mode is enabled.');
    }
  }
};

helper.getSearchkitRouter = function () {
  let router = express.Router(),
    config = {
      host: _.trimEnd(elasticsearchUrl, '/'),
      queryProcessor: function (query) {
        return query;
      }
    },
    requestClient = request.defaults({
      pool: {
        maxSockets: 500
      }
    });

  let elasticRequest = function (url, body) {
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
    let queryBody = config.queryProcessor(req.body || {}, req, res);
    elasticRequest('/_search', queryBody).pipe(res);
  });

  return router;
};

helper.getJsonProxy = function () {
  return proxy(elasticsearchUrl, {
    proxyReqPathResolver(req) {
      let arr = _.trim(req.url, '/').split('/'),
        index = arr[0],
        id = arr[1];
      return _.trimEnd(url.parse(elasticsearchUrl).pathname, '/') + '/' + index +
             '/cmmstudy/' + id;
    },
    userResDecorator: function (_proxyRes, proxyResData) {
      let json = JSON.parse(proxyResData.toString('utf8'));
      return JSON.stringify(!_.isEmpty(json._source) ? json._source : {
        error: 'Requested record was not found.'
      });
    },
    filter: function (req) {
      return req.method === 'GET' && req.url.match(/[\/?]/gi).length === 2;
    }
  });
};

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
