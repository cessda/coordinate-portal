// @flow

import en from '../locales/en';
import de from '../locales/de';
import fi from '../locales/fi';

export function getLanguages(): Object[] {
  // Register translations stored in the "/locales" directory by adding them to the array below.
  // To add a new language with an associated Elasticsearch index, use the following format:
  // {
  //   code   : The 2 letter ISO code for this language.
  //   label  : The native label for this language.
  //   index  : The Elasticsearch index containing data for this language.
  //   locale : The imported locale for this language.
  // }
  return [{
    code: 'en',
    label: 'English',
    index: 'cmmstudy_en',
    locale: en
  }, {
    code: 'de',
    label: 'Deutsch',
    index: 'cmmstudy_de',
    locale: de
  }, {
    code: 'fi',
    label: 'Suomi',
    index: 'cmmstudy_fi',
    locale: fi
  }];
}
