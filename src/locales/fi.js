module.exports = {
  counterpart: {
    names: {
      days: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
      abbreviated_days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Saattaa', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
      abbreviated_months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      am: 'AM',
      pm: 'PM'
    },
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ],
    formats: {
      date: {
        'default': '%a, %e %b %Y',
        long: '%A, %B %o, %Y',
        short: '%b %e'
      },

      time: {
        'default': '%H:%M',
        long: '%H:%M:%S %z',
        short: '%H:%M'
      },

      datetime: {
        'default': '%a, %e %b %Y %H:%M',
        long: '%A, %B %o, %Y %H:%M:%S %z',
        short: '%e %b %H:%M'
      }
    }
  },
  application: 'Data Catalog',
  language: {
    label: 'Kieli',
    availability: 'Nämä tiedot ovat saatavilla seuraavilla kielillä.',
    notAvailable: 'Ei käytettävissä valitulla kielellä'
  },
  search: 'Etsi sosiaalista ja taloudellista tutkimustietoa',
  noHits: {
    noResultsFound: '%(query)s ei löytynyt.',
    searchWithoutFilters: 'Ets %(query)s ilman suodattimia',
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
    query: 'Tyhjennä haku',
    filters: 'Poista suodattimet'
  },
  similarResults: 'Samankaltaiset tulokset',
  resultsPerPage: 'Tulos per sivu',
  sortBy: 'Lajittele',
  showFilters: 'Näytä suodattimet',
  hideFilters: 'Piilota suodattimet',
  readMore: 'Lue lisää',
  readLess: 'Lue vähemmän',
  viewJson: 'Näytä JSON',
  goToStudy: 'Mene opiskeluun',
  forthcoming: 'Forthcoming',
  back: 'Back',
  close: 'Sulje',
  metadata: {
    methodology: 'Metodologia',
    access: 'Access',
    topics: 'Aiheet',
    keywords: 'Avainsanat'
  },
  footer: {
    organisationsFeed: 'Organisations Feed',
    about: 'Tietoja',
    consortium: 'Konsortio',
    training: 'Koulutus',
    privacy: 'Tietosuojakäytäntö'
  }
};
