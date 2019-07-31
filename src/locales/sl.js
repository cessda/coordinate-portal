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
  cessda: 'Konzorcij evropskih družboslovnih arhivov',
  language: {
    label: 'Jezik',
    notAvailable: {
      field: 'Ni na voljo',
      heading: 'Zahtevanih podatkov ni bilo mogoče najti.',
      content: 'Morda ne obstaja ali ni na voljo v izbranem jeziku. Izberite drug jezik ali začnite novo iskanje.'
    }
  },
  search: 'Poiščite podatke družbenih in ekonomskih raziskav',
  noHits: {
    noResultsFound: 'Nismo našli rezultatov za "%(query)s" v izbranem jeziku.',
    searchWithoutFilters: 'Poišči "%(query)s" brez filtrov',
    error: 'Žal je prišlo do težav pri pridobivanju vaših rezultatov. Prosim poskusite ponovno.',
    resetSearch: 'Ponastavi iskanje'
  },
  filters: {
    topic: {
      label: 'Vsebinsko področje',
      placeholder: 'Išči po vsebinskih področjih',
      tooltip: 'Vsebinska področja CESSDA se uporabljajo za prepoznavanje splošnih vsebinskih področij, podpodročij in tem raziskav.'
    },
    collectionDates: {
      label: 'Leto zbiranja podatkov',
      placeholder: 'Išči po letu zbiranja',
      tooltip: 'Obdobje (v letih) ko je potekalo zbiranje podatkov.'
    },
    languageOfDataFiles: {
      label: 'Jezik podatkovnih datotek',
      placeholder: 'Išči po jezikih',
      tooltip: 'Jezik podatkovne datoteke, to je jezik imena spremenljivk/label ali transkriptov intervjujev itd.'
    },
    country: {
      label: 'Država',
      placeholder: 'Išči po državah',
      tooltip: 'Država, v kateri je potekala raziskava.'
    },
    publisher: {
      label: 'Distribucija',
      placeholder: 'Išči po distributerjih',
      tooltip: 'Ime institucije, ki objavlja raziskovalne podatke. Običajno je to ponudnik storitev CESSDA, ki je posredoval podatke o metapodatkih.'
    },
    summary: {
      label: 'Povzetek filtra',
      introduction: 'Naslednji filtri so bili uporabljeni za vaše iskanje.',
      remove: 'Izberite filter, ki ga želite odstraniti iz tega iskanja.',
      noFilters: 'V vašem iskanju ni bilo uporabljenih dodatnih filtrov.',
      close: 'Izberite <strong>Zapri</strong>, da zaprete to okno.'
    }
  },
  numberOfResults: {
    zero: 'Najdenih je bilo %(count)s rezultatov',
    one: 'Najden je bil %(count)s rezultat',
    other: 'Najdenih je bilo %(count)s rezultatov'
  },
  numberOfResultsWithTime: {
    zero: 'Najdenih je bilo %(count)s rezultatov v %(time)sms',
    one: 'Najden je bil %(count)s rezultat v %(time)sms',
    other: 'Najdenih je bilo %(count)s rezultatov v %(time)sms'
  },
  sorting: {
    relevance: 'Ustreznost',
    titleAscending: 'Naslov (naraščajoče)',
    titleDescending: 'Naslov (padajoče)',
    dateAscending: 'Datum zbiranja (naraščajoče)',
    dateDescending: 'Datum zbiranja (padajoče)'
  },
  advancedSearch: {
    label: 'Napredno iskanje',
    introduction: 'Za napredno iskanje lahko uporabite naslednje posebne znake:',
    and: 'operator <span class="%(className)s">+</span> določa odnos <strong>IN</strong> med iskalnima podatkoma.',
    or: 'operator <span class="%(className)s">|</span> določa odnos <strong>ALI</strong> med iskalnima podatkoma.',
    negates: 'nadomestni znak <span class="%(className)s">-</span> <strong>nadomesti</strong> natanko en znak v podatku.',
    phrase: 'nadomestni znak <span class="%(className)s">"</span> uporabimo v <strong>fraznem iskanju</strong>; fraze omogočajo oblikovanje najbolj določenih podatkov za iskanje, pri čemer je pomemben vrstni red besed.',
    prefix: 'nadomestni znak <span class="%(className)s">*</span> na koncu izraza <strong>nadomešča</strong> nobenega, en, dva ali več znakov predponi (uporabljamo za krajšanje).',
    precedence: 'operatorja <span class="%(className)s">(</span> in <span class="%(className)s">)</span> označujeta <strong>vrstni red izvajanja operatorjev</strong>.',
    distance: 'operator <span class="%(className)s">~N</span> za besedo pomeni <strong>bližino</strong> (med podatkoma je lahko največ n besed, njun vrstni red je poljuben).',
    slop: '<span class="%(className)s">~N</span> za frazo označuje <strong>bližino</strong>.',
    escaping: {
      heading: 'Rezervirani znaki',
      content: 'Zgornji znaki so rezervirani. Kadar jih uporabljamo v drugačnem pomenu, jih moramo posebej označiti, da omogočimo razlikovanje glede na privzeti pomen, in sicer z <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Privzeti operator',
      content: 'Privzeti operator, ko v določenem iskalnem izrazu ni posebnih znakov, je <strong>OR</strong>. Na primer, ko iščete <em class="%(className)s">družbene vede</em>, se to interpretira kot <em class="%(className)s">družbene</em> <strong>OR</strong> <em class="%(className)s">vede</em>.'
    }
  },
  reset: {
    query: 'Počisti iskanje',
    filters: 'Resetiraj filtre'
  },
  similarResults: {
    heading: 'Podobni rezultati',
    notAvailable: 'Nismo našli podobnih rezultatov.'
  },
  resultsPerPage: 'Rezultati na stran',
  sortBy: 'Razvrsti po',
  showFilters: 'Pokaži filtre',
  hideFilters: 'Skrij filtre',
  readMore: 'Več',
  readLess: 'Manj',
  viewJson: 'Oglejte si JSON',
  goToStudy: 'Pojdi na raziskavo',
  forthcoming: 'Prihajajoče',
  back: 'Nazaj',
  close: 'Zapri',
  metadata: {
    studyTitle: 'Naslov raziskave',
    creator: 'Avtor',
    studyPersistentIdentifier: 'Stalni enoznačni identifikator raziskave',
    abstract: 'Raziskovalno izhodišče',
    methodology: 'Metodologija',
    country: 'Država',
    timeDimension: 'Časovna metoda',
    analysisUnit: 'Enota za analizo',
    samplingProcedure: 'Tip vzorca',
    dataCollectionMethod: 'Metoda zbiranja podatkov',
    dataCollectionPeriod: 'Časovno pokritje',
    languageOfDataFiles: 'Jezik podatkovne datoteke',
    access: 'Dostop',
    publisher: 'Distribucija',
    yearOfPublication: 'Leto objave',
    termsOfDataAccess: 'Pogoji dostopa',
    studyNumber: 'ID raziskave',
    topics: 'Vsebinska področja',
    keywords: 'Ključne besede'
  },
  footer: {
    followUsOn: 'Sledite nam',
    privacy: 'Politika zasebnosti',
    tools: 'CESSDA Tools & Services'
  }
};
