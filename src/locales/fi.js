module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Consortium of European Social Science Data Archives',
  language: {
    label: 'Kieli',
    notAvailable: {
      field: 'Ei saatavilla',
      heading: 'Hakemaasi aineistoa ei löytynyt.',
      content: 'Aineistoa ei ole tai se ei ole saatavilla valitsemallasi kielellä. Valitse toinen kieli tai tee uusi haku.'
    }
  },
  search: 'Hae yhteiskunta- ja taloustieteiden tutkimusaineistoja',
  noHits: {
    noResultsFound: 'Haku "%(query)s" ei tuottanut tuloksia valitulla kielellä.',
    searchWithoutFilters: 'Etsi "%(query)s" ilman suodattimia',
    error: 'Tuloksia haettaessa tapahtui virhe. Yritä uudelleen.',
    resetSearch: 'Nollaa haku'
  },
  filters: {
    topic: {
      label: 'Aihepiiri',
      placeholder: 'Hae aihepiirejä',
      tooltip: 'CESSDAn aihepiiriluokituksen avulla voit hakea aineistoja aiheittain tai teemoittain.'
    },
    collectionDates: {
      label: 'Aineistonkeruun ajankohta',
      placeholder: 'Hae aineistonkeruun ajankohtaa',
      tooltip: 'Vuodet, jolloin aineisto on kerätty.'
    },
    languageOfDataFiles: {
      label: 'Tiedostojen kieli',
      placeholder: 'Hae tiedostojen kieliä',
      tooltip: 'Tutkimusaineiston kieli, eli muuttujien nimien/selitteiden tai litteroitujen haastattelujen yms. kieli'
    },
    country: {
      label: 'Aineiston keruumaa',
      placeholder: 'Hae aineistojen keruumaita',
      tooltip: 'Maa, jossa tutkimus on toteutettu.'
    },
    publisher: {
      label: 'Julkaisija',
      placeholder: 'Hae julkaisijoita',
      tooltip: 'Tutkimusaineiston julkaisseen laitoksen nimi. Julkaisija on tavallisesti CESSDA-palveluntarjoaja, joka toimittaa aineiston metatiedot.'
    },
    summary: {
      label: 'Yhteenveto hakusuodattimista',
      introduction: 'Haussasi käytetään seuraavia suodattimia.',
      remove: 'Valitse suodatin poistaaksesi sen tästä hausta.',
      noFilters: 'Hakuun ei ole lisätty suodattimia.',
      close: 'Poista tämä ikkuna valitsemalla <strong>Sulje</strong>.'
    }
  },
  numberOfResults: {
    zero: '%(count)s tulosta',
    one: '%(count)s tulos',
    other: '%(count)s tulosta'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s tulosta ajassa %(time)sms',
    one: '%(count)s tulos ajassa %(time)sms',
    other: '%(count)s tulosta ajassa %(time)sms'
  },
  sorting: {
    relevance: 'Relevanssi',
    titleAscending: 'Otsikko (nouseva)',
    titleDescending: 'Otsikko (laskeva)',
    dateAscending: 'Keruuajankohta (nouseva)',
    dateDescending: 'Keruuajankohta (laskeva)'
  },
  advancedSearch: {
    label: 'Tarkennettu haku',
    introduction: 'Seuraavien erikoismerkkien avulla voidaan luoda tarkennettuja hakulausekkeita:',
    and: '<span class="%(className)s">+</span> suorittaa <strong>AND</strong>-operaation eli tuottaa tuloksia, joissa esiintyy kaikki käytetyt hakusanat.',
    or: '<span class="%(className)s">|</span> suorittaa <strong>OR</strong>-operaation eli tuottaa tuloksia, joissa esiintyy vähintään yksi käytetyistä hakusanoista.',
    negates: '<span class="%(className)s">-</span> <strong>rajaa pois</strong> hakusanan sisältävät tulokset.',
    phrase: '<span class="%(className)s">"</span> hakee lainausmerkkien sisällä olevat hakusanat <strong>fraasina</strong>.',
    prefix: '<span class="%(className)s">*</span> <strong>katkaisee</strong> hakusanan sen lopusta.',
    precedence: '<span class="%(className)s">(</span> ja <span class="%(className)s">)</span> asettaa niiden sisällä olevat hakusanat ja operaattorit <strong>etusijalle</strong> hakulausekkeen suoritusjärjestyksessä.',
    distance: '<span class="%(className)s">~N</span> sanan jälkeen hakee annetun sanan <strong>kaltaisia</strong> tuloksia (sumea haku). N määrittää, kuinka monen merkin verran sanat saavat poiketa toisistaan.',
    slop: '<span class="%(className)s">~N</span> fraasin jälkeen määrittää, kuinka monen sanan <strong>päässä toisistaan</strong> hakusanat saavat esiintyä.',
    escaping: {
      heading: 'Erikoismerkit',
      content: 'Edellä olevat erikoismerkit on varattu hakulausekkeiden muodostamiseen. Jos erikoismerkki halutaan sisällyttää hakuun, sen eteen on lisättävä koodinvaihtomerkki <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Oletusoperaattori',
      content: 'Kun hakulauseke ei sisällä erikoismerkkejä, oletusoperaattori on <strong>OR</strong>. Esimerkiksi kun haetaan sanoilla <em class="%(className)s">poliittiset ideologiat</em>, tämä hakulauseke tulkitaan: <em class="%(className)s">poliittiset</em> <strong>OR</strong> <em class="%(className)s">ideologiat</em>.'
    }
  },
  reset: {
    query: 'Tyhjennä haku',
    filters: 'Poista suodattimet'
  },
  similarResults: {
    heading: 'Samankaltaiset tulokset',
    notAvailable: 'Ei samankaltaisia tuloksia.'
  },
  resultsPerPage: 'Tuloksia per sivu',
  sortBy: 'Lajittele',
  showFilters: 'Näytä suodattimet',
  hideFilters: 'Piilota suodattimet',
  readMore: 'Näytä lisää',
  readLess: 'Näytä vähemmän',
  viewJson: 'Näytä JSON',
  goToStudy: 'Siirry aineistoon',
  forthcoming: 'Tulossa',
  back: 'Takaisin',
  close: 'Sulje',
  metadata: {
    studyTitle: 'Aineiston nimi',
    creator: 'Tekijä',
    studyPersistentIdentifier: 'Aineiston pysyvä tunniste',
    abstract: 'Sisällön kuvaus',
    methodology: 'Otanta- ja keruutiedot',
    country: 'Maa',
    timeDimension: 'Tutkimuksen aikaulottuvuus',
    analysisUnit: 'Havaintoyksikkötyyppi',
    samplingProcedure: 'Otantamenetelmä',
    dataCollectionMethod: 'Keruumenetelmä',
    dataCollectionPeriod: 'Aineistonkeruun ajankohta',
    languageOfDataFiles: 'Tiedostojen kieli',
    access: 'Aineiston saatavuus',
    publisher: 'Julkaisija',
    yearOfPublication: 'Julkaisuvuosi',
    termsOfDataAccess: 'Käyttöoikeudet',
    studyNumber: 'Aineistonumero',
    topics: 'Tieteenalat',
    keywords: 'Asiasanat'
  },
  footer: {
    followUsOn: 'Seuraa meitä:',
    privacy: 'Tietosuojakäytäntö',
    tools: 'CESSDA Tools & Services'
  }
};
