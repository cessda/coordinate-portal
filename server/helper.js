const fs = require('fs');
const path = require('path');
const url = require('url');
const _ = require('lodash');
const SearchkitExpress = require('searchkit-express');
const proxy = require('express-http-proxy');
const express = require('express');
const debug = require('debug')('SearchkitExpress');
const request = require('request');
const helper = {};

helper.checkBuildDirectory = function () {
  if (!fs.existsSync(path.join(__dirname, '../dist'))) {
    console.error('ERROR : Unable to start PaSC application.');
    console.error('        Missing \'/dist\' directory as application has not been built.');
    console.error('        Run command \'npm run build\' and try again.');
    console.log();
    process.exit();
  }
};

helper.checkEnvironmentVariables = function (production) {
  if (!helper.exists(process.env.PASC_ELASTICSEARCH_URL)) {
    console.error('ERROR : Unable to start PaSC application.');
    console.error('        Missing environmental variable PASC_ELASTICSEARCH_URL.');
    console.log();
    process.exit();
    return;
  } else {
    console.log('NOTICE : Using Elasticsearch instance at ' +
                process.env.PASC_ELASTICSEARCH_URL + '.');
  }

  if (!helper.exists(process.env.PASC_ANALYTICS_ID)) {
    console.log('NOTICE : Missing environmental variable PASC_ANALYTICS_ID.');
    console.log('         Google Analytics tracking will be disabled.');
  } else {
    console.log('NOTICE : Google Analytics tracking enabled for ' +
                process.env.PASC_ANALYTICS_ID + '.');
  }

  if (production) {
    if (helper.exists(process.env.PASC_DEBUG_MODE)) {
      console.warn('WARNING : Debug mode is enabled. Disable for production use.');
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn('WARNING : Node environment is not set to production.');
    }
  } else {
    if (helper.exists(process.env.PASC_DEBUG_MODE)) {
      console.log('NOTICE : Debug mode is enabled.');
    }
  }
};

helper.getSearchkitRouter = function () {
  let router = express.Router(),
    config = {
      host: process.env.PASC_ELASTICSEARCH_URL,
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
    let fullUrl = config.host + '/' + (body.index || 'cmmstudy_en') + url;
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
    let queryBody = config.queryProcessor(req.body || {}, req, res);
    elasticRequest('/_search', queryBody).pipe(res);
  });

  return router;
};

helper.getElasticsearchProxy = function () {
  return proxy(process.env.PASC_ELASTICSEARCH_URL, {
    proxyReqPathResolver(req) {
      return _.trimEnd(url.parse(process.env.PASC_ELASTICSEARCH_URL).pathname, '/') + req.url;
    }
  });
};

helper.getJsonProxy = function (index) {
  return proxy(process.env.PASC_ELASTICSEARCH_URL, {
    proxyReqPathResolver(req) {
      return _.trimEnd(url.parse(process.env.PASC_ELASTICSEARCH_URL).pathname, '/') + '/' + index +
             '/cmmstudy' + req.url;
    },
    userResDecorator: function (proxyRes, proxyResData) {
      let json = JSON.parse(proxyResData.toString('utf8'));
      return JSON.stringify(!_.isEmpty(json._source) ? json._source : {
        error: 'Requested record was not found.'
      });
    },
    filter: function (req) {
      return !(req.method !== 'GET' || req.url.match(/[\/?]/gi).length > 1);
    }
  });
};

helper.startListening = function (app) {
  let port = Number(process.env.PASC_PORT || 8088);
  app.listen(port, function () {
    console.log();
    console.log('SUCCESS : PaSC application is running at http://localhost:' + port + '.');
    console.log();
  });
};

helper.exists = function (data) {
  return !(_.isNil(data) || _.isEmpty(data));
};

module.exports = helper;
