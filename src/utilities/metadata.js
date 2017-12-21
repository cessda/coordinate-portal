// @flow

import * as React from 'react';
import * as _ from 'lodash';
import * as striptags from 'striptags';
import counterpart from 'counterpart';

export function getDataInLanguage(field: Object, language: string, defaultValue?: mixed,
                                  asArray?: boolean): any {
  // Field does not exist in data so return default value if provided.
  if (field === undefined) {
    return defaultValue || undefined;
  }

  // Ideal: Return preferred language.
  if (!_.isEmpty(field[language])) {
    return asArray ? field[language] : (field[language][0] || field[language]);
  }

  // Fallback: Return no language attribute (nn).
  if (!_.isEmpty(field['nn'])) {
    return asArray ? field['nn'] : (field['nn'][0] || field['nn']);
  }

  // Last resort: Return first value in carbon copy attribute (cc).
  if (!_.isEmpty(field['cc'])) {
    return asArray ? [field['cc'][0]] : field['cc'][0];
  }

  // If all else fails, return message indicating not available.
  let text: string = counterpart.translate('language.notAvailable');
  return asArray ? [text] : text;
}

export function getLanguages(item: Object, data: Object): void {
  if (data._source.dc.title === undefined) {
    return;
  }
  // Generate list of languages by examining child properties of title field.
  item.languages = _.filter(_.map(_.keys(data._source.dc.title), (language) => {
    return language.toUpperCase();
  }), (language) => {
    // Skip fields which are not valid languages.
    return language !== 'ALL' && // Catch-all field.
           language !== 'AC' &&  // Auto-complete field.
           language !== 'NN' &&  // No-language field.
           language !== 'CC';    // Carbon-copy field.
  });
}

export function getDescription(item: Object, language: string, data: Object): void {
  if (data._source.dc.description === undefined) {
    return;
  }

  item.description = [];
  let description: string[] = getDataInLanguage(data._source.dc.description, language, [], true);
  for (let i: number = 0; i < description.length; i++) {
    let desc: string = _.trim(striptags(description[i]));
    if (desc.length > 30) {
      item.description.push(desc);
    }
  }
  if (item.description.length > 0) {
    item.descriptionShort = _.truncate(item.description[0], {
      length: 500
    });
  }
  item.descriptionExpanded = false;
}

export function getSource(item: Object, data: Object): void {
  if (data._source.dc.identifier === undefined) {
    return;
  }

  if (data._source.setSpec !== undefined && data._source.setSpec[0].trim() === '20') {
    item.sourceUrl = data._source.dc.identifier.nn[0].trim();
  } else {
    let sorted: string[] = data._source.dc.identifier.nn.sort();
    for (let i: number = 0; i < sorted.length; i++) {
      let id = sorted[i].trim();
      if (_.startsWith(id, '10.') || _.startsWith(id, 'doi:')) {
        item.sourceUrl = 'http://dx.doi.org/' + sorted[i].trim();
      }
      if (_.startsWith(id, 'urn:nbn:de:')) {
        item.sourceUrl = 'https://nbn-resolving.org/' + sorted[i].trim();
      }
      if (_.includes(id, 'hdl')) {
        item.sourceUrl = 'https://hdl.handle.net/' + id.replace('hdl:', '').trim();
      }
      if (_.startsWith(id, 'http')) {
        item.sourceUrl = id;
      }
    }
  }

  item.sourceIsCollection = _.includes(data._id, 'api_worldbank');
}
