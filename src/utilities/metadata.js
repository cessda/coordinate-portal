// @flow

import * as React from 'react';
import * as _ from 'lodash';
import * as striptags from 'striptags';

export function getStudyModel(data: Object): Object {
  return {
    id: data._source.id || '',
    studyNumber: data._source.studyNumber || '',
    titleStudy: data._source.titleStudy || '',
    abstract: _.trim(
      striptags(_.replace(_.replace(data._source.abstract || '', '</p>', '\n\n'), '<p>', ''))),
    abstractShort: _.truncate(_.trim(striptags(data._source.abstract || '')), {
      length: 500
    }),
    abstractExpanded: false,
    classifications: data._source.classifications || [],
    keywords: data._source.keywords || [],
    studyAreaCountries: data._source.studyAreaCountries || [],
    unitTypes: data._source.unitTypes || [],
    pidStudies: data._source.pidStudies || [],
    fileLanguages: data._source.fileLanguages || [],
    creators: data._source.creators || [],
    typeOfTimeMethods: data._source.typeOfTimeMethods || [],
    typeOfModeOfCollections: data._source.typeOfModeOfCollections || [],
    samplingProcedureFreeTexts: data._source.samplingProcedureFreeTexts || [],
    dataCollectionFreeTexts: data._source.dataCollectionFreeTexts || [],
    dataAccessFreeTexts: data._source.dataAccessFreeTexts || [],
    publicationYear: data._source.publicationYear || '',
    dataCollectionPeriodStartdate: data._source.dataCollectionPeriodStartdate || '',
    dataCollectionPeriodEnddate: data._source.dataCollectionPeriodEnddate || '',
    lastModified: data._source.lastModified || '',
    publisher: data._source.publisher ? data._source.publisher.publisher : '',
    studyUrl: data._source.studyUrl,
    isActive: data._source.isActive
  };
}

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
    'keywords': _.map(data.keywords || [], (i) => _.startCase(i.term)),
    'variableMeasured': _.map(data.unitTypes, 'term').join(', '),
    'measurementTechnique': _.map(data.typeOfModeOfCollections, 'term').join(', '),
    'license': data.dataAccessFreeTexts || '',
    'identifier': _.map(data.pidStudies || [], (i) => i.pid + ' (' + _.startCase(i.agency) +
                                                      ')').join(', '),
    'creator': creators,
    'temporalCoverage': data.dataCollectionPeriodStartdate.substring(0, 10) + '/' +
                        data.dataCollectionPeriodEnddate.substring(0, 10),
    'spatialCoverage': _.map(data.studyAreaCountries, 'country').join(', '),
    'datePublished': data.publicationYear.substring(0, 10),
    'dateModified': data.lastModified.substring(0, 10)
  };
}
