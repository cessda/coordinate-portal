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
import _ from 'lodash';
import proxy from 'express-http-proxy';
import express, { RequestHandler } from 'express';
import request from 'request';
import winston from 'winston';
import bodybuilder, { Bodybuilder } from 'bodybuilder';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import { ParsedQs } from 'qs';
import responseTime from 'response-time';
import { CMMStudy, getJsonLd, getStudyModel } from '../common/metadata';
import { startMetricsListening, apiResponseTimeHandler, uiResponseTimeHandler, uiResponseTimeTotalFailedHistogram, uiResponseTimeZeroElasticResultsHistogram } from './metrics';
import { checkESEnvironmentVariables, client, elasticsearchAuthentication, elasticsearchUrl, getSimilars, getStudy, getTotalStudies } from './elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/api/types';
import { ConnectionError, ResponseError } from '@elastic/elasticsearch/lib/errors';
import { Response } from 'express-serve-static-core';

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
export const logger = winston.createLogger({
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
  checkESEnvironmentVariables();
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

  // Get a record directly
  router.get('/_get/:index/:id', async (req, res) => {
    try {
      const source = await getStudy(req.params.id, req.params.index);
      res.send(source);
    } catch (e) {
      elasticsearchErrorHandler(e, res);
    }
  });

  // Get similar records based on a study title
  router.get('/_similars/:index/', async (req, res) => {
    try {
      const similars = await getSimilars(String(req.query.title), String(req.query.id), req.params.index);
      res.send(similars);
    } catch (e) {
      elasticsearchErrorHandler(e, res);
    }
  });

  // Get the total studies stored in Elasticsearch
  router.get('/_total_studies', async (_req, res) => {
    try {
      const totalStudies = await getTotalStudies();
      res.send({ totalStudies: totalStudies });
    } catch (e) {
      elasticsearchErrorHandler(e, res);
    }
  });


  // Proxy Searchkit requests
  router.post('/_search', responseTime(uiResponseTimeHandler), (req, res) => {

    //timer required for responseTime in zero elasticsearch response
    const startTime = new Date();

    res.setHeader('Cache-Control', 'no-cache, max-age=0');

    const fullUrl = `${host}/${req.body.index || 'cmmstudy_en'}${req.url}`;
    logger.debug('Start Elasticsearch Request: %s', fullUrl);

    if (_.isObject(req.body)) {
      logger.debug('Request body', { body: req.body });
    }
    
    //keep language for use in metrics
    req.params = req.body.index
    //delete language from body request
    delete req.body.index;

    requestClient.post({
      url: fullUrl,
      body: req.body,
      json: _.isObject(req.body),
      forever: true,
      auth: elasticsearchAuthentication.authentication
    }, (_error, _response, body: SearchResponse | undefined) => {
      //callback function to register metrics of zero results from elasticsearch
      if (body) {
        const hits = body.hits.total;
        if (hits == 0) {
          const endTime = new Date();
          const timeDiff = endTime.getTime() - startTime.getTime(); //in ms
          uiResponseTimeZeroElasticResultsHistogram.observe({
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode
          }, timeDiff);
          uiResponseTimeTotalFailedHistogram.observe({
            method: req.method,
            route: req.route.path
          }, timeDiff);
        }
      }
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

/**
 * Common error handler for Elasticsearch errors.
 * @param e the caught error.
 * @param res the response to send to the client.
 */
function elasticsearchErrorHandler(e: unknown, res: Response) {
   if (e instanceof ConnectionError) {
    // Elasticsearch didn't respond, send 502.
    logger.error('Elasticsearch Request failed: %s', e.message);
    res.sendStatus(502);

  } else if (e instanceof ResponseError) {
    // Elasticsearch returned an error.
    logger.warn('Elasticsearch returned error: %s', e);
    res.sendStatus(e.statusCode);
    
  } else {
    // An unknown error occured.
    logger.error('Error occured when handling Elasticsearch request: %s', e);
    res.sendStatus(503);
  }
}

function externalApiV1() {

  const router = express.Router();

  router.get('/search', async (req, res) => {

    const { metadataLanguage, q } = req.query;

    if (!metadataLanguage) {
      res.status(400).send({ message: 'Please provide a search language'});
      return;
    }

    //Prepare body for ElasticSearch
    const bodyQuery = bodybuilder();

    // Validate the limit parameter
    if (req.query.limit !== undefined) {
      const limit = Number(req.query.limit);
      if (!Number.isInteger(limit) || limit <= 0) {
        res.status(400).send({ message: 'limit must be a positive integer'});
        return;
      } else if (limit > 200) {
        res.status(400).send({ message: 'limit must be maximum 200'});
        return;
      } else {
        bodyQuery.size(limit);
      }
    } else {
      bodyQuery.size(200);
    }

    // Validate the offset parameter
    if (req.query.offset !== undefined) {
      const offset = Number(req.query.offset);
      if (req.query.offset === '' || !Number.isInteger(offset) || offset < 0) {
        res.status(400).send({ message: 'offset must be a positive integer'});
        return;
      } else {
        bodyQuery.from(offset);
      }
    }

    //create json body for ElasticSearchClient - search query
    if (_.isString(q)) {
      bodyQuery.query('query_string', { query: q });
    }

    //Create json body for ElasticSearchClient - nested post-filters
    buildNestedFilters(bodyQuery, req.query.classifications, 'classifications', 'classifications.term');
    buildNestedFilters(bodyQuery, req.query.studyAreaCountries, 'studyAreaCountries', 'studyAreaCountries.searchField');
    buildNestedFilters(bodyQuery, req.query.publishers, 'publisher', 'publisher.publisher');

    //Create json body for ElasticSearchClient - date-filters
    let dataCollectionYearMin = req.query.dataCollectionYearMin ? Number(req.query.dataCollectionYearMin) : undefined;
    let dataCollectionYearMax = req.query.dataCollectionYearMax ? Number(req.query.dataCollectionYearMax) : undefined;
    if (dataCollectionYearMin || dataCollectionYearMax) {
      if (!Number.isInteger(dataCollectionYearMin)) {
        dataCollectionYearMin = undefined;
      }
      if (!Number.isInteger(dataCollectionYearMax)) {
        dataCollectionYearMax = undefined;
      }
      bodyQuery.filter('range', 'dataCollectionYear', { gte: dataCollectionYearMin, lte: dataCollectionYearMax });
    }

    //Prepare the Client
    try {
      const response = await client.search<SearchResponse<CMMStudy>>({
        index: `cmmstudy_${metadataLanguage}`,
        body: bodyQuery.build()
      });
      //Send the Response
      if (req.header('Accept')=="application/ld+json"){
        const studyModel: CMMStudy[] = response.body.hits.hits.map(hit => getStudyModel(hit));
        const jsonLdArray = studyModel.map(study => getJsonLd(study));
        res.status(200).json({
          "ResultsFound": response.body.hits.total,
          "Results": jsonLdArray
        });
      }
      else{
        res.status(200).json({
          "ResultsFound": response.body.hits.total,
          "Results": response.body.hits.hits.map(obj => obj._source)
        });
      }
    } catch (e) {
      logger.error('Elasticsearch API Request failed: %s', (e as Error));
      res.status(502).send({ message: (e as Error).message });
    } finally {
      logger.debug('Finished API Elasticsearch Request');
    }
  });
  
  return router;
}

/**
 * Build filters for nested documents. The filter uses a term query
 * 
 * @param bodyQuery the body query to add nested filters to.
 * @param query the term query, expected types are string or string[].
 * @param path the path to the nested document.
 * @param nestedPath the path to use in the nested document
 */
function buildNestedFilters(bodyQuery: Bodybuilder, query: string | string[] | ParsedQs | ParsedQs[] | undefined, path: string, nestedPath: string) {
  if (Array.isArray(query)) {
    bodyQuery.query('nested', { path: path }, (q: Bodybuilder) => {
      query.forEach(value => q.orQuery('term', nestedPath, value));
      return q;
    });
  } else if (_.isString(query)) {
    bodyQuery.query('nested', { path: path }, (q: Bodybuilder) => q.addQuery('term', nestedPath, query));
  }
}

function jsonProxy() {
  return proxy(elasticsearchUrl, {
    parseReqBody: false,
    proxyReqPathResolver: (req) => {
      const arr = _.trim(req.url, '/').split('/');
      const index = arr[0];
      const id = arr[1];
      return `${_.trimEnd(url.parse(elasticsearchUrl).pathname, '/')}/${index}/cmmstudy/${id}`;
    },
    // Add Elasticsearch authorisation if configured
    proxyReqOptDecorator: (proxyReqOpts) => {
      if (elasticsearchAuthentication.authorisationString) {
        proxyReqOpts.headers = {
          ...proxyReqOpts.headers,
          authorization: elasticsearchAuthentication.authorisationString
        };
      }
      return proxyReqOpts;
    },
    // Handle connection errors to Elasticsearch.
    proxyErrorHandler: (err, res) => {
      logger.error('Elasticsearch Request failed: %s', err?.message);
      res.sendStatus(502);
    },
    userResDecorator: (_proxyRes, proxyResData, userReq) => {
      const json = JSON.parse(proxyResData.toString('utf8'));
      if (!_.isEmpty(json._source)) {
        if (userReq.header('Accept')=="application/ld+json")
          return getJsonLd(json._source)
        else
          return JSON.stringify(json._source);
      } else {
        // When running in debug mode, return the actual response from Elasticsearch
        if (debugEnabled) {
          return proxyResData;
        } else {
          return "{\"error\":\"Requested record was not found.\"}";
        }
      }
    },
    filter: (req) => req.method === 'GET' && req.url.match(/[\/?]/gi)?.length === 2
  });
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

  //Metrics middleware for API
  app.use('/api/DataSets', responseTime(apiResponseTimeHandler));

  // Set up request handlers
  app.use('/api/sk', getSearchkitRouter());
  app.use('/api/json', jsonProxy());
  app.use('/api/DataSets/v1', externalApiV1());
  app.use('/swagger/api/DataSets/v1', (req, res) => {
    const externalAPISwagger = require("./swagger.json");
    res.json(externalAPISwagger);
  });
  app.use('/api/mt', startMetricsListening());

  app.get('*', handler);

  const server = app.listen(port, () => logger.info('Data Catalogue is running at http://localhost:%s/', port));

  // Set up exit handler, gracefully terminating the server on exit.
  process.on('exit', () => {
    logger.info('Shutting down');
    server.close(() => logger.info('Shut down'));
  });

  // Set up signal handers
  process.on('SIGINT', () =>  process.exit(130));
  process.on('SIGTERM', () => process.exit(143));
}
