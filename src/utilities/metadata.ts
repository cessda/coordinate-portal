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

import { SearchResponse } from 'elasticsearch';
import _ from 'lodash';
import striptags from 'striptags';

export type CMMStudy = {
  id: string;
  code: string;
  /** Creator */
  creators: string[];
  /** Data collection start data */
  dataCollectionPeriodStartdate: string;
  /** Data collection end date */
  dataCollectionPeriodEnddate: string;
  /** Data collection year */
  dataCollectionYear: number;
  /** Data collection free text */
  dataCollectionFreeTexts: DataCollectionFreeText[];
  /** Terms of data access */
  dataAccessFreeTexts: string[];
  /** Publication year */
  publicationYear: string;
  /** Data collection mode */
  typeOfModeOfCollections: TermVocabAttributes[];
  /** Keywords */
  keywords: TermVocabAttributes[];
  /** Sampling procedure free text */
  samplingProcedureFreeTexts: string[];
  /** Topic classifications */
  classifications: TermVocabAttributes[];
  /** Abstract */
  abstract: string;
  abstractShort: string;
  abstractHighlight: string;
  abstractHighlightShort: string;
  abstractExpanded: boolean;
  /** Study title */
  titleStudy: string;
  titleStudyHighlight: string;
  studyUrl: string;
  /** Study number */
  studyNumber: string;
  /** Time dimension */
  typeOfTimeMethods: TermVocabAttributes[];
  /** Language of data files */
  fileLanguages: string[];
  /** Sampling procedure */
  typeOfSamplingProcedures: VocabAttributes[];
  /** Publisher */
  publisher: Publisher;
  /** Country */
  studyAreaCountries: Country[];
  /** Analysis unit */
  unitTypes: TermVocabAttributes[];
  /** Study Persistent Identifier */
  pidStudies: Pid[];
  lastModified: string;
  langAvailableIn: string[];
  studyXmlSourceUrl: string[];
};

export type Country = {
  abbr: string;
  country: string;
  searchField: string;
}

export type DataCollectionFreeText = {
  dataCollectionFreeText: string;
  event: string;
}

export type Pid = {
  agency: string;
  pid: string;
}

export type Publisher = {
  abbr: string;
  publisher: string;
}

export type TermVocabAttributes = {
  vocab: string;
  vocabUri: string;
  id: string;
  term: string;
}

export type VocabAttributes = {
  vocab: string;
  vocabUri: string;
  id: string;
}

/** 
 * Creates a model to store/display study metadata in the user interface.
 * 
 * The comments indicate the label displayed in the UI for each property (it is not always obvious).
 */
export function getStudyModel(searchResponse: SearchResponse<CMMStudy>): CMMStudy[] {
  return searchResponse.hits.hits.map(data => ({
    id: data._source.id || '',
    titleStudy: data._source.titleStudy || '',
    titleStudyHighlight: typeof data.highlight !== 'undefined' ? stripHTMLElements(data.highlight.titleStudy || '') : '',
    code: data._source.code,
    creators: data._source.creators || [],
    pidStudies: data._source.pidStudies || [],
    abstract: stripHTMLElements(data._source.abstract || ''),
    abstractShort: _.truncate(_.trim(striptags(data._source.abstract || '')), {
      length: 500
    }),
    abstractHighlight: typeof data.highlight != 'undefined' ? stripHTMLElements(data.highlight.abstract || '') : '',
    abstractHighlightShort: typeof data.highlight != 'undefined' ? _.truncate(_.trim(striptags(data.highlight.abstract || '')), {
      length: 500
    }) : '',
    abstractExpanded: false,
    studyAreaCountries: data._source.studyAreaCountries || [],
    typeOfTimeMethods: data._source.typeOfTimeMethods || [],
    unitTypes: data._source.unitTypes || [],
    typeOfSamplingProcedures: data._source.typeOfSamplingProcedures,
    samplingProcedureFreeTexts: _.map(data._source.samplingProcedureFreeTexts || [], text => stripHTMLElements(text)),
    typeOfModeOfCollections: data._source.typeOfModeOfCollections || [],
    dataCollectionPeriodStartdate: data._source.dataCollectionPeriodStartdate || '',
    dataCollectionPeriodEnddate: data._source.dataCollectionPeriodEnddate || '',
    dataCollectionFreeTexts: data._source.dataCollectionFreeTexts || [],
    dataCollectionYear: data._source.dataCollectionYear,
    fileLanguages: data._source.fileLanguages || [],
    publisher: data._source.publisher,
    publicationYear: data._source.publicationYear || '',
    dataAccessFreeTexts: _.map(data._source.dataAccessFreeTexts || [], text => stripHTMLElements(text)),
    studyNumber: data._source.studyNumber || '',
    classifications: data._source.classifications || [],
    keywords: data._source.keywords || [],
    lastModified: data._source.lastModified || '',
    studyUrl: data._source.studyUrl,
    studyXmlSourceUrl: data._source.studyXmlSourceUrl,
    langAvailableIn: _.sortBy(_.map(data._source.langAvailableIn || [], i => i.toUpperCase()))
  }));
}

/**
 * Strip non-styling HTML tags from the given HTML string.
 * @param {string} html the HTML to strip. 
 */
function stripHTMLElements(html: string) {
  return _.trim(
    striptags(html, ['p', 'strong', 'br', 'em', 'i', 's', 'ol', 'ul', 'li', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
  );
}

// Generates study JSON-LD for Google indexing.
export function getJsonLd(data: {[key: string]: any; }): {[key: string]: any;} {
  if (!data) {
    return {};
  }

  // Attempt to split people from organisations in the creator field.
  let creators: {
    [key: string]: any;
  }[] = [];
  for (let i: number = 0; i < data.creators.length; i++) {
    // Format: "Name (Organisation)"
    let matches = /([a-z0-9\x7f-\xff,. -]+) \(([a-z0-9\x7f-\xff,. -]+)\)/gi.exec(data.creators[i]);
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
    'keywords': _.map(data.keywords || [], i => _.upperFirst(i.term)),
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
