import { getJsonLd, getStudyModel } from '../../src/utilities/metadata';

describe('Metadata utilities', () => {
  describe('getStudyModel()', () => {
    it('should return a populated study model', () => {
      expect(
        getStudyModel({
          _source: {
            id: 1,
            titleStudy: 'Study Title',
            abstract: 'Abstract',
            abstractExpanded: false,
            abstractShort: 'Abstract',
            classifications: [
              {
                id: 'UKDS1234',
                term: 'Term',
                vocab: 'Vocab',
                vocabUri: 'http://example.com'
              }
            ],
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
            fileLanguages: ['en'],
            isActive: true,
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
              publisher: 'UK Data Service'
            },
            samplingProcedureFreeTexts: [],
            studyAreaCountries: [
              {
                abbr: 'EN',
                country: 'England'
              }
            ],
            studyNumber: 'UKDS1234',
            studyUrl: 'http://example.com',
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
            unitTypes: [
              {
                id: 'UKDS1234',
                term: 'Term',
                vocab: 'Vocab',
                vocabUri: 'http://example.com'
              }
            ]
          }
        })
      ).toEqual({
        id: 1,
        titleStudy: 'Study Title',
        abstract: 'Abstract',
        abstractExpanded: false,
        abstractShort: 'Abstract',
        classifications: [
          {
            id: 'UKDS1234',
            term: 'Term',
            vocab: 'Vocab',
            vocabUri: 'http://example.com'
          }
        ],
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
        fileLanguages: ['en'],
        isActive: true,
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
        publisher: 'UK Data Service',
        samplingProcedureFreeTexts: [],
        studyAreaCountries: [
          {
            abbr: 'EN',
            country: 'England'
          }
        ],
        studyNumber: 'UKDS1234',
        studyUrl: 'http://example.com',
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
        unitTypes: [
          {
            id: 'UKDS1234',
            term: 'Term',
            vocab: 'Vocab',
            vocabUri: 'http://example.com'
          }
        ]
      });
    });

    it('should return a study model with default values', () => {
      expect(
        getStudyModel({
          _source: {}
        })
      ).toEqual({
        id: '',
        titleStudy: '',
        abstract: '',
        abstractExpanded: false,
        abstractShort: '',
        classifications: [],
        creators: [],
        dataAccessFreeTexts: [],
        dataCollectionFreeTexts: [],
        dataCollectionPeriodEnddate: '',
        dataCollectionPeriodStartdate: '',
        fileLanguages: [],
        keywords: [],
        langAvailableIn: [],
        lastModified: '',
        pidStudies: [],
        publicationYear: '',
        publisher: '',
        samplingProcedureFreeTexts: [],
        studyAreaCountries: [],
        studyNumber: '',
        typeOfModeOfCollections: [],
        typeOfTimeMethods: [],
        unitTypes: []
      });
    });
  });

  describe('getJsonLd()', () => {
    it('should return generated JSON-LD schema with valid data', () => {
      expect(
        getJsonLd({
          id: 1,
          titleStudy: 'Study Title',
          abstract: 'Abstract',
          abstractExpanded: false,
          abstractShort: 'Abstract',
          classifications: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ],
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
          fileLanguages: ['en'],
          isActive: true,
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
          publisher: 'UK Data Service',
          samplingProcedureFreeTexts: [],
          studyAreaCountries: [
            {
              abbr: 'EN',
              country: 'England'
            }
          ],
          studyNumber: 'UKDS1234',
          studyUrl: 'http://example.com',
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
          unitTypes: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ]
        })
      ).toEqual({
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
      });
    });

    it('should return generated JSON-LD schema with default values', () => {
      expect(
        getJsonLd({
          id: 1,
          titleStudy: 'Study Title',
          abstract: 'Abstract',
          abstractExpanded: false,
          abstractShort: 'Abstract',
          classifications: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ],
          creators: [
            'Jane Doe',
            'University of Essex',
            'John Smith (University of Essex)',
            'Joe Bloggs, University of Essex'
          ],
          dataAccessFreeTexts: undefined,
          dataCollectionFreeTexts: [],
          dataCollectionPeriodEnddate: '',
          dataCollectionPeriodStartdate: '2001',
          fileLanguages: ['en'],
          isActive: true,
          keywords: undefined,
          langAvailableIn: ['EN'],
          lastModified: '2001-01-01T12:00:00Z',
          pidStudies: undefined,
          publicationYear: '2001-01-01',
          publisher: 'UK Data Service',
          samplingProcedureFreeTexts: [],
          studyAreaCountries: [
            {
              abbr: 'EN',
              country: 'England'
            }
          ],
          studyNumber: 'UKDS1234',
          studyUrl: 'http://example.com',
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
          unitTypes: [
            {
              id: 'UKDS1234',
              term: 'Term',
              vocab: 'Vocab',
              vocabUri: 'http://example.com'
            }
          ]
        })
      ).toEqual({
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
        identifier: '',
        keywords: [],
        license: '',
        measurementTechnique: 'Term',
        name: 'Study Title',
        sameAs: 'http://example.com',
        spatialCoverage: 'England',
        temporalCoverage: '2001/',
        url: 'http://localhost/',
        variableMeasured: 'Term'
      });
    });

    it('should return empty object with invalid data', () => {
      expect(getJsonLd()).toEqual({});
    });
  });
});
