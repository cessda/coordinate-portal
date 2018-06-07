module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Konzorcium EurĂłpskych spoloÄŤenskovednĂ˝ch dĂˇtovĂ˝ch archĂ­vov',
  language: {
    label: 'Jazyk',
    notAvailable: {
      field: 'Nie je k dispozĂ­cii',
      heading: 'PoĹľadovanĂ© dĂˇta neboli nĂˇjdenĂ©.',
      content: 'DĂˇta neexistujĂş alebo nie sĂş k dispozĂ­cii v zvolenom jazyku. ZvoÄľte inĂ˝ jazyk, alebo zaÄŤnite novĂ© vyhÄľadĂˇvanie.'
    }
  },
  search: 'NĂˇjdi dĂˇta zo sociĂˇlnych a ekonomickĂ˝ch vĂ˝skumov',
  noHits: {
    noResultsFound: 'Pre hÄľadanie "%(query)s" neboli nĂˇjdenĂ© Ĺľadne vĂ˝sledky vo zvolenom jazyku.',
    searchWithoutFilters: 'HÄľadaj "%(query)s" bez pouĹľitia filtrov',
    error: 'Ä˝utujeme, ale vyskytol sa problĂ©m pri preberanĂ­ vĂ˝sledkov. SkĂşste znovu, prosĂ­m.',
    resetSearch: 'VynulovaĹĄ hÄľadanie'
  },
  filters: {
    topic: {
      label: 'TĂ©ma',
      placeholder: 'TĂ©my na vyhÄľadĂˇvanie',
      tooltip: 'KlasifikĂˇcia tĂ©m CESSDA slĂşĹľi na identifikovanie zĂˇkladnĂ˝ch tĂ©m a predmetov vĂ˝skumu.'
    },
    collectionDates: {
      label: 'Roky zberu dĂˇt',
      placeholder: 'HÄľadanie (roky)',
      tooltip: 'Obdobie, v rokoch, kedy boli dĂˇta zozbieranĂ©.'
    },
    languageOfDataFiles: {
      label: 'Jazyk dĂˇtovĂ˝ch sĂşborov',
      placeholder: 'Jazyk, v ktorom prebieha vyhÄľadĂˇvanie',
      tooltip: 'Jazyk vĂ˝skumnĂ©ho sĂşboru. Ide o jazyk, v ktorom sĂş uvĂˇdzanĂ© premennĂ©, ich popisky, prepisi rozhovorov a pod.'
    },
    country: {
      label: 'Ĺ tĂˇt',
      placeholder: 'Krajina vyhÄľadĂˇvania',
      tooltip: 'Krajina, v ktorej sa realizoval zber dĂˇt.'
    },
    publisher: {
      label: 'VydavateÄľ',
      placeholder: 'HÄľadaj vo vydavateÄľoch',
      tooltip: 'NĂˇzov inĹˇtitĂşcie publikujĂşce vĂ˝skumnĂ© dĂˇta. Vo vĂ¤ÄŤĹˇine prĂ­padov pĂ´jde o poskytovateÄľa sluĹľby CESSDA, ktorĂ˝ poskytuje metadĂˇta k vĂ˝skumom.'
    },
    summary: {
      label: 'PrehÄľad filtrov',
      introduction: 'Vo vaĹˇom vyhÄľadĂˇvanĂ­ boli pouĹľitĂ© nasledujĂşce filtre.',
      remove: 'ZvoÄľte filte, ktorĂ˝ cchete odstrĂˇnuiĹĄ z tohoto vyhÄľadĂˇvania.',
      noFilters: 'Vo vaĹˇom vyhÄľadĂˇvanĂ­ neboli pouĹľitĂ© Ĺľiadne ÄŹalĹˇie filtrovacie podmienky.',
      close: 'Vyberte <strong>Zavri</strong> na zatvorenie tohoto okna.'
    }
  },
  numberOfResults: {
    zero: '%(count)s Ĺľiaden nĂˇjdenĂ˝ vĂ˝sledok',
    one: '%(count)s jeden nĂˇjdenĂ˝ vĂ˝sledok',
    other: '%(count)s nĂˇjdenĂ© vĂ˝sledky'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s Ĺľiaden nĂˇjdenĂ˝ vĂ˝sledok v %(time)sms',
    one: '%(count)s jeden nĂˇjdenĂ˝ vĂ˝sledok v %(time)sms',
    other: '%(count)s nĂˇjdenĂ© vĂ˝sledky v %(time)sms'
  },
  sorting: {
    relevance: 'RelevantnosĹĄ',
    titleAscending: 'ÄŚas (vzostupne)',
    titleDescending: 'NĂˇzov (zostupne)',
    dateAscending: 'DĂˇtum zberu dĂˇt (vzostupne)',
    dateDescending: 'DĂˇtum zberu dĂˇt (zostupne)'
  },
  advancedSearch: {
    label: 'RozĹˇĂ­renĂ© vyhÄľadĂˇvanie',
    introduction: 'V rozĹˇĂ­renom vyhÄľadĂˇvanĂ­ mĂ´Ĺľete pouĹľiĹĄ nasledovnĂ© ĹˇpeciĂˇlne znaky:',
    and: '<span class="%(className)s">+</span> signifies <strong>AND</strong> operation.',
    or: '<span class="%(className)s">|</span> signifies <strong>OR</strong> operation.',
    negates: '<span class="%(className)s">-</span> <strong>negates</strong> a single token.',
    phrase: '<span class="%(className)s">"</span> wraps a number of tokens to signify a <strong>phrase</strong> for searching.',
    prefix: '<span class="%(className)s">*</span> at the end of a term signifies a <strong>prefix</strong> query.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> signify <strong>precedence</strong>.',
    distance: '<span class="%(className)s">~N</span> after a word signifies edit <strong>distance</strong> (fuzziness).',
    slop: '<span class="%(className)s">~N</span> after a phrase signifies <strong>slop</strong> amount.',
    escaping: {
      heading: 'Ĺ peciĂˇlne znaky',
      content: 'VyĹˇĹˇie uvedenĂ© znaky sĂş vyhradenĂ©. Ak ich cete vyhÄľadĂˇvaĹĄ, treba pred ne vloĹľiĹĄ znak <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'PredvolenĂ˝ operĂˇtor',
      content: 'PredvolenĂ˝ operĂˇtor, ktorĂ˝ sa pouĹľije ak neboli pouĹľitĂ© Ĺľiadne ĹˇpeciĂˇlne znaky vo vyhÄľadĂˇvanĂ­ je <strong>OR</strong>. NaprĂ­klad pri hÄľadanĂ­ <em class="%(className)s">spoloÄŤenskĂ© vedy</em>, hÄľadanie bude interpretovanĂ© ako <em class="%(className)s">spoloÄŤenskĂ©</em> <strong>OR</strong> <em class="%(className)s">vedy</em>.'
    }
  },
  reset: {
    query: 'VymazaĹĄ hÄľadanie',
    filters: 'VymazaĹĄ nastavenĂ© filtre'
  },
  similarResults: {
    heading: 'PodobnĂ© vĂ˝sledky',
    notAvailable: 'Neboli nĂˇjdenĂ© podobnĂ© vĂ˝sledky.'
  },
  resultsPerPage: 'PoÄŤet vĂ˝sledkov na stranu',
  sortBy: 'ZoradenĂ© podÄľa',
  showFilters: 'Zobraz filtre',
  hideFilters: 'SkryĹĄ filtre',
  readMore: 'ÄŚĂ­taj viac',
  readLess: 'ÄŚĂ­taj menej',
  viewJson: 'Zobraz JSON',
  goToStudy: 'ChoÄŹ na ĹˇtĂşdiu',
  forthcoming: 'VychĂˇdza (v tlaÄŤi)',
  back: 'SpĂ¤ĹĄ',
  close: 'ZatvoriĹĄ',
  metadata: {
    studyTitle: 'NĂˇzov ĹˇtĂşdie',
    creator: 'Tvorca',
    studyPersistentIdentifier: 'TrvalĂ˝ identifikĂˇtor ĹˇtĂşdie',
    abstract: 'Abstrakt',
    methodology: 'MethodolĂłgia',
    country: 'Krajina',
    timeDimension: 'ÄŚasovĂ© rozmedzie',
    analysisUnit: 'AnalyzovanĂ© jednotky',
    samplingProcedure: 'VĂ˝ber vĂ˝skumnej vzorky',
    dataCollectionMethod: 'MetĂłda zberu dĂˇt',
    dataCollectionPeriod: 'Obdobie zberu dĂˇt',
    languageOfDataFiles: 'Jazyk dĂˇtovĂ©ho sĂşboru',
    access: 'PrĂ­stup',
    publisher: 'VydavateÄľ',
    yearOfPublication: 'Rok vydania',
    termsOfDataAccess: 'Podmienky prĂ­stupu',
    studyNumber: 'ÄŤĂ­slo ĹˇtĂşdie',
    topics: 'Predmety',
    keywords: 'KÄľĂşÄŤovĂ© slovĂˇ'
  },
  footer: {
    followUsOn: 'Sledujte nĂˇs na',
    contactUs: 'Kontaktujte nĂˇs',
    menu: 'Menu',
    about: 'O nĂˇs',
    consortium: 'Konzorcium',
    projects: 'Projekty',
    researchInfrastructure: 'VĂ˝skumnĂˇ infraĹˇtruktĂşra',
    contact: 'Kontakt',
    privacy: 'UchovĂˇvanie osobnĂ˝ch dĂˇt'
  }
};