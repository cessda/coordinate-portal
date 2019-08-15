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
  cessda: 'Konzorcium Európskych spoločenskovedných dátových archívov',
  language: {
    label: 'Jazyk',
    notAvailable: {
      field: 'Nie je k dispozícii',
      heading: 'Požadované dáta neboli nájdené.',
      content: 'Dáta neexistujú alebo nie sú k dispozícii v zvolenom jazyku. Zvoľte iný jazyk, alebo začnite nové vyhľadávanie.'
    }
  },
  search: 'Nájdi dáta zo sociálnych a ekonomických výskumov',
  noHits: {
    noResultsFound: 'Pre hľadanie "%(query)s" neboli nájdené žadne výsledky vo zvolenom jazyku.',
    searchWithoutFilters: 'Hľadaj "%(query)s" bez použitia filtrov',
    error: 'Ľutujeme, ale vyskytol sa problém pri preberaní výsledkov. Skúste znovu, prosím.',
    resetSearch: 'Vynulovať hľadanie'
  },
  filters: {
    topic: {
      label: 'Téma',
      placeholder: 'Témy na vyhľadávanie',
      tooltip: 'Klasifikácia tém CESSDA slúži na identifikovanie základných tém a predmetov výskumu.'
    },
    collectionDates: {
      label: 'Roky zberu dát',
      placeholder: 'Hľadanie (roky)',
      tooltip: 'Obdobie, v rokoch, kedy boli dáta zozbierané.'
    },
    languageOfDataFiles: {
      label: 'Jazyk dátových súborov',
      placeholder: 'Jazyk, v ktorom prebieha vyhľadávanie',
      tooltip: 'Jazyk výskumného súboru. Ide o jazyk, v ktorom sú uvádzané premenné, ich popisky, prepisi rozhovorov a pod.'
    },
    country: {
      label: 'Štát',
      placeholder: 'Krajina vyhľadávania',
      tooltip: 'Krajina, v ktorej sa realizoval zber dát.'
    },
    publisher: {
      label: 'Vydavateľ',
      placeholder: 'Hľadaj vo vydavateľoch',
      tooltip: 'Názov inštitúcie publikujúce výskumné dáta. Vo väčšine prípadov pôjde o poskytovateľa služby CESSDA, ktorý poskytuje metadáta k výskumom.'
    },
    summary: {
      label: 'Prehľad filtrov',
      introduction: 'Vo vašom vyhľadávaní boli použité nasledujúce filtre.',
      remove: 'Zvoľte filte, ktorý cchete odstránuiť z tohoto vyhľadávania.',
      noFilters: 'Vo vašom vyhľadávaní neboli použité žiadne ďalšie filtrovacie podmienky.',
      close: 'Vyberte <strong>Zavri</strong> na zatvorenie tohoto okna.'
    }
  },
  numberOfResults: {
    zero: '%(count)s žiaden nájdený výsledok',
    one: '%(count)s jeden nájdený výsledok',
    other: '%(count)s nájdené výsledky'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s žiaden nájdený výsledok v %(time)sms',
    one: '%(count)s jeden nájdený výsledok v %(time)sms',
    other: '%(count)s nájdené výsledky v %(time)sms'
  },
  sorting: {
    relevance: 'Relevantnosť',
    titleAscending: 'Čas (vzostupne)',
    titleDescending: 'Názov (zostupne)',
    dateAscending: 'Dátum zberu dát (vzostupne)',
    dateDescending: 'Dátum zberu dát (zostupne)'
  },
  advancedSearch: {
    label: 'Rozšírené vyhľadávanie',
    introduction: 'V rozšírenom vyhľadávaní môžete použiť nasledovné špeciálne znaky:',
    and: '<span class="%(className)s">+</span> signifies <strong>AND</strong> operation.',
    or: '<span class="%(className)s">|</span> signifies <strong>OR</strong> operation.',
    negates: '<span class="%(className)s">-</span> <strong>negates</strong> a single token.',
    phrase: '<span class="%(className)s">"</span> wraps a number of tokens to signify a <strong>phrase</strong> for searching.',
    prefix: '<span class="%(className)s">*</span> at the end of a term signifies a <strong>prefix</strong> query.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> signify <strong>precedence</strong>.',
    distance: '<span class="%(className)s">~N</span> after a word signifies edit <strong>distance</strong> (fuzziness).',
    slop: '<span class="%(className)s">~N</span> after a phrase signifies <strong>slop</strong> amount.',
    escaping: {
      heading: 'Špeciálne znaky',
      content: 'Vyššie uvedené znaky sú vyhradené. Ak ich cete vyhľadávať, treba pred ne vložiť znak <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Predvolený operátor',
      content: 'Predvolený operátor, ktorý sa použije ak neboli použité žiadne špeciálne znaky vo vyhľadávaní je <strong>OR</strong>. Napríklad pri hľadaní <em class="%(className)s">spoločenské vedy</em>, hľadanie bude interpretované ako <em class="%(className)s">spoločenské</em> <strong>OR</strong> <em class="%(className)s">vedy</em>.'
    }
  },
  reset: {
    query: 'Vymazať hľadanie',
    filters: 'Vymazať nastavené filtre'
  },
  similarResults: {
    heading: 'Podobné výsledky',
    notAvailable: 'Neboli nájdené podobné výsledky.'
  },
  resultsPerPage: 'Počet výsledkov na stranu',
  sortBy: 'Zoradené podľa',
  showFilters: 'Zobraz filtre',
  hideFilters: 'Skryť filtre',
  readMore: 'Čítaj viac',
  readLess: 'Čítaj menej',
  viewJson: 'Zobraz JSON',
  goToStudy: 'Choď na štúdiu',
  forthcoming: 'Vychádza (v tlači)',
  back: 'Späť',
  close: 'Zatvoriť',
  metadata: {
    studyTitle: 'Názov štúdie',
    creator: 'Tvorca',
    studyPersistentIdentifier: 'Trvalý identifikátor štúdie',
    abstract: 'Abstrakt',
    methodology: 'Methodológia',
    country: 'Krajina',
    timeDimension: 'Časové rozmedzie',
    analysisUnit: 'Analyzované jednotky',
    samplingProcedure: 'Výber výskumnej vzorky',
    dataCollectionMethod: 'Metóda zberu dát',
    dataCollectionPeriod: 'Obdobie zberu dát',
    languageOfDataFiles: 'Jazyk dátového súboru',
    access: 'Prístup',
    publisher: 'Vydavateľ',
    yearOfPublication: 'Rok vydania',
    termsOfDataAccess: 'Podmienky prístupu',
    studyNumber: 'číslo štúdie',
    topics: 'Predmety',
    keywords: 'Kľúčové slová'
  },
  footer: {
    followUsOn: 'Sledujte nás na',
    privacy: 'Uchovávanie osobných dát',
    aup: 'Acceptable Use Policy',
    tools: 'CESSDA Tools & Services'
  }
};
