module.exports = {

  counterpart: {

    pluralize: (entry, count) => entry[

      (count === 0 && 'zero' in entry)

        ? 'zero' : (count === 1) ? 'one' : 'other'

      ]

  },

  cessda: 'Consortium of European Social Science Data Archives',

  language: {

    label: 'Språk',

    notAvailable: {

      field: 'Inte tillgängligt',

      heading: 'Den begärda informationen hittades inte.',

      content: 'Den finns inte eller är inte tillgänglig på det valda språket. Välj ett alternativt språk eller gör en ny sökning.'

    }

  },

  search: 'Hitta samhällsvetenskapliga och ekonomiska forskningsdata',

  noHits: {

    noResultsFound: 'Inga resultat hittades för "%(query)s" för det valda språket.',

    searchWithoutFilters: 'Sök efter "%(query)s" utan filter',

    error: 'Det uppstod ett fel när vi hämtade dina resultat. Gör ett nytt försök.',

    resetSearch: 'Nollställ sökning'

  },

  filters: {

    topic: {

      label: 'Ämnesområde',

      placeholder: 'Sök efter ämnesområden',

      tooltip: 'CESSDA Topic Classification används för att identifiera en studies generella ämnesområden eller teman.'

    },

    collectionDates: {

      label: 'Insamlingsår',

      placeholder: 'Sök efter årtal',

      tooltip: 'Perioden, i antal år, när data samlades in.'

    },

    languageOfDataFiles: {

      label: 'Språk för datafiler',

      placeholder: 'Sök efter språk',

      tooltip: 'Språk för forskningsdatasetet, med andra ord språket för till exempel variabelnamn, variabeletiketter eller intervjutranskriptioner.'

    },

    country: {

      label: 'Land',

      placeholder: 'Sök efter länder',

      tooltip: 'Landet där studien genomfördes.'

    },

    publisher: {

      label: 'Utgivare',

      placeholder: 'Sök efter utgivare',

      tooltip: 'Namnet på den organisation som ansvarar för att tillgängliggöra forskningsdata. Detta kommer, normalt sett, vara den CESSDA Service Provider som tillgängliggör metadatainformationen.'

    },

    summary: {

      label: 'Sammanfattning av filter',

      introduction: 'Följande filter har applicerats på din sökning.',

      remove: 'Markera ett filter för att ta bort det från din sökning.',

      noFilters: 'Inga ytterligare filter har applicerats på din sökning.',

      close: 'Välj <strong>Stäng</strong> för att stänga fönstret.'

    }

  },

  numberOfResults: {

    zero: 'Hittade %(count)s sökresultat',

    one: 'Hittade %(count)s sökresultat',

    other: 'Hittade %(count)s sökresultat'

  },

  numberOfResultsWithTime: {

    zero: 'Hittade %(count)s resultat på %(time)sms',

    one: 'Hittade %(count)s resultat på %(time)sms',

    other: 'Hittade %(count)s resultat på %(time)sms'

  },

  sorting: {

    relevance: 'Relevans',

    titleAscending: 'Titel (stigande)',

    titleDescending: 'Titel (fallande)',

    dateAscending: 'Insamlingsdatum (stigande)',

    dateDescending: ' Insamlingsdatum (fallande)'

  },

  advancedSearch: {

    label: 'Avancerad sökning',

    introduction: 'Följande specialtecken kan användas för att utföra avancerade sökfrågor:',

    and: '<span class="%(className)s">+</span> uttrycker sökning med <strong>AND</strong>.',

    or: '<span class="%(className)s">|</span> uttrycker sökning med <strong>OR</strong>.',

    negates: '<span class="%(className)s">-</span> <strong>negerar</strong> en enskild term.',

    phrase: '<span class="%(className)s">"</span> ringar in flera termer för att ange en <strong>fras</strong> att söka efter.',

    prefix: '<span class="%(className)s">*</span> i slutet av en term anger en sökning efter <strong>prefix</strong>.',

    precedence: '<span class="%(className)s">(</span> och <span class="%(className)s">)</span> anger <strong>företräde</strong>.',

    distance: '<span class="%(className)s">~N</span> efter ett ord anger en sökning efter <strong>liknande</strong> ord (fuzziness).',

    slop: '<span class="%(className)s">~N</span> anger antalet <strong>mellanliggande ord</strong> för att det fortfarande ska betraktas som en sökträff.',

    escaping: {

      heading: 'Escaping',

      content: 'Ovanstående tecken är reserverade av systemet. För att söka efter ett av dessa specialtecken behöver så kallad Escaping göras med <span class="%(className)s">[file://%3c/span]\\</span> före tecknet.'

    },

    defaultOperator: {

      heading: 'Standardoperator',

      content: 'Standardoperatorn som används när inga specialtecken har angivits i en sökfråga är <strong>OR</strong>. Till exempel kommer en sökning efter <em class="%(className)s">Socialt arbete</em> att tolkas som <em class="%(className)s">Socialt</em> <strong>OR</strong> <em class="%(className)s">arbete</em>.'

    }

  },

  reset: {

    query: 'Rensa sökning',

    filters: 'Återställ filter'

  },

  similarResults: {

    heading: 'Liknande sökresultat',

    notAvailable: 'Inga liknande sökresultat hittades.'

  },

  resultsPerPage: 'Resultat per sida',

  sortBy: 'Sortera efter',

  showFilters: 'Visa filter',

  hideFilters: 'Dölj filter',

  readMore: 'Visa mer',

  readLess: 'Visa mindre',

  viewJson: 'Visa JSON',

  goToStudy: 'Gå till studie',

  forthcoming: 'Kommande',

  back: 'Tillbaka',

  close: 'Stäng',

  metadata: {

    studyTitle: 'Titel',

    creator: 'Skapare/Primärforskare',

    studyPersistentIdentifier: 'Persistent identifierare',

    abstract: 'Beskrivning',

    methodology: 'Metodologi',

    country: 'Land',

    timeDimension: 'Tidsdimension',

    analysisUnit: 'Analysenhet',

    samplingProcedure: 'Urvalsmetod',

    dataCollectionMethod: 'Insamlingsmetod',

    dataCollectionPeriod: 'Tidsperiod(er) för insamling',

    languageOfDataFiles: 'Språk för datafiler',

    access: 'Tillgänglighet',

    publisher: 'Utgivare',

    yearOfPublication: 'Publikationsår',

    termsOfDataAccess: 'Tillgänglighetskrav',

    studyNumber: 'Studienummer',

    topics: 'Ämnesområden',

    keywords: 'Nyckelord'

  },

  footer: {

   followUsOn: 'Följ oss på',

    contactUs: 'Kontakta oss',

    menu: 'Meny',

    about: 'Om',

    consortium: 'Konsortium',

    projects: 'Projekt',

    researchInfrastructure: 'Forskningsinfrastruktur',

    contact: 'Kontaktperson',

    privacy: 'Integritetspolicy'

  }

};