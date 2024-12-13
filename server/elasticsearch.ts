// Copyright CESSDA ERIC 2017-2024
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

import { Client, ClientOptions } from '@elastic/elasticsearch'
import {
  AggregationsCardinalityAggregate,
  AggregationsNestedAggregate,
  AggregationsStringTermsAggregate,
  QueryDslBoolQuery,
  SearchHitsMetadata
} from "@elastic/elasticsearch/lib/api/types";
import _ from "lodash";
import { CMMStudy } from "../common/metadata";
import { logger } from "./logger";


export default class Elasticsearch {
  private readonly indexName = "coordinate";

  public readonly client: Client;

  constructor(url: string, authentication?: ClientOptions["auth"]) {
    //Create ElasticSearch Client
    this.client = new Client({
      node: url,
      auth: authentication
    });

    logger.info('Elasticsearch client configured');
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
      query: Elasticsearch.similarQuery(id, title),
    });

    const sources = response.hits.hits.map(hit => hit._source);

    return _.compact(sources).map(value => ({
      id: value.id,
      title: value.titleStudy,
    }));
  }

  /**
   * Gets related publications from all indices (except excluded) for one study.
   * @param id the identifier of the study.
   * @param sizeMax max number of related publications.
   * @param excludeIndex optionally exclude results from an index.
   */
  async getRelatedPublications(id: string, sizeMax: number, excludeIndex?: string) {
    const boolQuery: QueryDslBoolQuery = {
      must: [
        {
          match: {
            _id: id
          }
        }
      ]
    }

    if (excludeIndex) {
      boolQuery.must_not = [
        {
          term: {
            _index: excludeIndex
          }
        }
      ];
    }

    const response = await this.client.search<CMMStudy>({
      size: sizeMax,
      _source: ['relatedPublications'],
      index: `${this.indexName}_*`,
      query: {
        bool: boolQuery
      }
    });

    if (!response.hits.hits) {
        return [];
    }

    return response.hits.hits.flatMap(hit => {
        return (hit._source?.relatedPublications || []).map(publication => ({
            title: publication.title,
            holdings: publication.holdings,
            // Add lang according to the language part of index name
            lang: hit._index.split('_')[1]
        }));
    });
  }

  async getTotalStudies() {
    const response = await this.client.search({
      size: 0,
      index: `${this.indexName}_*`,
      query: { match_all: {} },
      aggs: {
        unique_id: {
          cardinality: {
            field: "id"
          }
        }
      }
    });

    // Assert the type as AggregationsCardinalityAggregate, then return the value
    return (response.aggregations?.unique_id as AggregationsCardinalityAggregate).value;
  }

  /**
   * Gets metrics for About page. Index not currently used but could be used
   * to get metrics just for the selected index.
   * @param index the index to retrieve the metrics from.
   */
  async getAboutMetrics(index: string) {
    const studiesResponse = await this.client.search({
      size: 0,
      //index: `${this.indexName}_*`,
      index: `${index.split('_')[0]}_*`,
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

    const totalStudies = (studiesResponse.aggregations?.unique_id as AggregationsCardinalityAggregate).value;

    const creatorsResponse = await this.client.search({
      size: 0,
      index: `${this.indexName}_*`,
      body: {
        aggs: {
          total_creators: {
            nested: {
              path: 'creators'
            },
            aggs: {
              unique_creators: {
                cardinality: {
                  field: 'creators.name.normalized'
                }
              }
            }
          }
        }
      }
    });

    const totalCreators = (creatorsResponse.aggregations?.unique_creators as AggregationsCardinalityAggregate).value;

    const countriesResponse = await this.client.search({
      size: 0,
      index: `${this.indexName}_*`,
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

    const totalCountries = ((countriesResponse.aggregations?.total_countries as AggregationsNestedAggregate).unique_countries as AggregationsCardinalityAggregate).value;
  
    return {studies: totalStudies, creators: totalCreators, countries: totalCountries};
  }
  

  async getListOfMetadataLanguages() {
    const res = await this.client.indices.get({
      allow_no_indices: true,
      index: `${this.indexName}_*`
    });
    const indices = Object.keys(res);

    // Index names are of the form name_${lang}, extract the ${lang} part
    return indices.map(i => i.split("_")[1]);
  }

  async getSourceRepositoryNames() {
    const res = await this.client.search({
      size: 0,
      aggs: {
        publishers: {
          nested: {
            path: "publisherFilter"
          },
          aggs: {
            publisher: {
              terms: {
                field: "publisherFilter.publisher",
                order: { _key: "asc" },
                size: 30
              }
            }
          }
        }
      }
    });

    // Unwrap the aggregations
    const aggregation = res.aggregations?.publishers as AggregationsNestedAggregate;
    const publisherBuckets = (aggregation.publisher as AggregationsStringTermsAggregate).buckets;

    if (Array.isArray(publisherBuckets)) {
      return publisherBuckets.map(b => b.key);
    } else {
      return [];
    }
  }

  async getListOfCountries() {
    const res = await this.client.search({
      size: 0,
      aggs: {
        studyAreaCountries: {
          nested: {
            path: "studyAreaCountries"
          },
          aggs: {
            country: {
              terms: {
                field: "studyAreaCountries.searchField",
                order: { _key: "asc" },
                size: 1000
              }
            }
          }
        }
      }
    });

    // Unwrap the aggregations
    const aggregation = res.aggregations?.studyAreaCountries as AggregationsNestedAggregate;
    const countryBuckets = (aggregation.country as AggregationsStringTermsAggregate).buckets;

    if (Array.isArray(countryBuckets)) {
      return countryBuckets.map(b => b.key);
    } else {
      return [];
    }
  }

  //used for API documentation
  async getListOfTopics() {
    const res = await this.client.search({
      size: 0,
      aggs: {
        classifications: {
          nested: {
            path: "classifications"
          },
          aggs: {
            term: {
              terms: {
                field: "classifications.term",
                order: { _key: "asc" },
                size: 1000
              }
            }
          }
        }
      }
    });

    // Unwrap the aggregations
    const aggregation = res.aggregations?.classifications as AggregationsNestedAggregate;
    const topicBuckets = (aggregation.term as AggregationsStringTermsAggregate).buckets;

    if (Array.isArray(topicBuckets)) {
      return topicBuckets.map(b => b.key);
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
      const indices = res.hits.hits.map(hit => hit._index);
      return indices.filter(index => index.startsWith(indexPrefix));
    } else {
      return res.hits.hits.map(hit => hit._index);
    }
  }

  /**
   * Get the amount of records per OAI-PMH endpoint from Elasticsearch.
   */
  async getEndpoints() {
    const res = await this.client.search<unknown>({
      aggs: {
        aggregationResults: {
          terms: {
            field: "code",
            size: 100
          }
        }
      },
      track_total_hits: false
    });
    const elasticAggs = res.aggregations?.aggregationResults as AggregationsStringTermsAggregate;
    const buckets = elasticAggs.buckets;
    if (Array.isArray(buckets)) {
      return buckets;
    } else {
      return [];
    }
  }

  /**
   * Get the amount of records in the specified language from Elasticsearch.
   * @param lang the language of the records.
   */
  async getRecordCountByLanguage(lang: string): Promise<number | undefined>{
    const response = await this.client.search({
      index: `${this.indexName}_${lang}`,
      track_total_hits: true
    });
    return Elasticsearch.parseTotalHits(response.hits.total);
  }

  /**
   * Extract the total hits from the hits metadata.
   * @returns the total hits, or undefined if not present.
   */
  static parseTotalHits(totalHits: SearchHitsMetadata["total"]) {
    // Calculate the total hits
    switch (typeof totalHits) {
      case "object":
        // If SearchTotalHits object, extract from the value field
        return totalHits.value;
      case "number":
        // If number, extract directly
        return totalHits;
      default:
        // Total hits not present, return undefined
        return undefined;
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
}
