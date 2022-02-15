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
import fs from 'fs';
import path from 'path';
import url from 'url';
import _, { includes, isString } from 'lodash';
import proxy from 'express-http-proxy';
import express, { RequestHandler } from 'express';
import request from 'request';
import winston from 'winston';
import client from 'prom-client';
import bodybuilder, { Bodybuilder } from 'bodybuilder';
import { Client, SearchResponse } from 'elasticsearch';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';

// Defaults to localhost if unspecified
const elasticsearchUrl = process.env.PASC_ELASTICSEARCH_URL || "http://localhost:9200/";
const elasticsearchUsername = process.env.SEARCHKIT_ELASTICSEARCH_USERNAME;
const elasticsearchPassword = process.env.SEARCHKIT_ELASTICSEARCH_PASSWORD;
const debugEnabled = process.env.PASC_DEBUG_MODE === 'true';
const logLevel = process.env.SEARCHKIT_LOG_LEVEL || 'info';
function loggerFormat() {
  if (process.env.SEARCHKIT_USE_JSON_LOGGING === 'true') {
    return winston.format.json();
  } else {
    return winston.format.printf(
      ({ level, message, timestamp }) => `[${timestamp}][${level}] ${message}`
    );
  }
}

// Logger
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    loggerFormat()
  ),
  transports: [
    new winston.transports.Console()
  ],
  exceptionHandlers: [
    new winston.transports.Console()
  ],
});

export function checkBuildDirectory() {
  if (!fs.existsSync(path.join(__dirname, '../dist'))) {
    logger.error(
      'Production startup failed as the application has not been built. ' +
      'Run command \'npm run build\' and try again.'
    );
    process.exit(16);
  }
}

export function checkEnvironmentVariables(production: boolean) {
  if (_.isEmpty(elasticsearchUrl)) {
    logger.error(
      'Unable to start Data Catalogue application. Missing environment variable PASC_ELASTICSEARCH_URL.'
    );
    process.exit(17);
  } else {
    logger.info('Using Elasticsearch instance at %s', elasticsearchUrl);
  }

  if (production) {
    if (debugEnabled) {
      logger.warn('Debug mode is enabled. Disable for production use.');
    }
    if (process.env.NODE_ENV !== 'production') {
      logger.warn('Node environment is not set to production.');
    }
  } else {
    if (debugEnabled) {
      logger.info('Debug mode is enabled.');
    }
  }
}

function getSearchkitRouter() {
  const router = express.Router();
  const host = _.trimEnd(elasticsearchUrl, '/');

  const requestClient = request.defaults({ pool: { maxSockets: 500 } });

  // Configure authentication
  let authentication: any = undefined;
  if (elasticsearchUsername && elasticsearchPassword) {
    logger.info('Elasticsearch authentication configured');
    authentication = {
      username: elasticsearchUsername,
      password: elasticsearchPassword,
      sendImmediately: true
    };
  }

  router.post('/_search', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, max-age=0');

    const fullUrl = host + '/' + (req.body.index || 'cmmstudy_en') + '/cmmstudy' + req.url;
    logger.debug('Start Elasticsearch Request: %s', fullUrl);

    if (_.isObject(req.body)) {
      logger.debug('Request body', { body: req.body });
    }

    delete req.body.index;

    requestClient.post({
      url: fullUrl,
      body: req.body,
      json: _.isObject(req.body),
      forever: true,
      auth: authentication
    }).on('response', (response) => {
      logger.debug('Finished Elasticsearch Request to %s', fullUrl, response.statusCode);
    }).on('error', (response) => {
      // When a connection error occurs send a 502 error to the client.
      logger.error('Elasticsearch Request failed: %s: %s', fullUrl, response.message);
      res.sendStatus(502);
    }).pipe(res);
  });

  return router;
}

function externalApiV1() {

  const router = express.Router();
  
  const host = _.trimEnd(elasticsearchUrl, '/');

  //Create ElasticSearch Client
  const hostUrl = url.parse(host);
  const client = new Client({
    host: {
      host: hostUrl.hostname,
      auth: `${elasticsearchUsername}:${elasticsearchPassword}`,
      protocol: hostUrl.protocol,
      port: hostUrl.port
    }
  });

  router.get('/search', async (req, res) => {

    const { metadataLanguage, q } = req.query;
    let dataCollectionYearMin = req.query.dataCollectionYearMin as unknown as number;
    let dataCollectionYearMax = req.query.dataCollectionYearMax as unknown as number;
    const classifications = req.query.classifications;
    const studyAreaCountries = req.query.studyAreaCountries;
    const publishers = req.query.publishers;
    const limit = req.query.limit as unknown as string;
    const offset = req.query.offset as unknown as string;

    if (!metadataLanguage) {
      res.status(400).send({ message: 'Please provide a search language'});
    }
    else if (limit>"200"){
      res.status(400).send({ message: 'limit should be maximum 200'});
    }
    else {
      //Prepare body for ElasticSearch
      const bodyQuery = bodybuilder()
      //Set limit & offset  
      if (limit && offset){
        bodyQuery.size(parseInt(limit)).from(parseInt(offset));
      }   
      if (!limit){
        bodyQuery.size(200);
      }
      if (!offset){
        bodyQuery.from(0);
      }   
      //create json body for ElasticSearchClient - search query
      if (q) {
        bodyQuery.query('query_string', { query: q });
      }
      //callback functions for nested post-filters
      //Create json body for ElasticSearchClient - nested post-filters
      if (Array.isArray(classifications)) {
        bodyQuery.query('bool', build => build.orQuery('nested', { path: 'classifications' }, (q: Bodybuilder) => {
          classifications.forEach(value => {
            q.orQuery('term', 'classifications.term', value);
          });
          return q;
        }));
      }
      if (isString(classifications)){
        bodyQuery.query('nested', { path: 'classifications' }, (q: Bodybuilder) => {
          return q
          .orQuery('term', 'classifications.term', classifications)
        })
      }
      if (Array.isArray(studyAreaCountries)) {
        bodyQuery.query('bool', build => build.orQuery('nested', { path: 'studyAreaCountries' }, (q: Bodybuilder) => {
          studyAreaCountries.forEach(value => {
            q.orQuery('term', 'studyAreaCountries.searchField', value);
          });
          return q;
        }));
      }
      if (isString(studyAreaCountries)){
        bodyQuery.query('nested', { path: 'studyAreaCountries' }, (q: Bodybuilder) => {
          return q
          .orQuery('term', 'studyAreaCountries.searchField', studyAreaCountries)
        })
      }
      if (Array.isArray(publishers)) {
        bodyQuery.query('bool', build => build.orQuery('nested', { path: 'publisher' }, (q: Bodybuilder) => {

          publishers.forEach(value => {
            q.orQuery('term', 'publisher.publisher', value);
          });
          return q;
        }));
      }
      if (isString(publishers)){
        bodyQuery.query('nested', { path: 'studyArpublishereaCountries' }, (q: Bodybuilder) => {
          return q
          .orQuery('term', 'publisher.publisher', publishers)
        })
      }
      //Create json body for ElasticSearchClient - date-filters
      if (dataCollectionYearMin || dataCollectionYearMax) {
        if (!dataCollectionYearMin) {
          dataCollectionYearMin = 1900;
        }
        if (!dataCollectionYearMax) {
          dataCollectionYearMax = new Date().getFullYear();
        }
        bodyQuery.orFilter('range', 'dataCollectionYear', { gte: dataCollectionYearMin, lte: dataCollectionYearMax });
      }
      //Prepare the Client
      try {
        const body = await client.search({
          index: `cmmstudy_${metadataLanguage}`,
          body: bodyQuery.build()
        });
        //Send the Response
          res.status(200).json({
            "ResultsFound": body.hits.total,
            "Results": body.hits.hits.map(obj => obj._source)
          });
      } catch (e) {
        logger.error('Elasticsearch API Request failed: %s', (e as Error).message);
        res.status(502).send({ message: (e as Error).message });
      } finally {
        logger.debug('Finished API Elasticsearch Request');
      }
    }
  });
  
  return router;
}

function jsonProxy() {
  let elasticsearchAuthorisaton: string | undefined = undefined;

  // Only configure Elasticsearch authentication if both username and password are set
  if (elasticsearchUsername && elasticsearchPassword) {
    elasticsearchAuthorisaton = `Basic ${Buffer.from(`${elasticsearchUsername}:${elasticsearchPassword}`).toString('base64')}`;
  }

  return proxy(elasticsearchUrl, {
    parseReqBody: false,
    proxyReqPathResolver: (req) => {
      const arr = _.trim(req.url, '/').split('/');
      const index = arr[0];
      const id = arr[1];
      return _.trimEnd(url.parse(elasticsearchUrl).pathname, '/') + '/' + index + '/cmmstudy/' + id;
    },
    // Add Elasticsearch authorisation if configured
    proxyReqOptDecorator: (proxyReqOpts) => {
      if (elasticsearchAuthorisaton) {
        proxyReqOpts.headers = {
          ...proxyReqOpts.headers,
          authorization: elasticsearchAuthorisaton
        };
      }
      return proxyReqOpts;
    },
    // Handle connection errors to Elasticsearch.
    proxyErrorHandler: (err, res) => {
      logger.error('Elasticsearch Request failed: %s', err?.message);
      res.sendStatus(502);
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
    filter: (req) => req.method === 'GET' && req.url.match(/[\/?]/gi)?.length === 2
  });
}

//Metrics for api - total
export const restResponseTimeTotalHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_total',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route']
})
//Metrics for api - total - failed
export const restResponseTimeTotalFailedHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_total_failed',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route']
})
//Metrics for api - total - success
export const restResponseTimeTotalSuccessHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_total_success',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route']
})
//Metrics for api - all
export const restResponseTimeAllHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_all',
  help: 'REST API response time in seconds for all requests',
  labelNames: ['method', 'route', 'status_code']
})
//Metrics for api - language
export const restResponseTimeLangHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_language',
  help: 'REST API response time in seconds for Language',
  labelNames: ['method', 'route', 'lang', 'status_code']
})
//Metrics for api - publisher
export const restResponseTimePublisherHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_publisher',
  help: 'REST API response time in seconds for Publisher',
  labelNames: ['method', 'route', 'publ', 'status_code']
})

//Endpoint used for Prometheus Metrics
function startMetricsListening() {

  const router = express.Router();

  client.collectDefaultMetrics(); //general cpu, mem, etc information

  router.get('/metrics', async (_req, res) =>{
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  })
  return router;
}

/**
 * Start listening.
 * @param app the express instance.
 * @param handler the request handler for the React application.
 */
export function startListening(app: express.Express, handler: RequestHandler) {

  const port = Number(process.env.PASC_PORT || 8088);

  // Set up application middleware
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Set up request handlers
  app.use('/api/sk', getSearchkitRouter());
  app.use('/api/json', jsonProxy());
  app.use('/api/DataSets/v1', externalApiV1());
  app.use('/api/mt', startMetricsListening());

  app.get('*', handler);

  const server = app.listen(port, () => logger.info('Data Catalogue is running at http://localhost:%s/', port));

  process.on('exit', () => {
    logger.info('Shutting down');
    server.close();
  });
}
