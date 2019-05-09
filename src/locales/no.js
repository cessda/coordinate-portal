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
      field: 'Ikke tilgjengelig',
      heading: 'Forespurte data ikke funnet.',
      content: 'Data eksisterer ikke, eller er ikke tilgjengelig på valgt språk. Velg et alternativt språk eller start et nytt søk.'
    }
  },
  search: 'Søk etter sosio-økonomiske data',
  noHits: {
    noResultsFound: 'Ingen treff for søket "%(query)s" på valgt språk.',
    searchWithoutFilters: 'Søk etter "%(query)s" uten filtre',
    error: 'Vi beklager, det har oppstått en feil. Vennligst prøv igjen.',
    resetSearch: 'Blank ut søket'
  },
  filters: {
    topic: {
      label: 'Emne',
      placeholder: 'Søk etter emne',
      tooltip: 'CESSDA emneklassifikasjon angir emner og tema for en studie.'
    },
    collectionDates: {
      label: 'Innsamlingsår',
      placeholder: 'Søk etter år',
      tooltip: 'Innsamlingsperiode for data (i år).'
    },
    languageOfDataFiles: {
      label: 'Språk i datafiler',
      placeholder: 'Søk etter språk',
      tooltip: 'Språket i forskingsdatasettet, dvs språket brukt i variabelnavn og -labler, intervjutranskripsjoner, etc.'
    },
    country: {
      label: 'Land',
      placeholder: 'Søk etter land',
      tooltip: 'Landet studien fant sted.'
    },
    publisher: {
      label: 'Datadistributør',
      placeholder: 'Søk etter datadistributør',
      tooltip: 'Navnet på institusjonen som publiserer/distribuerer forskningsdataene. Vil vanligvis være -tjenesteleverandøren som tilbyr metadataene.'
    },
    summary: {
      label: 'Aktive filter',
      introduction: 'Følgende filter er aktive.',
      remove: 'Velg et filter for å fjerne filteret fra dette søket.',
      noFilters: 'Ingen ekstra filtre er aktive.',
      close: 'Velg <strong>Lukk</strong> for å lukke dette vinduet.'
    }
  },
  numberOfResults: {
    zero: '%(count)s resultater funnet',
    one: '%(count)s resultat funnet',
    other: '%(count)s resultater funnet'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s resultater funnet på %(time)sms',
    one: '%(count)s resultat funnet på %(time)sms',
    other: '%(count)s resultater funnet på %(time)sms'
  },
  sorting: {
    relevance: 'Relevans',
    titleAscending: 'Tittel (stigende)',
    titleDescending: 'Tittel (synkende)',
    dateAscending: 'Innsamlingsdato (stigende)',
    dateDescending: 'Innsamlingsdato (synkende)'
  },
  advancedSearch: {
    label: 'Avansert søk',
    introduction: 'Følgende spesialtegn kan brukes i avanserte søk:',
    and: '<span class="%(className)s">+</span> brukes til å uttrykke <strong>OG</strong>.',
    or: '<span class="%(className)s">|</span> brukes til å uttrykke <strong>ELLER</strong> operation.',
    negates: '<span class="%(className)s">-</span> gjør det mulig å gjøre søk etter datasett som <strong>ikke inneholder</strong> et spesifikt begrep.',
    phrase: '<span class="%(className)s">"</span> brukes til å uttrykke <strong>søkefraser</strong>.',
    prefix: '<span class="%(className)s">*</span> på slutten av et søkeord gjør det mulig å søke etter <strong>begynnelsen</strong> av begreper.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> uttrykker <strong>presedens</strong>.',
    distance: '<span class="%(className)s">~N</span> etter et ord gjør det mulig å uttrykke <strong>avstand</strong> (upresisjon/fuzziness).',
    slop: '<span class="%(className)s">~N</span> etter en frase angir toleranse for andre ord mellom søkeordene, såkalt <strong>slop</strong> amount.',
    escaping: {
      heading: 'Escaping',
      content: 'Tegnene ovenfor er reserverte tegn. For å søke på slike spesialtegn, må de escapes med <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Default-operator',
      content: 'Default-operator når et søk ikke inneholder noen spesialtegn, er <strong>OR</strong>. For eksempel vil søk etter <em class="%(className)s">Social Science</em>, bli tolket som søk etter <em class="%(className)s">Social</em> <strong>OR</strong> <em class="%(className)s">Science</em>.'
    }
  },
  reset: {
    query: 'Blank ut søk',
    filters: 'Still tilbake filter'
  },
  similarResults: {
    heading: 'Lignende resultater',
    notAvailable: 'Ingen lignende resultater funnet.'
  },
  resultsPerPage: 'Resultater per side',
  sortBy: 'Sorter etter',
  showFilters: 'Vis filter',
  hideFilters: 'Skjul filter',
  readMore: 'Les mer',
  readLess: 'Les mindre',
  viewJson: 'Se JSON',
  goToStudy: 'Gå til studie',
  forthcoming: 'Kommende',
  back: 'Tilbake',
  close: 'Lukk',
  metadata: {
    studyTitle: 'Studietittel',
    creator: 'Produsent',
    studyPersistentIdentifier: 'Persistent identifikator for studien',
    abstract: 'Sammendrag',
    methodology: 'Metodologi',
    country: 'Land',
    timeDimension: 'Tidsdimensjon',
    analysisUnit: 'Analyseenhet',
    samplingProcedure: 'Utvalgsprosedyre',
    dataCollectionMethod: 'Datainnsamlingsmetode',
    dataCollectionPeriod: 'Datainnsamlingsperiode',
    languageOfDataFiles: 'Språk i datafilene',
    access: 'Tilgang',
    publisher: 'Distributør',
    yearOfPublication: 'Publiseringsår',
    termsOfDataAccess: 'Tilgangsbetingelser',
    studyNumber: 'Studienummer',
    topics: 'Emner',
    keywords: 'Nøkkelord'
  },
  footer: {
    followUsOn: 'Følg oss på',
    contactUs: 'Kontakt oss',
    menu: 'Meny',
    about: 'Om',
    consortium: 'Konsortium',
    projects: 'Prosjekter',
    researchInfrastructure: 'Forskningsinfrastruktur',
    contact: 'Kontakt',
    privacy: 'Personvernpolicy'
  }
};

