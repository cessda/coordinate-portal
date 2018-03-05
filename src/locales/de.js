module.exports = {
  application: 'Katalog für Produkte und Dienstleistungen',
  language: {
    label: 'Sprache',
    languages: {
      en: 'Englisch',
      de: 'Deutsch'
    },
    availability: 'Diese Daten sind in den folgenden Sprachen verfügbar.',
    notAvailable: 'In der ausgewählten Sprache nicht verfügbar'
  },
  search: 'Finde soziale und ökonomische Forschungsdaten',
  noHits: {
    noResultsFound: 'Keine Ergebnisse gefunden für %(query)s.',
    searchWithoutFilters: 'Suche nach %(query)s ohne Filter',
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
    availability: {
      label: 'Verfügbarkeit',
      placeholder: 'Verfügbarkeit suchen',
      tooltip: 'Zugriffsstufen kontrollieren die Verfügbarkeit der Forschungsdaten.'
    },
    languageOfDataFiles: {
      label: 'Sprache der Dateien',
      placeholder: 'Suchsprachen',
      tooltip: 'Sprache des Forschungsdatensatzes, d. H. Die Sprache der Variablennamen / -bezeichnungen oder Interviewtranskriptionen usw.'
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
      heading: 'Flucht',
      content: 'Die obigen Zeichen sind reserviert. Um nach einem dieser Sonderzeichen zu suchen, müssen Sie mit <span class="%(className)s">\\</span> escaped sein.'
    },
    defaultOperator: {
      heading: 'Standardoperator',
      content: 'Der Standardoperator, wenn in einem gegebenen Suchbegriff keine Sonderzeichen enthalten sind, ist <strong>ODER</strong>. Zum Beispiel, wenn Sie nach <em class="%(className)s">Social Science</em> suchen, wird dies als <em class="%(className)s">Social</em> <strong>ODER</strong> <em class="%(className)s">Science</em> interpretiert.'
    }
  },
  reset: {
    query: 'Saubere Suche',
    filters: 'Filter zurücksetzen'
  },
  similarResults: 'Ähnliche Ergebnisse',
  resultsPerPage: 'Ergebnisse pro Seite',
  sortBy: 'Sortiere nach',
  showFilters: 'Filter anzeigen',
  hideFilters: 'Filter ausblenden',
  readMore: 'Weiterlesen',
  readLess: 'Lese weniger',
  viewJson: 'JSON anzeigen',
  goToCollection: 'Zur Sammlung gehen',
  goToStudy: 'Zum Studium gehen',
  forthcoming: 'Bevorstehend',
  back: 'Zurück',
  close: 'Schließen',
  metadata: {
    methodology: 'Methodik',
    access: 'Zugriff',
    topics: 'Themen',
    keywords: 'Schlüsselwörter'
  },
  footer: {
    organisationsFeed: 'Feeds für Organisationen',
    about: 'Über',
    consortium: 'Konsortium',
    training: 'Ausbildung',
    privacy: 'Datenschutz-Bestimmungen'
  }
};
