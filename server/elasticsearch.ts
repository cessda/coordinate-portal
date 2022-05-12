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

import { Client, ClientOptions, RequestParams } from "@elastic/elasticsearch";
import { GetResponse, SearchResponse } from "@elastic/elasticsearch/api/types";
import _ from "lodash";
import { CMMStudy } from "../common/metadata";
import { logger } from "./helper";

interface ElasticsearchAuthentication {
  authentication: {
    username: string;
    password: string;
    sendImmediately: boolean;
  } | undefined;
  authorisationString: string | undefined;
};

// Defaults to localhost if unspecified
export const elasticsearchUrl = process.env.PASC_ELASTICSEARCH_URL || "http://localhost:9200/";
const elasticsearchUsername = process.env.SEARCHKIT_ELASTICSEARCH_USERNAME;
const elasticsearchPassword = process.env.SEARCHKIT_ELASTICSEARCH_PASSWORD;

// Define Elasticsearch authentication
let auth: ClientOptions["auth"] = undefined;

export const elasticsearchAuthentication: ElasticsearchAuthentication = {
  authentication: undefined,
  authorisationString: undefined
};

if (elasticsearchUsername && elasticsearchPassword) {
  // Configure authentication
  auth = {
    username: elasticsearchUsername,
    password: elasticsearchPassword
  };
  elasticsearchAuthentication.authentication = {
    username: elasticsearchUsername,
    password: elasticsearchPassword,
    sendImmediately: true
  };
  elasticsearchAuthentication.authorisationString = `Basic ${Buffer.from(`${elasticsearchUsername}:${elasticsearchPassword}`).toString('base64')}`;
  logger.info('Elasticsearch authentication configured');
}

//Create ElasticSearch Client
export const client = new Client({
  node: elasticsearchUrl,
  auth: auth
});

export function checkESEnvironmentVariables() {
  if (_.isEmpty(elasticsearchUrl)) {
    logger.error(
      'Unable to start Data Catalogue application. Missing environment variable PASC_ELASTICSEARCH_URL.'
    );
    process.exit(17);
  } else {
    logger.info('Using Elasticsearch instance at %s', elasticsearchUrl);
  }
}

/**
 * Gets a study with the specified identifier from the specified index.
 * @param id the id of the study.
 * @param index the index to retrieve the study from.
 * @returns the source of the study.
 */
export async function getStudy(id: string, index: string) {
  const response = await client.get<GetResponse<CMMStudy>>({
    id: id,
    index: index
  });

  return response.body._source;
}

/**
 * Gets similar studies based on the title of the study.
 * @param title the title of the study.
 * @param id the identifier of the study, used to exclude the study from the similars query.
 * @param index the index to retrieve the similars from.
 */
export async function getSimilars(title: string, id: string, index: string) {
  const response = await client.search<SearchResponse<CMMStudy>>({
    size: 5,
    index: index,
    body: {
      query: similarQuery(id, title)
    }
  });

  const sources = response.body.hits.hits.map(hit => hit._source);

  return _.compact(sources).map(s => ({
    id: s.id,
    title: s.titleStudy
  }));
}

export async function getTotalStudies() {
  const response = await client.search<SearchResponse<never>>({
    size: 0,
    index: "cmmstudy_*",
    body: {
      query: { match_all: {} },
      aggs: { 
        unique_id: {
          cardinality: {
            field: "id"
          }
        }
      }
    }
  });

  // @ts-ignore
  return response.body.aggregations.unique_id.value as number;
}

/**
 * Query used to retrieve similar records for a specific title (for detail page).
 * @param id the document id, used to exclude the original document from the query.
 * @param title the title of the document to retrieve similar records for.
 */
 export function similarQuery(id: string, title: string) {
  return {
    bool: {
      must: {
        match: {
          titleStudy: title
        }
      },
      must_not: {
        ids: {
          values: [id]
        }
      }
    }
  };
}
