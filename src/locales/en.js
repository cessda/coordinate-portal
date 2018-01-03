module.exports = {
  language: {
    label: 'Language',
    languages: {
      en: 'English',
      de: 'German'
    },
    notAvailable: 'Not available in selected language'
  },
  search: 'Find Social and Economic Research Data',
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
    availability: {
      label: 'Availability',
      placeholder: 'Search availability',
      tooltip: 'Access levels control the availability of the research data.'
    },
    languageOfDataFiles: {
      label: 'Language of data files',
      placeholder: 'Search languages',
      tooltip: 'Language of the research dataset, i.e. the language of the variable names/labels or interview transcriptions etc. The metadata about the dataset may be in different language from the data files.'
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
  reset: {
    query: 'Clear search',
    filters: 'Reset filters'
  },
  resultsPerPage: 'Results per page',
  sortBy: 'Sort by',
  showFilters: 'Show filters',
  hideFilters: 'Hide filters',
  filterSummary: 'Filter summary',
  advancedSearch: 'Advanced search',
  readMore: 'Read more',
  readLess: 'Read less',
  viewJson: 'View JSON',
  goToCollection: 'Go to collection',
  goToStudy: 'Go to study',
  forthcoming: 'Forthcoming'
};
