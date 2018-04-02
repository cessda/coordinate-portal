module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Euroopan sosiaalitieteiden tietoryhmän konsortio',
  language: {
    label: 'Kieli',
    notAvailable: {
      field: 'Ei saatavilla',
      heading: 'Pyydettyjä tietoja ei löytynyt.',
      content: 'Se ei välttämättä ole tai ei ole valitulla kielellä. Valitse vaihtoehtoinen kieli tai aloita uusi haku.'
    }
  },
  search: 'Etsi sosiaalista ja taloudellista tutkimustietoa',
  noHits: {
    noResultsFound: 'Tuloksia ei löytynyt "%(query)s" valitulla kielellä.',
    searchWithoutFilters: 'Ets "%(query)s" ilman suodattimia',
    error: 'Pahoittelemme, että tulosi haettiin. Yritä uudelleen',
    resetSearch: 'Palauta haku'
  },
  filters: {
    topic: {
      label: 'Aihe',
      placeholder: 'Hae aiheita',
      tooltip: 'CESSDA-aiheluokitus palvelee tutkimuksen yleisiä aiheita, aiheita tai teemoja.'
    },
    collectionDates: {
      label: 'Keräilyvuodet',
      placeholder: 'Hae vuotta',
      tooltip: 'Kausi, vuosina, jolloin tiedot kerättiin.'
    },
    languageOfDataFiles: {
      label: 'Tiedostojen kieli',
      placeholder: 'Hae kieliä',
      tooltip: 'Tutkimustietosanan kieli, eli muuttujan nimet / tarrat tai haastattelujen lähteet jne.'
    },
    country: {
      label: 'Maa',
      placeholder: 'Etsi maat',
      tooltip: 'Maa, jossa tutkimus toteutettiin.'
    },
    publisher: {
      label: 'Julkaisija',
      placeholder: 'Etsi julkaisijat',
      tooltip: 'Tutkimusdatan julkaisevan laitoksen nimi. Tavallisesti CESSDA-palveluntarjoaja toimittaa metatiedot.'
    },
    summary: {
      label: 'Suodattimen yhteenveto',
      introduction: 'Seuraavia suodattimia on käytetty hakuusi.',
      remove: 'Valitse suodatin poistaaksesi tämän haun.',
      noFilters: 'Hakemukseen ei ole lisätty suodattimia.',
      close: 'Poista tämä ikkuna valitsemalla <strong>Sulje</strong>.'
    }
  },
  numberOfResults: {
    zero: '%(count)s löytyi',
    one: '%(count)s löytynyt tulos',
    other: '%(count)s löytyi'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s tulokset löydettiin %(time)sms',
    one: '%(count)s löytyi %(time)sms',
    other: '%(count)s tulokset löydettiin %(time)sms'
  },
  sorting: {
    relevance: 'Relevanssi',
    titleAscending: 'Otsikko (nouseva)',
    titleDescending: 'Otsikko (laskeva)',
    dateAscending: 'Keräyspäivä (nouseva)',
    dateDescending: 'Keräyspäivä (laskeva)'
  },
  advancedSearch: {
    label: 'Tarkennettu haku',
    introduction: 'Seuraavien erikoismerkkien avulla voidaan suorittaa kehittyneitä hakuhakemuksia:',
    and: '<span class="%(className)s">+</span> signifies <strong>AND</strong> operation.',
    or: '<span class="%(className)s">|</span> signifies <strong>OR</strong> operation.',
    negates: '<span class="%(className)s">-</span> <strong>negates</strong> a single token.',
    phrase: '<span class="%(className)s">"</span> wraps a number of tokens to signify a <strong>phrase</strong> for searching.',
    prefix: '<span class="%(className)s">*</span> at the end of a term signifies a <strong>prefix</strong> query.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> signify <strong>precedence</strong>.',
    distance: '<span class="%(className)s">~N</span> after a word signifies edit <strong>distance</strong> (fuzziness).',
    slop: '<span class="%(className)s">~N</span> after a phrase signifies <strong>slop</strong> amount.',
    escaping: {
      heading: 'Karkaaminen',
      content: 'Edellä olevat merkit on varattu. Jotta näitä erikoismerkkejä voidaan etsiä, ne on pakko välttää <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Oletusoperaattori',
      content: 'The default operator when there are no special characters in a given search term is <strong>OR</strong>. For example when searching for <em class="%(className)s">Social Science</em>, this will be interpreted as <em class="%(className)s">Social</em> <strong>OR</strong> <em class="%(className)s">Science</em>.'
    }
  },
  reset: {
    query: 'Tyhjennä haku',
    filters: 'Poista suodattimet'
  },
  similarResults: {
    heading: 'Samankaltaiset tulokset',
    notAvailable: 'Ei vastaavia tuloksia.'
  },
  resultsPerPage: 'Tulos per sivu',
  sortBy: 'Lajittele',
  showFilters: 'Näytä suodattimet',
  hideFilters: 'Piilota suodattimet',
  readMore: 'Lue lisää',
  readLess: 'Lue vähemmän',
  viewJson: 'Näytä JSON',
  goToStudy: 'Mene opiskeluun',
  forthcoming: 'Tuleva',
  back: 'Takaisin',
  close: 'Sulje',
  metadata: {
    studyTitle: 'Opinnot',
    creator: 'Luoja',
    studyPersistentIdentifier: 'Tutkimuksen tunniste',
    abstract: 'Abstrakti',
    methodology: 'Metodologia',
    country: 'Maa',
    timeDimension: 'Ajanmitta',
    analysisUnit: 'Analyysiyksikkö',
    samplingProcedure: 'Näytteenottomenettely',
    dataCollectionMethod: 'Tiedonkeruumenetelmä',
    dataCollectionPeriod: 'Tiedonkeruujakso',
    languageOfDataFiles: 'Tiedostojen kieli',
    access: 'Pääsy',
    publisher: 'Kustantaja',
    yearOfPublication: 'Julkaisuvuosi',
    termsOfDataAccess: 'Tietojen käyttöoikeudet',
    studyNumber: 'Tutkimuksen numero',
    topics: 'Aiheista',
    keywords: 'Avainsanat'
  },
  footer: {
    followUsOn: 'Seuraa meitä',
    contactUs: 'Ota meihin yhteyttä',
    menu: 'Valikko',
    about: 'Tietoja',
    consortium: 'Konsortio',
    projects: 'Projektit',
    researchInfrastructure: 'Tutkimusinfrastruktuuri',
    contact: 'Ottaa yhteyttä',
    privacy: 'Tietosuojakäytäntö'
  }
};
