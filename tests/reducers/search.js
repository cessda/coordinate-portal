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

import { INIT_SEARCHKIT } from '../../src/actions/search';
import search from '../../src/reducers/search';
import { queryBuilder } from '../../src/utilities/searchkit';

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(search(undefined, { type: INIT_SEARCHKIT })).toEqual({
      loading: true,
      showMobileFilters: false,
      showAdvancedSearch: false,
      showFilterSummary: false,
      expandMetadataPanels: false,
      displayed: [],
      query: Object,
      state: Object,
      totalStudies: 0
    });
  });

  it('should handle INIT_SEARCHKIT', () => {
    expect(
      search(
        {},
        {
          type: 'INIT_SEARCHKIT'
        }
      )
    ).toEqual({});
  });

  it('should handle TOGGLE_LOADING', () => {
    expect(
      search(
        {
          loading: false
        },
        {
          type: 'TOGGLE_LOADING',
          loading: true
        }
      )
    ).toEqual({
      loading: true
    });
  });

  it('should handle TOGGLE_MOBILE_FILTERS', () => {
    expect(
      search(
        {
          showMobileFilters: false
        },
        {
          type: 'TOGGLE_MOBILE_FILTERS'
        }
      )
    ).toEqual({
      showMobileFilters: true
    });
  });

  it('should handle TOGGLE_ADVANCED_SEARCH', () => {
    expect(
      search(
        {
          showAdvancedSearch: false
        },
        {
          type: 'TOGGLE_ADVANCED_SEARCH'
        }
      )
    ).toEqual({
      showAdvancedSearch: true
    });
  });

  it('should handle TOGGLE_SUMMARY', () => {
    expect(
      search(
        {
          showFilterSummary: false
        },
        {
          type: 'TOGGLE_SUMMARY'
        }
      )
    ).toEqual({
      showFilterSummary: true
    });
  });

  it('should handle TOGGLE_METADATA_PANELS', () => {
    expect(
      search(
        {
          expandMetadataPanels: false
        },
        {
          type: 'TOGGLE_METADATA_PANELS'
        }
      )
    ).toEqual({
      expandMetadataPanels: true
    });
  });

  it('should handle TOGGLE_LONG_DESCRIPTION', () => {
    expect(
      search(
        {
          displayed: [
            {
              abstractExpanded: false
            }
          ]
        },
        {
          type: 'TOGGLE_LONG_DESCRIPTION',
          index: 0
        }
      )
    ).toEqual({
      displayed: [
        {
          abstractExpanded: true
        }
      ]
    });
  });

  it('should handle UPDATE_DISPLAYED', () => {
    expect(
      search(
        {},
        {
          type: 'UPDATE_DISPLAYED',
          displayed: {
            hits: {
              hits: []
            }
          }
        }
      )
    ).toEqual({
      displayed: [],
      jsonLd: undefined
    });

    expect(
      search(
        {},
        {
          type: 'UPDATE_DISPLAYED',
          displayed: {
            hits: {
              hits: [{
                _source: {}
              }]
            }
          }
        }
      )
    ).toEqual({
      displayed: [
        {
          id: undefined,
          titleStudy: undefined,
          titleStudyHighlight: '',
          abstract: '',
          abstractExpanded: false,
          abstractShort: '',
          abstractHighlight: '',
          abstractHighlightShort: '',
          classifications: [],
          creators: [],
          code: undefined,
          dataAccessFreeTexts: [],
          dataCollectionFreeTexts: [],
          dataCollectionPeriodEnddate: '',
          dataCollectionPeriodStartdate: '',
          dataCollectionYear: undefined,
          fileLanguages: [],
          keywords: [],
          langAvailableIn: [],
          lastModified: '',
          pidStudies: [],
          publicationYear: '',
          publisher: undefined,
          samplingProcedureFreeTexts: [],
          studyAreaCountries: [],
          studyNumber: '',
          studyUrl: undefined,
          studyXmlSourceUrl: undefined,
          typeOfModeOfCollections: [],
          typeOfTimeMethods: [],
          typeOfSamplingProcedures: [],
          unitTypes: [],
        }
      ],
      jsonLd: {
        '@context': 'http://schema.org/',
        '@type': 'Dataset',
        creator: [],
        dateModified: '',
        datePublished: '',
        description: '',
        identifier: '',
        keywords: [],
        license: [],
        measurementTechnique: '',
        name: undefined,
        sameAs: undefined,
        spatialCoverage: '',
        temporalCoverage: '',
        url: 'http://localhost/',
        variableMeasured: ''
      }
    });

    expect(
      search(
        {},
        {
          type: 'UPDATE_DISPLAYED',
          displayed: {
            hits: {
              hits: [
                {
                  _source: {
                    id: "1",
                    titleStudy: 'Study Title',
                    studyNumber: 'UKDS1234',
                    abstract: 'Abstract',
                    classifications: [
                      {
                        vocab: 'Vocab',
                        vocabUri: 'http://example.com',
                        id: 'UKDS1234',
                        term: 'Term'
                      }
                    ],
                    keywords: [
                      {
                        vocab: 'Vocab',
                        vocabUri: 'http://example.com',
                        id: 'UKDS1234',
                        term: 'Term'
                      }
                    ],
                    typeOfTimeMethods: [
                      {
                        vocab: 'Vocab',
                        vocabUri: 'http://example.com',
                        id: 'UKDS1234',
                        term: 'Term'
                      }
                    ],
                    studyAreaCountries: [
                      {
                        abbr: 'EN',
                        country: 'England',
                        searchField: 'England'
                      }
                    ],
                    unitTypes: [
                      {
                        vocab: 'Vocab',
                        vocabUri: 'http://example.com',
                        id: 'UKDS1234',
                        term: 'Term'
                      }
                    ],
                    publisher: {
                      abbr: 'UKDS',
                      publisher: 'UK Data Service'
                    },
                    publicationYear: '2001-01-01',
                    pidStudies: [
                      {
                        agency: 'UKDS',
                        pid: 'UKDS1234'
                      }
                    ],
                    fileLanguages: ['en'],
                    creators: [
                      'Jane Doe',
                      'University of Essex',
                      'John Smith (University of Essex)',
                      'Joe Bloggs, University of Essex'
                    ],
                    typeOfModeOfCollections: [
                      {
                        vocab: 'Vocab',
                        vocabUri: 'http://example.com',
                        id: 'UKDS1234',
                        term: 'Term'
                      }
                    ],
                    dataCollectionPeriodStartdate: '2001',
                    dataCollectionYear: 2001,
                    dataAccessFreeTexts: ['Data Access Free Texts'],
                    lastModified: '2001-01-01T12:00:00Z',
                    langAvailableIn: ['en'],
                    studyUrl: 'http://example.com'
                  }
                }
              ]
            }
          }
        }
      )
    ).toEqual({
      displayed: [
        {
          id: '1',
          titleStudy: 'Study Title',
          titleStudyHighlight: '',
          abstract: 'Abstract',
          abstractExpanded: false,
          abstractShort: 'Abstract',
          abstractHighlight: '',
          abstractHighlightShort: '',
          classifications: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ],
          code: undefined,
          creators: [
            'Jane Doe',
            'University of Essex',
            'John Smith (University of Essex)',
            'Joe Bloggs, University of Essex'
          ],
          dataAccessFreeTexts: ['Data Access Free Texts'],
          dataCollectionFreeTexts: [],
          dataCollectionPeriodEnddate: '',
          dataCollectionPeriodStartdate: '2001',
          dataCollectionYear: 2001,
          fileLanguages: ['en'],
          keywords: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ],
          langAvailableIn: ['EN'],
          lastModified: '2001-01-01T12:00:00Z',
          pidStudies: [
            {
              agency: 'UKDS',
              pid: 'UKDS1234'
            }
          ],
          publicationYear: '2001-01-01',
          publisher: {
            abbr: 'UKDS',
            publisher: 'UK Data Service'
          },
          samplingProcedureFreeTexts: [],
          studyAreaCountries: [
            {
              abbr: 'EN',
              country: 'England',
              searchField: 'England'
            }
          ],
          studyNumber: 'UKDS1234',
          studyUrl: 'http://example.com',
          studyXmlSourceUrl: undefined,
          typeOfModeOfCollections: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ],
          typeOfTimeMethods: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ],
          typeOfSamplingProcedures: [],
          unitTypes: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ]
        }
      ],
      jsonLd: {
        '@context': 'http://schema.org/',
        '@type': 'Dataset',
        creator: [
          {
            '@type': 'Person',
            name: 'Jane Doe'
          },
          {
            '@type': 'Organization',
            name: 'University of Essex'
          },
          {
            '@type': 'Person',
            affiliation: {
              '@type': 'Organization',
              name: 'University of Essex'
            },
            name: 'John Smith'
          },
          {
            '@type': 'Person',
            affiliation: {
              '@type': 'Organization',
              name: 'University of Essex'
            },
            name: 'Joe Bloggs'
          }
        ],
        dateModified: '2001-01-01',
        datePublished: '2001-01-01',
        description: 'Abstract',
        identifier: 'UKDS1234 (UKDS)',
        keywords: ['Term'],
        license: ['Data Access Free Texts'],
        measurementTechnique: 'Term',
        name: 'Study Title',
        sameAs: 'http://example.com',
        spatialCoverage: 'England',
        temporalCoverage: '2001/',
        url: 'http://localhost/',
        variableMeasured: 'Term'
      }
    });
  });

  it('should handle UPDATE_QUERY', () => {
    // Mock searchkit query.
    const query = {
      query: {
        bool: {
          must: [queryBuilder('search text', {})]
        }
      }
    };

    expect(
      search(
        {
          query: {}
        },
        {
          type: 'UPDATE_QUERY',
          query: query
        }
      )
    ).toEqual({
      query: query
    });
  });

  it('should handle UPDATE_STATE', () => {
    // Mock searchkit state.
    const state = {
      q: 'search text'
    };

    expect(
      search(
        {
          state: {}
        },
        {
          type: 'UPDATE_STATE',
          state: state
        }
      )
    ).toEqual({
      state: state
    });
  });

  it('should handle UPDATE_SIMILARS', () => {
    expect(
      search(
        {
          similars: []
        },
        {
          type: 'UPDATE_SIMILARS',
          similars: [
            {
              id: '1',
              titleStudy: 'Study Title 1'
            },
            {
              id: '2',
              titleStudy: 'Study Title 2'
            },
            {
              id: '3',
              titleStudy: 'Study Title 3'
            },
            {
              id: '4',
              titleStudy: 'Study Title 4'
            }
          ]
        }
      )
    ).toEqual({
      similars: [
        {
          id: '1',
          title: 'Study Title 1'
        },
        {
          id: '2',
          title: 'Study Title 2'
        },
        {
          id: '3',
          title: 'Study Title 3'
        },
        {
          id: '4',
          title: 'Study Title 4'
        }
      ]
    });
  });

  it('should handle RESET_SEARCH', () => {
    const state = {
      loading: true,
      showMobileFilters: false,
      showAdvancedSearch: false,
      showFilterSummary: false,
      expandMetadataPanels: false,
      totalStudies: 0,
      displayed: [],
      query: Object,
      state: Object
    };
    expect(
      search(state, {
        type: 'RESET_SEARCH'
      })
    ).toEqual(state);
  });

  it('should handle unknown action type', () => {
    const state = {
      loading: true,
      showMobileFilters: false,
      showAdvancedSearch: false,
      showFilterSummary: false,
      expandMetadataPanels: false,
      totalStudies: 0,
      displayed: [],
      query: Object,
      state: Object
    };
    expect(search(state, {})).toEqual(state);
  });
});
