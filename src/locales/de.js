module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Consortium of European Social Science Data Archives',
  language: {
    label: 'Sprache',
    notAvailable: {
      field: 'Nicht verfügbar',
      heading: 'Die angeforderten Daten wurden nicht gefunden.',
      content: 'Es existiert möglicherweise nicht oder ist nicht in der ausgewählten Sprache verfügbar. Wählen Sie eine alternative Sprache oder starten Sie eine neue Suche.'
    }
  },
  search: 'Finde soziale und ökonomische Forschungsdaten',
  noHits: {
    noResultsFound: 'Keine Ergebnisse für "%(query)s" in der ausgewählten Sprache gefunden.',
    searchWithoutFilters: 'Suche nach "%(query)s" ohne Filter',
    error: 'Beim Abrufen Ihrer Ergebnisse ist ein Fehler aufgetreten. Bitte versuche es erneut.',
    resetSearch: 'Suche zurücksetzen'
  },
  filters: {
    topic: {
      label: 'Thema',
      placeholder: 'Suchthemen',
      tooltip: 'Die CESSDA Topic Classification dient dazu, allgemeine Themen, Themen oder Themen einer Studie zu identifizieren.'
    },
    collectionDates: {
      label: 'Sammlungsjahre',
      placeholder: 'Suchdaten',
      tooltip: 'Der Zeitraum in Jahren, in dem die Daten erhoben wurden.'
    },
    languageOfDataFiles: {
      label: 'Sprache der Dateien',
      placeholder: 'Suchsprachen',
      tooltip: 'Sprache des Forschungsdatensatzes, d. h. Die Sprache der Variablennamen / -bezeichnungen oder Interviewtranskriptionen usw.'
    },
    country: {
      label: 'Land',
      placeholder: 'Suche nach Ländern',
      tooltip: 'Land, in dem die Studie stattgefunden hat.'
    },
    publisher: {
      label: 'Herausgeber',
      placeholder: 'Publisher suchen',
      tooltip: 'Name der Institution, die die Forschungsdaten veröffentlicht. In der Regel wird der CESSDA Service Provider die Metadateninformationen bereitstellen.'
    },
    summary: {
      label: 'Zusammenfassung filtern',
      introduction: 'Die folgenden Filter wurden auf Ihre Suche angewendet.',
      remove: 'Wählen Sie einen Filter aus, um ihn aus dieser Suche zu entfernen.',
      noFilters: 'Es wurden keine zusätzlichen Filter auf Ihre Suche angewendet.',
      close: 'Wählen Sie <strong>Schließen</strong>, um dieses Fenster zu schließen.'
    }
  },
  numberOfResults: {
    zero: '%(count)s Ergebnisse gefunden',
    one: '%(count)s Ergebnis gefunden',
    other: '%(count)s Ergebnisse gefunden'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s Ergebnisse in %(time)sms gefunden',
    one: '%(count)s Ergebnis in %(time)sms gefunden',
    other: '%(count)s Ergebnisse in %(time)sms gefunden'
  },
  sorting: {
    relevance: 'Relevanz',
    titleAscending: 'Titel (aufsteigend)',
    titleDescending: 'Titel (absteigend)',
    dateAscending: 'Sammlungsdatum (aufsteigend)',
    dateDescending: 'Sammlungsdatum (absteigend)'
  },
  advancedSearch: {
    label: 'Erweiterte Suche',
    introduction: 'Die folgenden Sonderzeichen können für erweiterte Suchanfragen verwendet werden:',
    and: '<span class="%(className)s">+</span> bedeutet <strong>UND</strong> arbeitsweise.',
    or: '<span class="%(className)s">|</span> bedeutet <strong>ODER</strong> arbeitsweise.',
    negates: '<span class="%(className)s">-</span> <strong>negiert</strong> ein einzelnes Token.',
    phrase: '<span class="%(className)s">"</span> hüllt eine Anzahl von Tokens ein, um eine <strong>Phrase</strong> zum Suchen zu bezeichnen.',
    prefix: '<span class="%(className)s">*</span> am Ende eines Terms steht eine <strong>Präfixabfrage</strong>.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> <strong>Präzedenz</strong> angeben.',
    distance: '<span class="%(className)s">~N</span> nach einem Wort bedeutet <strong>Bearbeitungsabstand</strong> (Unschärfe).',
    slop: '<span class="%(className)s">~N</span> nach einer Phrase bedeutet <strong>Slop</strong> Menge.',
    escaping: {
      heading: 'Sonderzeichen',
      content: 'Die obigen Zeichen sind reserviert. Um nach einem dieser Sonderzeichen zu suchen, müssen Sie mit <span class="%(className)s">\\</span> escaped sein.'
    },
    defaultOperator: {
      heading: 'Standardoperator',
      content: 'Der Standardoperator, wenn in einem gegebenen Suchbegriff keine Sonderzeichen enthalten sind, ist <strong>ODER</strong>. Zum Beispiel, wenn Sie nach <em class="%(className)s">Social Science</em> suchen, wird dies als <em class="%(className)s">Social</em> <strong>ODER</strong> <em class="%(className)s">Science</em> interpretiert.'
    }
  },
  reset: {
    query: 'Suche zurücksetzen',
    filters: 'Filter zurücksetzen'
  },
  similarResults: {
    heading: 'Ähnliche Ergebnisse',
    notAvailable: 'Keine ähnlichen Ergebnisse gefunden.'
  },
  resultsPerPage: 'Ergebnisse pro Seite',
  sortBy: 'Sortiere nach',
  showFilters: 'Filter anzeigen',
  hideFilters: 'Filter ausblenden',
  readMore: 'Mehr anzeigen',
  readLess: 'Weniger anzeigen',
  viewJson: 'JSON anzeigen',
  goToStudy: 'Zur Studie wechseln',
  forthcoming: 'Bevorstehend',
  back: 'Zurück',
  close: 'Schließen',
  metadata: {
    studyTitle: 'Titel der Studie',
    creator: 'Schöpfer',
    studyPersistentIdentifier: 'Studienbezeichner',
    abstract: 'Abstrakt',
    methodology: 'Methodik',
    country: 'Land',
    timeDimension: 'Zeit Dimension',
    analysisUnit: 'Analyseeinheit',
    samplingProcedure: 'Stichprobenverfahren',
    dataCollectionMethod: 'Datensammelmethode',
    dataCollectionPeriod: 'Datensammlungszeitraum',
    languageOfDataFiles: 'Sprache der Datendateien',
    access: 'Zugriff',
    publisher: 'Herausgeber',
    yearOfPublication: 'Veröffentlichungsjahr',
    termsOfDataAccess: 'Bedingungen des Datenzugriffs',
    studyNumber: 'Studiennummer',
    topics: 'Themen',
    keywords: 'Schlüsselwörter'
  },
  footer: {
    followUsOn: 'Folge uns auf',
    contactUs: 'Kontaktiere uns',
    menu: 'Menü oder Seitenstruktur',
    about: 'Über',
    consortium: 'Konsortium',
    projects: 'Projekte',
    researchInfrastructure: 'Forschungsinfrastruktur',
    contact: 'Kontakt',
    privacy: 'Datenschutz-Bestimmungen'
  }
};
