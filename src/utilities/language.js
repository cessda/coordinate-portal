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
export function getLanguages(): Object[] {
  // Register translations stored in the "/locales" directory by adding them to the array below.
  // To add a new language with an associated Elasticsearch index, use the following format:
  // {
  //   code   : The 2 letter ISO code for this language.
  //   label  : The native label for this language.
  //   index  : The Elasticsearch index containing data for this language.
  // }
  return [
  {
    code: 'cs',
    label: 'čeština',
    index: 'cmmstudy_cs'
  }, {
    code: 'da',
    label: 'dansk',
    index: 'cmmstudy_da'
  },
  {
    code: 'de',
    label: 'Deutsch',
    index: 'cmmstudy_de'
  },
  {
    code: 'el',
    label: 'Ελληνικά',
    index: 'cmmstudy_el'
  }, {
    code: 'en',
    label: 'English',
    index: 'cmmstudy_en'
  }, {
    code: 'et',
    label: 'eesti',
    index: 'cmmstudy_et'
  }, {
    code: 'fi',
    label: 'suomi',
    index: 'cmmstudy_fi'
  },
  {
    code: 'fr',
    label: 'Francais',
    index: 'cmmstudy_fr'
  }, {
    code: 'hu',
    label: 'magyar',
    index: 'cmmstudy_hu'
  }, {
    code: 'it',
    label: 'Italiano',
    index: 'cmmstudy_it'
  }, {
    code: 'nl',
    label: 'Nederlands',
    index: 'cmmstudy_nl'
  }, {
    code: 'no',
    label: 'Norsk',
    index: 'cmmstudy_no'
  }, {
    code: 'pt',
    label: 'Português',
    index: 'cmmstudy_pt'
  }, {
    code: 'sk',
    label: 'Slovencina',
    index: 'cmmstudy_sk'
  }, {
    code: 'sl',
    label: 'Slovenski',
    index: 'cmmstudy_sl'
  }, {
    code: 'sr',
    label: 'српски језик',
    index: 'cmmstudy_sr'
  }, {
    code: 'sv',
    label: 'Svenska',
    index: 'cmmstudy_sv'
  }
  ];
}
