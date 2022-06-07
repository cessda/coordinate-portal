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
import { Client, SearchResponse } from 'elasticsearch';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import { ParsedQs } from 'qs';
import responseTime from 'response-time';
import { CMMStudy, getJsonLd, getStudyModel } from '../common/metadata';
import { Dataset, WithContext } from 'schema-dts';
import { startMetricsListening, apiResponseTimeHandler, uiResponseTimeHandler, uiResponseTimeTotalFailedHistogram, uiResponseTimeZeroElasticResultsHistogram } from './metrics';
import cors from 'cors';
import swagger from './swagger.json';


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

//Create ElasticSearch Client
const hostUrl = url.parse(_.trimEnd(elasticsearchUrl, '/'));
export const client = new Client({
  host: {
    host: hostUrl.hostname,
    auth: `${elasticsearchUsername}:${elasticsearchPassword}`,
    protocol: hostUrl.protocol,
    port: hostUrl.port
  }
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

  router.post('/_search', responseTime(uiResponseTimeHandler), (req, res) => {

    //timer required for responseTime in zero elasticsearch response
    const startTime = new Date();

    res.setHeader('Cache-Control', 'no-cache, max-age=0');

    const fullUrl = host + '/' + (req.body.index || 'cmmstudy_en') + '/cmmstudy' + req.url;
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
      auth: authentication
    }, (_error, _response, body: SearchResponse<unknown> | undefined) => {
        //callback function to register metrics of zero results from elasticsearch
        if (body?.hits.total === 0) {
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

const maxApiLimit = 200; //for API max Limit

function externalApiV1() {

  const router = express.Router();

  router.get('/search', async (req, res) => {

    const accepts = req.accepts(["json", "application/ld+json"]);

    // Skip performing work if the client won't accept the response.
    if (!accepts) {
      res.sendStatus(406);
      return;
    }

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
      } else if (limit > maxApiLimit) {
        res.status(400).send({ message: `limit must be maximum ${maxApiLimit}`});
        return;
      } else {
        bodyQuery.size(limit);
      }
    } else {
      bodyQuery.size(maxApiLimit);
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
      bodyQuery.query('query_string', {
         query: q,
         lenient: false,
         default_operator: "AND",
         fields: ['titleStudy^4', 'abstract^2', 'creators^2', 'keywords.id^1.5', '*']
        });
    }

    //Create json body for ElasticSearchClient - nested post-filters
    buildNestedFilters(bodyQuery, req.query.classifications, 'classifications', 'classifications.term');
    buildNestedFilters(bodyQuery, req.query.studyAreaCountries, 'studyAreaCountries', 'studyAreaCountries.searchField');
    buildNestedFilters(bodyQuery, req.query.publishers, 'publisherFilter', 'publisherFilter.publisher');

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

    //Meta-Info to send with response
    const searchTerms = {
      metadataLanguage: metadataLanguage,
      queryTerm: q,
      limit: req.query.limit,
      offset: req.query.offset,
      classifications: req.query.classifications,
      studyAreaCountries: req.query.studyAreaCountries,
      publishers: req.query.publishers,
      dataCollectionYearMin: req.query.dataCollectionYearMin,
      dataCollectionYearMax: req.query.dataCollectionYearMax,
   }

    //Prepare the Client
    try {
      const body: SearchResponse<CMMStudy> = await client.search({
        index: `cmmstudy_${metadataLanguage}`,
        body: bodyQuery.build()
      });

      /* 
       * Send the Response.
       *
       * We default to sending the CMMStudy model, only sending JSON-LD if specifically requested.
       */
      switch (accepts) {
        case "json": 
          res.json({
            SearchTerms: searchTerms,
            ResultsCount: apiResultsCount(Number(req.query.offset), Number(req.query.limit), body.hits.total),
            Results: body.hits.hits.map(obj => obj._source)
          });
          break;
        case "application/ld+json":
          const studyModels: CMMStudy[] = getStudyModel(body);
          const jsonLdArray: WithContext<Dataset>[] = studyModels.map((value) => getJsonLd(value));
          res.contentType("application/ld+json").json({
            SearchTerms: searchTerms,
            ResultsCount: apiResultsCount(Number(req.query.offset), Number(req.query.limit), body.hits.total),
            Results: jsonLdArray
          });
          break;
        default:
          // We shouldn't end up here, but just in case respond with something.
          res.sendStatus(500);
          break;
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

/**
 * Track results returned from ElasticSearch.
 * 
 * @param offset the offset to start results from. Defaults to 0 if not set by user
 * @param limit the limit of results to be returned. Defaults to 200 if not set by user.
 * @param total The total results coming from ElasticSearch.
 */
 function apiResultsCount(offset: number, limit: number, total: any) {
  let from: number;
  if (!isNaN(offset))
    from = Number(offset)
  else
    from = 0;
  let max: number;
  if (!isNaN(limit))
    max = Number(limit)
  else
    max = maxApiLimit;
  let to: number = from + max;
  if (to>total.value)
    to = total.value;
  const resultsCount = {
    from: from,
    to: to,
    retrieved: (to-from<0 ? 0 : to-from),
    available: total.value
 }
 return resultsCount;
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
    userResDecorator: (_proxyRes, proxyResData, userReq) => {
      const json = JSON.parse(proxyResData.toString('utf8'));
      let result;
      if (!_.isEmpty(json._source)) {
        if (userReq.header('Accept')=="application/ld+json")
          result = getJsonLd(json._source)
        else
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

export interface Metadata {
  title: string;
  jsonLd: WithContext<Dataset>;
}

export async function getJsonLdString(q: string, lang: string | undefined): Promise<Metadata| undefined> {
  // Default to English if the language is unspecified
  if (!lang) {
    lang = "en";
  }

  try {
    const study = await client.get<CMMStudy>({
      index: `cmmstudy_${lang}`,
      id: q,
      type: "cmmstudy"
    });

    return {
      title: study._source.titleStudy,
      // @ts-expect-error - typings are too strict
      jsonLd: getJsonLd(getStudyModel({ hits: { hits: [study] } })[0])
    };
  } catch (e) {
    logger.debug(`${q}: ${e}`);
    return undefined;
  }
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
  app.use('/api/DataSets/v1', cors(),  externalApiV1());
  app.use('/swagger/api/DataSets/v1', cors(), ((_req, res) => res.json(swagger)) as express.RequestHandler);
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
