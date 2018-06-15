module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
      ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Consortium of European Social Science Data Archives',
  language: {
    label: 'SprÃ¥k',
    notAvailable: {
      field: 'Ej tillgÃ¤ngligt',
      heading: 'Den begÃ¤rda informationen hittades ej.',
      content: 'Den finns ej, eller Ã¤r ej tillgÃ¤nglig i det valda sprÃ¥ket. VÃ¤lj ett alternativt sprÃ¥k eller gÃ¶r en ny sÃ¶kning.'
    }
  },
  search: 'Hitta SamhÃ¤llsvetenskaplig och ekonomisk forskningsdata',
  noHits: {
    noResultsFound: 'Inga resultat hittades fÃ¶r "%(query)s" fÃ¶r det valda sprÃ¥ket.',
    searchWithoutFilters: 'SÃ¶k efter "%(query)s" utan filter',
    error: 'Vi ber om ursÃ¤kt. Ett fel uppstod nÃ¤r vi hÃ¤mtade dina resultat. Var god fÃ¶rsÃ¶k igen.',
    resetSearch: 'NollstÃ¤ll sÃ¶kning'
  },
  filters: {
    topic: {
      label: 'Ã„mnesomrÃ¥de',
      placeholder: 'SÃ¶k Ã¤mnesomrÃ¥den',
      tooltip: 'CESSDA Topic Classification anvÃ¤nds fÃ¶r att identifiera en studies generella Ã¤mnesomrÃ¥den eller teman.'
    },
    collectionDates: {
      label: 'InsamlingsÃ¥r',
      placeholder: 'SÃ¶k Ã¥rtal',
      tooltip: 'Perioden, i Ã¥r, nÃ¤r data samlades in.'
    },
    languageOfDataFiles: {
      label: 'SprÃ¥k fÃ¶r datafiler',
      placeholder: 'SÃ¶k sprÃ¥k',
      tooltip: 'SprÃ¥k fÃ¶r forskningsdatasetet, med andra ord sprÃ¥ket fÃ¶r till exempel variabelnamn, variabeletiketter eller intervjutranskriptioner.'
    },
    country: {
      label: 'Land',
      placeholder: 'SÃ¶k lÃ¤nder',
      tooltip: 'Landet dÃ¤r studien genomfÃ¶rdes.'
    },
    publisher: {
      label: 'Utgivare',
      placeholder: 'SÃ¶k utgivare',
      tooltip: 'Namnet pÃ¥ den organisation som ansvarar fÃ¶r att tillgÃ¤ngliggÃ¶ra forskningsdatan. Detta kommer, normalt sett, vara den CESSDA Service Provider som tillgÃ¤ngliggÃ¶r metadatainformationen.'
    },
    summary: {
      label: 'Sammanfattning av filter',
      introduction: 'FÃ¶ljande filter har applicerats pÃ¥ din sÃ¶kning.',
      remove: 'VÃ¤lj ett filter fÃ¶r att ta bort det frÃ¥n din sÃ¶kning.',
      noFilters: 'Inga ytterligare filter har applicerats pÃ¥ din sÃ¶kning.',
      close: 'VÃ¤lj <strong>StÃ¤ng</strong> fÃ¶r att stÃ¤nga detta fÃ¶nster.'
    }
  },
  numberOfResults: {
    zero: '%(count)s sÃ¶kresultat hittade',
    one: '%(count)s sÃ¶kresultat hittade',
    other: '%(count)s sÃ¶kresultat hittade'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s resultat hittade pÃ¥ %(time)sms',
    one: '%(count)s resultat hittade pÃ¥ %(time)sms',
    other: '%(count)s resultat hittade pÃ¥ %(time)sms'
  },
  sorting: {
    relevance: 'Relevans',
    titleAscending: 'Titel (stigande)',
    titleDescending: 'Titel (fallande)',
    dateAscending: 'Datum fÃ¶r insamlande (stigande)',
    dateDescending: 'Datum fÃ¶r insamlande (fallande)'
  },
  advancedSearch: {
    label: 'Advancerad sÃ¶kning',
    introduction: 'FÃ¶ljande specialtecken kan anvÃ¤ndas fÃ¶r att utfÃ¶ra avancerade sÃ¶kfrÃ¥gor:',
    and: '<span class="%(className)s">+</span> uttrycker <strong>AND</strong>-operation.',
    or: '<span class="%(className)s">|</span> uttrycker <strong>OR</strong>-operation.',
    negates: '<span class="%(className)s">-</span> <strong>negerar</strong> en enskild term.',
    phrase: '<span class="%(className)s">"</span> omsluter ett flertal termer fÃ¶r att indikera en <strong>fras</strong> att sÃ¶ka efter.',
    prefix: '<span class="%(className)s">*</span> i slutet av en term indikerar en <strong>prefix</strong>-sÃ¶kning.',
    precedence: '<span class="%(className)s">(</span> och <span class="%(className)s">)</span> indikerar <strong>fÃ¶retrÃ¤de</strong>.',
    distance: '<span class="%(className)s">~N</span> efter ett ord indikerar sÃ¶kning efter <strong>liknande</strong> ord (fuzziness).',
    slop: '<span class="%(className)s">~N</span> indikerar mÃ¤ngden <strong>mellanliggande ord</strong> fÃ¶r att fortfarande vara betraktat som en sÃ¶ktrÃ¤ff.',
    escaping: {
      heading: 'Escaping',
      content: 'OvanstÃ¥ende tecken Ã¤r reserverade av systemet. FÃ¶r att sÃ¶ka efter ett av dessa speciella tecken behÃ¶vs sÃ¥ kallad Escaping gÃ¶ras med <span class="%(className)s">\\</span> fÃ¶re tecknet.'
    },
    defaultOperator: {
      heading: 'Standardoperator',
      content: 'Standardoperatorn som anvÃ¤nds nÃ¤r inga specialtecken har angivits i en sÃ¶kfrÃ¥ga Ã¤r <strong>OR</strong>. Till exempel kommer en sÃ¶kning efter <em class="%(className)s">Socialt arbete</em> att tolkas som <em class="%(className)s">Socialt</em> <strong>OR</strong> <em class="%(className)s">arbete</em>.'
    }
  },
  reset: {
    query: 'Rensa sÃ¶kning',
    filters: 'Ã…terstÃ¤ll filter'
  },
  similarResults: {
    heading: 'Liknande sÃ¶kresultat',
    notAvailable: 'Inga liknande sÃ¶kresultat funna.'
  },
  resultsPerPage: 'Resultat per sida',
  sortBy: 'Sortera efter',
  showFilters: 'Visa filter',
  hideFilters: 'DÃ¶lj filter',
  readMore: 'Visa mer',
  readLess: 'Visa mindre',
  viewJson: 'Visa JSON',
  goToStudy: 'GÃ¥ till studie',
  forthcoming: 'Kommande',
  back: 'Tillbaka',
  close: 'StÃ¤ng',
  metadata: {
    studyTitle: 'Titel',
    creator: 'Skapare/PrimÃ¤rforskare',
    studyPersistentIdentifier: 'Persistent identifierare',
    abstract: 'Beskrivning',
    methodology: 'Metodologi',
    country: 'Land',
    timeDimension: 'Tidsdimension',
    analysisUnit: 'Analysenhet',
    samplingProcedure: 'Urvalsmetod',
    dataCollectionMethod: 'Insamlingsmetod',
    dataCollectionPeriod: 'Insamlingsperiod',
    languageOfDataFiles: 'SprÃ¥k fÃ¶r datafiler',
    access: 'TillgÃ¤nglighet',
    publisher: 'Utgivare',
    yearOfPublication: 'PublikationsÃ¥r',
    termsOfDataAccess: 'TillgÃ¤nglighetskrav',
    studyNumber: 'Studienumemr',
    topics: 'Ã„mnesomrÃ¥den',
    keywords: 'Nyckelord'
  },
  footer: {
    followUsOn: 'FÃ¶lj oss pÃ¥',
    contactUs: 'Kontakta oss',
    menu: 'Meny',
    about: 'Om',
    consortium: 'Konsortium',
    projects: 'Projekt',
    researchInfrastructure: 'Forskningsinfrastruktur',
    contact: 'Kontakt',
    privacy: 'Integritetspolicy'
  }
};
