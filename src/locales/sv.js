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
      field: 'Ej tillgängligt',
      heading: 'Den begärda informationen hittades ej.',
      content: 'Den finns ej, eller är ej tillgänglig i det valda språket. Välj ett alternativt språk eller gör en ny sökning.'
    }
  },
  search: 'Hitta Samhällsvetenskaplig och ekonomisk forskningsdata',
  noHits: {
    noResultsFound: 'Inga resultat hittades för "%(query)s" för det valda språket.',
    searchWithoutFilters: 'Sök efter "%(query)s" utan filter',
    error: 'Vi ber om ursäkt. Ett fel uppstod när vi hämtade dina resultat. Var god försök igen.',
    resetSearch: 'Nollställ sökning'
  },
  filters: {
    topic: {
      label: 'Ämnesområde',
      placeholder: 'Sök ämnesområden',
      tooltip: 'CESSDA Topic Classification används för att identifiera en studies generella ämnesområden eller teman.'
    },
    collectionDates: {
      label: 'Insamlingsår',
      placeholder: 'Sök årtal',
      tooltip: 'Perioden, i år, när data samlades in.'
    },
    languageOfDataFiles: {
      label: 'Språk för datafiler',
      placeholder: 'Sök språk',
      tooltip: 'Språk för forskningsdatasetet, med andra ord språket för till exempel variabelnamn, variabeletiketter eller intervjutranskriptioner.'
    },
    country: {
      label: 'Land',
      placeholder: 'Sök länder',
      tooltip: 'Landet där studien genomfördes.'
    },
    publisher: {
      label: 'Utgivare',
      placeholder: 'Sök utgivare',
      tooltip: 'Namnet på den organisation som ansvarar för att tillgängliggöra forskningsdatan. Detta kommer, normalt sett, vara den CESSDA Service Provider som tillgängliggör metadatainformationen.'
    },
    summary: {
      label: 'Sammanfattning av filter',
      introduction: 'Följande filter har applicerats på din sökning.',
      remove: 'Välj ett filter för att ta bort det från din sökning.',
      noFilters: 'Inga ytterligare filter har applicerats på din sökning.',
      close: 'Välj <strong>Stäng</strong> för att stänga detta fönster.'
    }
  },
  numberOfResults: {
    zero: '%(count)s sökresultat hittade',
    one: '%(count)s sökresultat hittade',
    other: '%(count)s sökresultat hittade'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s resultat hittade på %(time)sms',
    one: '%(count)s resultat hittade på %(time)sms',
    other: '%(count)s resultat hittade på %(time)sms'
  },
  sorting: {
    relevance: 'Relevans',
    titleAscending: 'Titel (stigande)',
    titleDescending: 'Titel (fallande)',
    dateAscending: 'Datum för insamlande (stigande)',
    dateDescending: 'Datum för insamlande (fallande)'
  },
  advancedSearch: {
    label: 'Advancerad sökning',
    introduction: 'Följande specialtecken kan användas för att utföra avancerade sökfrågor:',
    and: '<span class="%(className)s">+</span> uttrycker <strong>AND</strong>-operation.',
    or: '<span class="%(className)s">|</span> uttrycker <strong>OR</strong>-operation.',
    negates: '<span class="%(className)s">-</span> <strong>negerar</strong> en enskild term.',
    phrase: '<span class="%(className)s">"</span> omsluter ett flertal termer för att indikera en <strong>fras</strong> att söka efter.',
    prefix: '<span class="%(className)s">*</span> i slutet av en term indikerar en <strong>prefix</strong>-sökning.',
    precedence: '<span class="%(className)s">(</span> och <span class="%(className)s">)</span> indikerar <strong>företräde</strong>.',
    distance: '<span class="%(className)s">~N</span> efter ett ord indikerar sökning efter <strong>liknande</strong> ord (fuzziness).',
    slop: '<span class="%(className)s">~N</span> indikerar mängden <strong>mellanliggande ord</strong> för att fortfarande vara betraktat som en sökträff.',
    escaping: {
      heading: 'Escaping',
      content: 'Ovanstående tecken är reserverade av systemet. För att söka efter ett av dessa speciella tecken behövs så kallad Escaping göras med <span class="%(className)s">\\</span> före tecknet.'
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
    notAvailable: 'Inga liknande sökresultat funna.'
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
    dataCollectionPeriod: 'Insamlingsperiod',
    languageOfDataFiles: 'Språk för datafiler',
    access: 'Tillgänglighet',
    publisher: 'Utgivare',
    yearOfPublication: 'Publikationsår',
    termsOfDataAccess: 'Tillgänglighetskrav',
    studyNumber: 'Studienumemr',
    topics: 'Ämnesområden',
    keywords: 'Nyckelord'
  },
  footer: {
    followUsOn: 'Följ oss på',
    privacy: 'Integritetspolicy',
    tools: 'CESSDA Tools & Services'
  }
};
