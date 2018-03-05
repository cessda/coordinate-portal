module.exports = {
  application: 'Products and Services Catalogue',
  language: {
    label: 'Language',
    languages: {
      en: 'English',
      de: 'German'
    },
    availability: 'This data is available in the following languages.',
    notAvailable: 'Not available in selected language'
  },
  search: 'Find Social and Economic Research Data',
  noHits: {
    noResultsFound: 'No results found for %(query)s.',
    searchWithoutFilters: 'Search for %(query)s without filters',
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
    availability: {
      label: 'Availability',
      placeholder: 'Search availability',
      tooltip: 'Access levels control the availability of the research data.'
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
  similarResults: 'Similar results',
  resultsPerPage: 'Results per page',
  sortBy: 'Sort by',
  showFilters: 'Show filters',
  hideFilters: 'Hide filters',
  readMore: 'Read more',
  readLess: 'Read less',
  viewJson: 'View JSON',
  goToCollection: 'Go to collection',
  goToStudy: 'Go to study',
  forthcoming: 'Forthcoming',
  back: 'Back',
  close: 'Close',
  metadata: {
    methodology: 'Methodology',
    access: 'Access',
    topics: 'Topics',
    keywords: 'Keywords'
  },
  footer: {
    organisationsFeed: 'Organisations Feed',
    about: 'About',
    consortium: 'Consortium',
    training: 'Training',
    privacy: 'Privacy Policy'
  }
};
