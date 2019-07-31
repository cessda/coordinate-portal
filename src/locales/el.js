// Copyright CESSDA ERIC 2017-2019
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
    titleAscending: 'Τίτλος (αύξουσα)',
    titleDescending: 'Τίτλος (φθίνουσα)',
    dateAscending: 'Ημερομηνία συλλογής δεδομένων (αύξουσα)',
    dateDescending: 'Ημερομηνία συλλογής δεδομένων (φθίνουσα)'
  },
  advancedSearch: {
    label: 'Σύνθετη αναζήτηση',
    introduction: 'Οι παρακάτω ειδικοί χαρακτήρες μπορούν να χρησιμοποιηθούν σε ερωτήματα σύνθετης αναζήτησης:',
    and: '<span class="%(className)s">+</span> δηλώνει τη λειτουργία <strong>ΚΑΙ(AND)</strong> operation.',
    or: '<span class="%(className)s">|</span> δηλώνει τη λειτουργία<strong> Η(OR)</strong> operation.',
    negates: '<span class="%(className)s">-</span> <strong>εξαιρεί</strong> μια απλή λέξη από την αναζήτηση.',
    phrase: '<span class="%(className)s">"</span>  περικλείει μια σειρά από λέξεις σε μια ενιαία <strong>φράση</strong> για αναζήτηση.',
    prefix: '<span class="%(className)s">*</span> δηλώνει ένα ερώτημα <strong>προθέματος</strong> στο τέλος κάθε όρου.',
    precedence: '<span class="%(className)s">(</span> και <span class="%(className)s">)</span> δηλώνει <strong>προτεραιότητα</strong>.',
    distance: '<span class="%(className)s">~N</span> όταν ακολουθεί μια λέξη ο ακέραιος N δηλώνει  <strong>την επιτρεπόμενη απόσταση,</strong> ώστε να ταιριάζουν οι δύο λέξεις(ασάφεια).',
    slop: '<span class="%(className)s">~N</span> όταν ακολουθεί μια φράση ο ακέραιος N δηλώνει <strong>το πλήθος των χαρακτήρων</strong> που μπορεί να διαφέρουν.',
    escaping: {
      heading: 'Αναζήτηση δεσμευμένων χαρακτήρων',
      content: 'Όλοι οι παραπάνω ειδικοί χαρακτήρες είναι δεσμευμένοι. Για να αναζητήσετε κάποιους από αυτούς τους ειδικούς χαρακτήρες, θα πρέπει να προηγηθεί το σύμβολο <span class="%(className)s">\\</span>.'
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
    privacy: 'Πολιτική Απορρήτου',
    tools: 'CESSDA Tools & Services'
  }
};
