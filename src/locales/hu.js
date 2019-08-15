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
module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Consortium of European Social Science Data Archives',
  language: {
    label: 'Language',
    notAvailable: {
      field: 'Not available',
      heading: 'The requested data was not found.',
      content: 'It may not exist or is not available in the selected language. Choose an alternative language or start a new search.'
    }
  },
  search: 'Find Social and Economic Research Data',
  noHits: {
    noResultsFound: 'No results found for "%(query)s" in the selected language.',
    searchWithoutFilters: 'Search for "%(query)s" without filters',
    error: 'We\'re sorry, an issue occurred when fetching your results. Please try again.',
    resetSearch: 'Reset Search'
  },
  filters: {
    topic: {
      label: 'Topic',
      placeholder: 'Search topics',
      tooltip: 'CESSDA Topic Classification serves to identify the general topics, subjects or themes of a study.'
    },
    collectionDates: {
      label: 'Collection years',
      placeholder: 'Search years',
      tooltip: 'The period, in years, when the data were collected.'
    },
    languageOfDataFiles: {
      label: 'Language of data files',
      placeholder: 'Search languages',
      tooltip: 'Language of the research dataset, i.e. the language of the variable names/labels or interview transcriptions etc.'
    },
    country: {
      label: 'Country',
      placeholder: 'Search countries',
      tooltip: 'Country in which the study took place.'
    },
    publisher: {
      label: 'Publisher',
      placeholder: 'Search publishers',
      tooltip: 'Name of the institution publishing the research data. Will usually be the CESSDA Service Provider providing the metadata information.'
    },
    summary: {
      label: 'Filter summary',
      introduction: 'The following filters have been applied to your search.',
      remove: 'Select a filter to remove it from this search.',
      noFilters: 'No additional filters have been applied to your search.',
      close: 'Select <strong>Close</strong> to dismiss this window.'
    }
  },
  numberOfResults: {
    zero: '%(count)s results found',
    one: '%(count)s result found',
    other: '%(count)s results found'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s results found in %(time)sms',
    one: '%(count)s result found in %(time)sms',
    other: '%(count)s results found in %(time)sms'
  },
  sorting: {
    relevance: 'Relevance',
    titleAscending: 'Title (ascending)',
    titleDescending: 'Title (descending)',
    dateAscending: 'Date of collection (ascending)',
    dateDescending: 'Date of collection (descending)'
  },
  advancedSearch: {
    label: 'Advanced search',
    introduction: 'The following special characters can be used to perform advanced search queries:',
    and: '<span class="%(className)s">+</span> signifies <strong>AND</strong> operation.',
    or: '<span class="%(className)s">|</span> signifies <strong>OR</strong> operation.',
    negates: '<span class="%(className)s">-</span> <strong>negates</strong> a single token.',
    phrase: '<span class="%(className)s">"</span> wraps a number of tokens to signify a <strong>phrase</strong> for searching.',
    prefix: '<span class="%(className)s">*</span> at the end of a term signifies a <strong>prefix</strong> query.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> signify <strong>precedence</strong>.',
    distance: '<span class="%(className)s">~N</span> after a word signifies edit <strong>distance</strong> (fuzziness).',
    slop: '<span class="%(className)s">~N</span> after a phrase signifies <strong>slop</strong> amount.',
    escaping: {
      heading: 'Escaping',
      content: 'The above characters are reserved. In order to search for any of these special characters, they will need to be escaped with <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Default operator',
      content: 'The default operator when there are no special characters in a given search term is <strong>OR</strong>. For example when searching for <em class="%(className)s">Social Science</em>, this will be interpreted as <em class="%(className)s">Social</em> <strong>OR</strong> <em class="%(className)s">Science</em>.'
    }
  },
  reset: {
    query: 'Clear search',
    filters: 'Reset filters'
  },
  similarResults: {
    heading: 'Similar results',
    notAvailable: 'No similar results found.'
  },
  resultsPerPage: 'Results per page',
  sortBy: 'Sort by',
  showFilters: 'Show filters',
  hideFilters: 'Hide filters',
  readMore: 'Read more',
  readLess: 'Read less',
  viewJson: 'View JSON',
  goToStudy: 'Go to study',
  forthcoming: 'Forthcoming',
  back: 'Back',
  close: 'Close',
  metadata: {
    studyTitle: 'Study title',
    creator: 'Creator',
    studyPersistentIdentifier: 'Study Persistent Identifier',
    abstract: 'Abstract',
    methodology: 'Methodology',
    country: 'Country',
    timeDimension: 'Time dimension',
    analysisUnit: 'Analysis unit',
    samplingProcedure: 'Sampling procedure',
    dataCollectionMethod: 'Data collection method',
    dataCollectionPeriod: 'Data collection period',
    languageOfDataFiles: 'Language of data files',
    access: 'Access',
    publisher: 'Publisher',
    yearOfPublication: 'Year of publication',
    termsOfDataAccess: 'Terms of data access',
    studyNumber: 'Study number',
    topics: 'Topics',
    keywords: 'Keywords'
  },
  footer: {
    followUsOn: 'Follow us on',
    privacy: 'Privacy Policy',
    aup: 'Acceptable Use Policy',
    tools: 'CESSDA Tools & Services'
  }
};
