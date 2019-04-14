module.exports = {
  counterpart: {
    pluralize: (entry, count) => entry[
      (count === 0 && 'zero' in entry)
        ? 'zero' : (count === 1) ? 'one' : 'other'
      ]
  },
  cessda: 'Consortium of European Social Science Data Archives',
  language: {
    label: 'Γλώσσα',
    notAvailable: {
      field: 'Το πεδίο δεν είναι διαθέσιμο',
      heading: 'Τα δεδομένα δεν είναι βρέθηκαν',
      content: 'Τα δεδομένα δεν υπάρχουν ή να μην είναι διαθέσιμα στην επιλεγμένη γλώσσα. Επιλέξτε μια άλλη γλώσσα ή ξεκινήστε μια νέα αναζήτηση.'
    }
  },
  search: 'Εύρεση δεδομένων Κοινωνικής και Οικονομικής έρευνας',
  noHits: {
    noResultsFound: 'Δεν βρέθηκαν αποτελέσματα για "%(query)s" στην επιλεγμένη γλώσσα.',
    searchWithoutFilters: 'Αναζήτηση για "%(query)s" χωρίς φίλτρα',
    error: 'Συγνώμη, παρουσιάστηκε πρόβλημα κατά την λήψη των δεδομένων. Παρακαλώ προσπαθήστε ξανά.',
    resetSearch: 'Επαναπροσδιορισμός αναζήτησης'
  },
  filters: {
    topic: {
      label: 'Θεματική',
      placeholder: 'Αναζήτηση θεματικής',
      tooltip: 'Η ταξινόμηση, CESSDA Topic Classification, εξυπηρετεί στη ταυτοποίηση των γενικών θεματικών μιας έρευνας.'
    },
    collectionDates: {
      label: 'Χρονική περίοδος',
      placeholder: 'Αναζήτηση ετών',
      tooltip: 'Η χρονική περίοδος, σε έτη, κατά την οποία συλλέχθηκαν τα δεδομένα.'
    },
    languageOfDataFiles: {
      label: 'Γλώσσα των αρχείων δεδομένων',
      placeholder: 'Αναζήτηση γλωσσών',
      tooltip: 'Η γλώσσα του συνόλου δεδομένων μιας έρευνας, π.χ. η γλώσσας των ονομάτων/ετικετών των μεταβλητών ή η γλώσσα μεταγραφής συνεντεύξεων κ.ά.'
    },
    country: {
      label: 'Χώρα',
      placeholder: 'Αναζήτηση χωρών',
      tooltip: 'Χώρα στην οποία διεξήχθη η έρευνα.'
    },
    publisher: {
      label: 'Εκδότης',
      placeholder: 'Αναζήτηση εκδοτών',
      tooltip: 'Ονομασία του οργανισμού/ινστιτούτου που δημοσίευσε τα δεδομένα της έρευνας. Συνήθως, ο Πάροχος Υπηρεσιών (Service Provider) της CESSDA παρέχει πληροφορίες για τα μεταδεδομένα.'
    },
    summary: {
      label: 'Περίληψη φίλτρου',
      introduction: 'Τα παρακάτω φίλτρα έχουν εφαρμοστεί στην αναζήτησή σας.',
      remove: 'Επιλέξτε ένα φίλτρο προς κατάργηση από αυτή την αναζήτηση.',
      noFilters: 'Δεν έχουν εφαρμοστεί επιπλέον φίλτρα στην αναζήτησή σας.',
      close: 'Επιλέξτε <strong>Κλείσιμο</strong> για να φύγετε από αυτό το παράθυρο.'
    }
  },
  numberOfResults: {
    zero: '%(count)s αποτελέσματα βρέθηκαν',
    one: '%(count)s αποτέλεσμα βρέθηκε',
    other: '%(count)s αποτελέσματα βρέθηκαν'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s αποτελέσμα βρέθηκε στις %(time)sms',
    one: '%(count)s αποτελέσμα βρέθηκε στις %(time)sms',
    other: '%(count)s αποτελέσματα βρέθηκαν στις %(time)sms'
  },
  sorting: {
    relevance: 'Συνάφεια',
    titleAscending: 'Title (ascending)',
    titleDescending: 'Title (descending)',
    dateAscending: 'Date of collection (ascending)',
    dateDescending: 'Date of collection (descending)'
  },
  advancedSearch: {
    label: 'Advanced search',
    introduction: 'The following special characters can be used to perform advanced search queries:',
    and: '<span class="%(className)s">+</span> signifies <strong>AND</strong> operation.',
    or: '<span class="%(className)s">|</span> signifies <strong>OR</strong> operation.',
    negates: '<span class="%(className)s">-</span> <strong>negates</strong> a single token.',
    phrase: '<span class="%(className)s">"</span> wraps a number of tokens to signify a <strong>phrase</strong> for searching.',
    prefix: '<span class="%(className)s">*</span> at the end of a term signifies a <strong>prefix</strong> query.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> signify <strong>precedence</strong>.',
    distance: '<span class="%(className)s">~N</span> after a word signifies edit <strong>distance</strong> (fuzziness).',
    slop: '<span class="%(className)s">~N</span> after a phrase signifies <strong>slop</strong> amount.',
    escaping: {
      heading: 'Escaping',
      content: 'The above characters are reserved. In order to search for any of these special characters, they will need to be escaped with <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Προεπιλεγμένος λογικός τελεστής',
      content: 'Ο προεπιλεγμένος λογικός τελεστής όταν δεν υπάρχουν ειδικοί χαρακτήρες σε μια αναζήτηση είναι το <strong>Η (OR)</strong>. Για παράδειγμα κατά την αναζήτηση της φράσης <em class="%(className)s">Κοινωνικές Επιστήμες </em>, η αναζήτηση θα φέρει αποτελέσματα για το <em class="%(className)s">Κοινωνικές</em> <strong>Η(OR)</strong> <em class="%(className)s"> το Επιστήμες</em>.'
    }
  },
  reset: {
    query: 'Καθαρισμός αναζήτησης',
    filters: 'Επαναπροσδιορισμός φίλτρων'
  },
  similarResults: {
    heading: 'Παρόμοια αποτελέσματα',
    notAvailable: 'Δεν βρέθηκαν παρόμοια αποτελέσματα.'
  },
  resultsPerPage: 'Αποτελέσματα ανά σελίδα',
  sortBy: 'Ταξινόμηση κατά',
  showFilters: 'Εμφάνιση φίλτρων',
  hideFilters: 'Απόκρυψη φίλτρων',
  readMore: 'Διαβάστε περισσότερα',
  readLess: 'Διαβάστε λιγότερα',
  viewJson: 'Εμφάνιση JSON',
  goToStudy: 'Μετάβαση στην έρευνα',
  forthcoming: 'Προσεχώς',
  back: 'Πίσω',
  close: 'Κλείσιμο',
  metadata: {
    studyTitle: 'Τίτλος έρευνας',
    creator: 'Δημιουργός',
    studyPersistentIdentifier: 'Μόνιμος ταυτοποιητής έρευνας (PID)',
    abstract: 'Περίληψη',
    methodology: 'Μεθοδολογία',
    country: 'Χώρα',
    timeDimension: 'Χρονική διάσταση',
    analysisUnit: 'Μονάδα ανάλυσης',
    samplingProcedure: 'Διαδικασία δειγματοληψίας',
    dataCollectionMethod: 'Μέθοδος συλλογής δεδομένων',
    dataCollectionPeriod: 'Περίοδος συλλογής δεδομένων',
    languageOfDataFiles: 'Γλώσσα των αρχείων δεδομένων',
    access: 'Πρόσβαση',
    publisher: 'Εκδότης',
    yearOfPublication: 'Έτος δημοσίευσης',
    termsOfDataAccess: 'Όροι πρόσβασης στα δεδομένα',
    studyNumber: 'Κωδικός έρευνας',
    topics: 'Θεματικές',
    keywords: 'Λέξεις κλειδιά'
  },
  footer: {
    followUsOn: 'Ακολουθήστε μας στο',
    contactUs: 'Επικοινωνία',
    menu: 'Μενού',
    about: 'Σχετικά',
    consortium: 'Κοινοπραξία',
    projects: 'Έργα',
    researchInfrastructure: 'Ερευνητική υποδομή',
    contact: 'Επικοινωνία',
    privacy: 'Πολιτική Απορρήτου'
  }
};
