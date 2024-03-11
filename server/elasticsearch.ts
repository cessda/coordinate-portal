// Copyright CESSDA ERIC 2017-2023
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

import { Client } from "@elastic/elasticsearch";
import {
  SearchHit,
  AggregationsCardinalityAggregate,
  AggregationsNestedAggregate,
  AggregationsSignificantStringTermsAggregate,
} from "@elastic/elasticsearch/lib/api/types";
import _ from "lodash";
import { CMMStudy } from "../common/metadata";
import { logger } from "./logger";

interface Source {
  id: string;
  titleStudy: string;
}

interface NestedAggregation<T> {
  [key: string]: {
    [aggName: string]: T;
  };
}

interface AggregationsResponse {
  aggregations?: NestedAggregation<{
    value: number;
  }>;
}

export default class Elasticsearch {
  public readonly client: Client;

  constructor(
    url: string,
    authentication?: { username: string; password: string }
  ) {
    //Create ElasticSearch Client
    this.client = new Client({
      node: url,
      auth: authentication,
    });

    logger.info("Elasticsearch client configured");
  }

  /**
   * Gets a study with the specified identifier from the specified index.
   * @param id the id of the study.
   * @param index the index to retrieve the study from.
   * @returns the source of the study.
   */
  public async getStudy(id: string, index: string) {
    const response = await this.client.get<Partial<CMMStudy>>({
      id: id,
      index: index,
    });

    return response._source;
  }

  /**
   * Gets similar studies based on the title of the study.
   * @param title the title of the study.
   * @param id the identifier of the study, used to exclude the study from the similars query.
   * @param index the index to retrieve the similars from.
   */
  async getSimilars(title: string, id: string, index: string) {
    const response = await this.client.search<CMMStudy>({
      size: 5,
      index: index,
      body: {
        query: Elasticsearch.similarQuery(id, title),
      },
    });

    const sources = response.hits.hits.map((hit: SearchHit) => hit._source);

    return (_.compact(sources) as Source[]).map((value: Source) => ({
      id: value.id,
      title: value.titleStudy,
    }));
  }

  async getTotalStudies() {
    const response = await this.client.search({
      size: 0,
      index: "cmmstudy_*",
      body: {
        query: { match_all: {} },
        aggs: {
          unique_id: {
            cardinality: {
              field: "id",
            },
          },
        },
      },
    });

    // Assert the type as AggregationsCardinalityAggregate, then return the value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (
      response.aggregations!.unique_id as AggregationsCardinalityAggregate
    ).value;
  }

  /**
   * Gets metrics for About page.
   * @param index the index to retrieve the metrics from.
   */
  async getAboutMetrics(index: string) {
    const studiesResponse: AggregationsResponse = await this.client.search({
      size: 0,
      index: index,
      body: {
        query: { match_all: {} },
        aggs: {
          unique_id: {
            cardinality: {
              field: "id",
            },
          },
        },
      },
    });

    const totalStudies = studiesResponse.aggregations?.unique_id.value;

    const creatorsResponse: AggregationsResponse = await this.client.search({
      size: 0,
      index: index,
      body: {
        query: { match_all: {} },
        // aggs: {
        //   unique_creators: {
        //     cardinality: {
        //       field: "creators.normalized",
        //     },
        //   },
        // },
        aggs: {
          unique_creators: {
            scripted_metric: {
              init_script: "state.creators = []",
              map_script: "if (doc.containsKey('creators.normalized') && doc['creators.normalized'].size() > 0) { def creator = doc['creators.normalized'].value; state.creators.add(creator) }",
              combine_script: "return state.creators.size()",
              reduce_script: "return states.sum()"
            }
          }
        }
      },
    });

    const totalCreators = creatorsResponse.aggregations?.unique_creators.value;

    const countriesResponse: AggregationsResponse = await this.client.search({
      size: 0,
      index: index,
      body: {
        query: { match_all: {} },
        aggs: {
          total_countries: {
            nested: {
              path: "studyAreaCountries"
            },
            aggs: {
              unique_countries: {
                cardinality: {
                  field: 'studyAreaCountries.abbr'
                }
              }
            }
          }
        }
      },
    });

    const totalCountries = countriesResponse.aggregations?.total_countries.unique_countries.value;
    
    return {studies: totalStudies, creators: totalCreators, countries: totalCountries};
  }

  async getListOfMetadataLanguages() {
    const res = await this.client.indices.get({
      allow_no_indices: true,
      index: "*",
    });
    const indices = Object.keys(res.body);

    // Index names are of the form cmmstudy_${lang}, extract the ${lang} part
    return indices.map((i) => i.split("_")[1]);
  }

  async getSourceRepositoryNames() {
    const res = await this.client.search({
      size: 0,
      body: {
        aggs: {
          publishers: {
            nested: {
              path: "publisherFilter",
            },
            aggs: {
              publisher: {
                terms: {
                  field: "publisherFilter.publisher",
                  order: { _key: "asc" },
                  size: 30,
                },
              },
            },
          },
        },
      },
    });

    // Unwrap the aggregations
    const aggregation = res.aggregations
      ?.publishers as AggregationsNestedAggregate;
    const publisherBuckets = (
      aggregation.publisher as AggregationsSignificantStringTermsAggregate
    ).buckets;

    if (Array.isArray(publisherBuckets)) {
      return publisherBuckets.map((b) => b.key);
    } else {
      return [];
    }
  }

  async getListOfCountries() {
    const res = await this.client.search({
      size: 0,
      body: {
        aggs: {
          studyAreaCountries: {
            nested: {
              path: "studyAreaCountries",
            },
            aggs: {
              country: {
                terms: {
                  field: "studyAreaCountries.searchField",
                  order: { _key: "asc" },
                  size: 1000,
                },
              },
            },
          },
        },
      },
    });

    // Unwrap the aggregations
    const aggregation = res.aggregations
      ?.studyAreaCountries as AggregationsNestedAggregate;
    const countryBuckets = (
      aggregation.country as AggregationsSignificantStringTermsAggregate
    ).buckets;

    if (Array.isArray(countryBuckets)) {
      return countryBuckets.map((b) => b.key);
    } else {
      return [];
    }
  }

  /**
   * Queries Elasticsearch for the indices where a study ID is present
   * @param id the study ID
   * @returns the index names
   */
  async getIndicesForStudyId(id: string, indexPrefix?: string) {
    const res = await this.client.search({
      body: {
        query: {
          ids: {
            values: [id],
          },
        },
      },
      _source: false,
    });

    // Filter out indices that do not share the common prefix with the provided index
    if(indexPrefix){
      const indices = res.hits.hits.map((hit: SearchHit) => hit._index);
      return indices.filter((index: string) => index.startsWith(indexPrefix));
    } else {
      return res.hits.hits.map((hit: SearchHit) => hit._index);
    }
  }

  /**
   * Query used to retrieve similar records for a specific title (for detail page).
   * @param id the document id, used to exclude the original document from the query.
   * @param title the title of the document to retrieve similar records for.
   */
  private static similarQuery(id: string, title: string) {
    return {
      bool: {
        must: {
          match: {
            titleStudy: title,
          },
        },
        must_not: {
          ids: {
            values: [id],
          },
        },
      },
    };
  }
}
