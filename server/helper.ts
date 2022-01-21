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
import express, { response } from 'express';
import request from 'request';
import winston from 'winston';
import { each } from 'jquery';
import client from 'prom-client';

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

export function getSearchkitRouter() {
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

export function externalApi(){

  const router = express.Router();
  
  const host = _.trimEnd(elasticsearchUrl, '/');

  router.get('/search', function (req, res) {
    
    let {metadataLanguage, q} = req.query;

    let dataCollectionYear:any | undefined = req.query.dataCollectionYear;

    let classifications: any | undefined =req.query.classifications;

    let studyAreaCountries: any | undefined =req.query.studyAreaCountries;

    let publishers: any | undefined =req.query.publishers;

    if (!metadataLanguage){
      res.status(400).send({message: 'Please provide a search language'})
    }
    else{
      //Create ElasticSearch Client
      const { Client } = require('@elastic/elasticsearch')
      const client = new Client({
        node: host,
        auth: {
          username: elasticsearchUsername,
          password: elasticsearchPassword
        }
      })
      //Prepare body for ElasticSearch
      let bodybuilder = require('bodybuilder')
      let bodyQuery: any = bodybuilder().size(100) //up to how many results will be returned

      //create json body for ElasticSearchClient - search query
      if (q !== undefined) {
        bodyQuery = bodyQuery
        .query('multi_match',
          {
            query: q,
            fields: ['titleStudy^4', 'abstract^2', 'creators^2', 'keywords.id^1.5', '*']
          }
        )
      }
      //callback functions for nested post-filters
      const classifQuery = (build: any) => {
        return build
            .orQuery('nested', { path: 'classifications'}, (q: any) => {
              classifications.forEach(function (value: any) {
                q.orQuery('term', 'classifications.term', value)
              });
              return q
            })
      }
      const studyQuery = (build: any) => {
        return build
            .orQuery('nested', { path: 'studyAreaCountries'}, (q: any) => {
              studyAreaCountries.forEach(function (value: any) {
                q.orQuery('term', 'studyAreaCountries.searchField', value)
              });
              return q
            })
      }
      const publQuery = (build: any) => {
        return build
            .orQuery('nested', { path: 'publisher'}, (q: any) => {
              publishers.forEach(function (value: any) {
                q.orQuery('term', 'publisher.publisher', value)
              });
              return q
            })
      }
      //Create json body for ElasticSearchClient - nested post-filters
      if(classifications !== undefined){
        bodyQuery = bodyQuery.query('bool', classifQuery)
      }
      if(studyAreaCountries !== undefined){
        bodyQuery = bodyQuery.query('bool', studyQuery)
      }
      if(publishers !== undefined){
        bodyQuery = bodyQuery.query('bool', publQuery)
      }
      //Create json body for ElasticSearchClient - date-filters
      if(dataCollectionYear !== undefined){
        if (!('min' in dataCollectionYear)){
          dataCollectionYear.min = 1900;
        }
        if (!('max' in dataCollectionYear)){
          dataCollectionYear.max = new Date().getFullYear();
        }
        bodyQuery = bodyQuery.orFilter('range', 'dataCollectionYear', {gte: Number(dataCollectionYear.min), lte:Number(dataCollectionYear.max)})
      }
      
       //Prepare the Client
      async function run () {
        const { body } = await client.search({
          index: 'cmmstudy_'+metadataLanguage,
          body: bodyQuery.build()
        })
        //Prepare API Response
        let resultsTotal: number = body.hits.total.value;
        let resultsRaw: JSON = body.hits.hits.map(function(obj: any){
          return obj._source;
        });
        
        let resultsFinal = {
          "Results Found": resultsTotal,
          "Results": resultsRaw
        }
        //Send the Response
        res.status(200).json(resultsFinal);
      }

      run().then(function() {
        logger.debug('Succesful API Elasticsearch Request')
      }).catch(function(e) {
        logger.error('Elasticsearch API Request failed');
        res.status(500).send({message: e.message})
      })
      .finally(() => {
        logger.debug('Finished API Elasticsearch Request');
      });
      //code to execute while waiting async function
      logger.debug('Waiting for API Results');
    }
  }) 
  return router;
}

export function jsonProxy() {
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

//Metrics for api - all
export const restResponseTimeAllHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds_all',
  help: 'REST API response time in seconds',
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
export function startMetricsListening(){

  const router = express.Router();

  const collectDefaultMetrics = client.collectDefaultMetrics

  collectDefaultMetrics(); //general cpu, mem, etc information

  router.get('/metrics', async (req, res) =>{
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  })
  return router;
}

export function startListening(app: express.Express) {

  const port = Number(process.env.PASC_PORT || 8088);

  const server = app.listen(port, () => logger.info('Data Catalogue is running at http://localhost:%s/', port));

  process.on('exit', () => {
    logger.info('Shutting down');
    server.close();
  });
}
