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



// translations not available for all languages
// data not available for all languages
import en from '../locales/en';

export function getLanguages(): Object[] {
  // Register translations stored in the "/locales" directory by adding them to the array below.
  // To add a new language with an associated Elasticsearch index, use the following format:
  // {
  //   code   : The 2 letter ISO code for this language.
  //   label  : The native label for this language.
  //   index  : The Elasticsearch index containing data for this language.
  //   locale : The imported locale for this language.
  // }
  return [
  {
    code: 'cs',
    label: 'čeština',
    index: 'cmmstudy_cs',
    locale: en
  }, {
    code: 'da',
    label: 'dansk',
    index: 'cmmstudy_da',
    locale: en
  },
  {
    code: 'de',
    label: 'Deutsch',
    index: 'cmmstudy_de',
    locale: en
  },
  {
    code: 'el',
    label: 'Ελληνικά',
    index: 'cmmstudy_el',
    locale: en
  }, {
    code: 'en',
    label: 'English',
    index: 'cmmstudy_en',
    locale: en
  }, {
    code: 'et',
    label: 'eesti',
    index: 'cmmstudy_et',
    locale: en
  }, {
    code: 'fi',
    label: 'suomi',
    index: 'cmmstudy_fi',
    locale: en
  },
  {
    code: 'fr',
    label: 'Francais',
    index: 'cmmstudy_fr',
    locale: en
  }, {
    code: 'hu',
    label: 'magyar',
    index: 'cmmstudy_hu',
    locale: en
  }, {
    code: 'it',
    label: 'Italiano',
    index: 'cmmstudy_it',
    locale: en
  }, {
    code: 'nl',
    label: 'Nederlands',
    index: 'cmmstudy_nl',
    locale: en
  }, {
    code: 'no',
    label: 'Norsk',
    index: 'cmmstudy_no',
    locale: en
  }, {
    code: 'pt',
    label: 'Português',
    index: 'cmmstudy_pt',
    locale: en
  }, {
    code: 'sk',
    label: 'Slovencina',
    index: 'cmmstudy_sk',
    locale: en
  }, {
    code: 'sl',
    label: 'Slovenski',
    index: 'cmmstudy_sl',
    locale: en
  }, {
    code: 'sr',
    label: 'српски језик',
    index: 'cmmstudy_sr',
    locale: en
  }, {
    code: 'sv',
    label: 'Svenska',
    index: 'cmmstudy_sv',
    locale: en
  }
  ];
}
