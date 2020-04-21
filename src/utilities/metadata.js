// @flow
// Copyright CESSDA ERIC 2017-2019
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



import * as React from 'react';
import * as _ from 'lodash';
import striptags from 'striptags';

// Creates a model to store/display study metadata in the user interface.
// The comments indicate the label displayed in the UI for each property (it is not always obvious).
export function getStudyModel(data: Object): Object {
  return {
    // [Not visible in user interface]
    id: data._source.id || '',
    // "Study title"
    titleStudy: data._source.titleStudy || '',
    // "Creator"
    creators: data._source.creators || [],
    // "Study Persistent Identifier"
    pidStudies: data._source.pidStudies || [],
    // "Abstract"
    abstract: _.trim(
      striptags(_.replace(_.replace(data._source.abstract || '', '</p>', '\n\n'), '<p>', ''))),
    abstractShort: _.truncate(_.trim(striptags(data._source.abstract || '')), {
      length: 500
    }),
    abstractExpanded: false,
    // "Country"
    studyAreaCountries: data._source.studyAreaCountries || [],
    // "Time dimension"
    typeOfTimeMethods: data._source.typeOfTimeMethods || [],
    // "Analysis unit"
    unitTypes: data._source.unitTypes || [],
    // "Sampling procedure"
    samplingProcedureFreeTexts: data._source.samplingProcedureFreeTexts || [],
    // "Data collection mode"
    typeOfModeOfCollections: data._source.typeOfModeOfCollections || [],
    // "Data collection period"
    dataCollectionPeriodStartdate: data._source.dataCollectionPeriodStartdate || '',
    dataCollectionPeriodEnddate: data._source.dataCollectionPeriodEnddate || '',
    dataCollectionFreeTexts: data._source.dataCollectionFreeTexts || [],
    // "Language of data files"
    fileLanguages: data._source.fileLanguages || [],
    // "Publisher"
    publisher: data._source.publisher ? data._source.publisher.publisher : '',
    // "Year of publication"
    publicationYear: data._source.publicationYear || '',
    // "Terms of data access"
    dataAccessFreeTexts: data._source.dataAccessFreeTexts || [],
    // "Study number"
    studyNumber: data._source.studyNumber || '',
    // "Topic"
    classifications: data._source.classifications || [],
    // "Keyword"
    keywords: data._source.keywords || [],
    // [Not visible in user interface]
    lastModified: data._source.lastModified || '',
    // [Not visible in user interface]
    studyUrl: data._source.studyUrl,
    // [Not visible in user interface]
    isActive: data._source.isActive,
    // [List of other metadata languages used for result buttons]
    langAvailableIn: _.sortBy(_.map(data._source.langAvailableIn || [], (i) => (i.toUpperCase())))
  };
}

// Generates study JSON-LD for Google indexing.
export function getJsonLd(data: Object): Object {
  if (!data) {
    return {};
  }

  // Attempt to split people from organisations in the creator field.
  let creators: Object[] = [];
  for (let i: number = 0; i < data.creators.length; i++) {
    // Format: "Name (Organisation)"
    let matches: string[] = /([a-z0-9\x7f-\xff,. -]+) \(([a-z0-9\x7f-\xff,. -]+)\)/gi.exec(
      data.creators[i]);
    if (matches) {
      creators.push({
        '@type': 'Person',
        'name': _.trim(matches[1]),
        'affiliation': {
          '@type': 'Organization',
          'name': _.trim(matches[2])
        }
      });
      continue;
    }
    // Format: "Name, Organisation"
    matches = /([a-z0-9\x7f-\xff,. -]+),([a-z0-9\x7f-\xff,. -]+)/gi.exec(data.creators[i]);
    if (matches) {
      creators.push({
        '@type': 'Person',
        'name': _.trim(matches[1]),
        'affiliation': {
          '@type': 'Organization',
          'name': _.trim(matches[2])
        }
      });
      continue;
    }
    // Assume organisation if it contains any of the following words.
    creators.push({
      '@type': _.includes(data.creators[i].toLowerCase(), 'university') ||
               _.includes(data.creators[i].toLowerCase(), 'institute') ||
               _.includes(data.creators[i].toLowerCase(), 'polytechnic') ||
               _.includes(data.creators[i].toLowerCase(), 'government') ||
               _.includes(data.creators[i].toLowerCase(), 'department') ||
               _.includes(data.creators[i].toLowerCase(), 'faculty') ||
               _.includes(data.creators[i].toLowerCase(), 'division') ||
               _.includes(data.creators[i].toLowerCase(), 'agency') ||
               _.includes(data.creators[i].toLowerCase(), 'unit') ? 'Organization' : 'Person',
      'name': _.trim(data.creators[i])
    });
  }

  return {
    '@context': 'http://schema.org/',
    '@type': 'Dataset',
    'name': data.titleStudy,
    'description': data.abstract,
    'url': window.location.href,
    'sameAs': data.studyUrl,
    'keywords': _.map(data.keywords || [], (i) => _.upperFirst(i.term)),
    'variableMeasured': _.map(data.unitTypes, 'term').join(', '),
    'measurementTechnique': _.map(data.typeOfModeOfCollections, 'term').join(', '),
    'license': data.dataAccessFreeTexts || '',
    'identifier': _.map(data.pidStudies || [], (i) => i.pid + ' (' + _.upperFirst(i.agency) +
                                                      ')').join(', '),
    'creator': creators,
    'temporalCoverage': data.dataCollectionPeriodStartdate.substring(0, 10) + '/' +
                        data.dataCollectionPeriodEnddate.substring(0, 10),
    'spatialCoverage': _.map(data.studyAreaCountries, 'country').join(', '),
    'datePublished': data.publicationYear.substring(0, 10),
    'dateModified': data.lastModified.substring(0, 10)
  };
}
