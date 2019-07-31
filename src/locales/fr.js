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
  cessda: 'Consortium des Centres de Données Européens en Sciences Sociales',
  language: {
    label: 'Langue',
    notAvailable: {
      field: 'Non disponible',
      heading: 'Les données demandées n\'ont pas été trouvées.',
      content: 'Les données n\'existent pas ou ne sont pas disponibles dans la langue sélectionnées. Veuillez choisir une autre langue ou démarrer une nouvelle recherche.'
    }
  },
  search: 'Rechercher des données de recherche en Sciences Sociales ou en Economie',
  noHits: {
    noResultsFound: 'Aucun résultat pour la recherche "%(query)s" dans la langue sélectionnée.',
    searchWithoutFilters: 'Rechercher "%(query)s" sans filtres',
    error: 'Désolé, un problème est intervenu lors de la récupération de vos résultats. Merci de réessayer.',
    resetSearch: 'Réinitialiser la recherche'
  },
  filters: {
    topic: {
      label: 'Thème',
      placeholder: 'Rehercher par thème',
      tooltip: 'La classification par thèmes CESSDA est utilisée pour identifier les rubriques, sujets ou thèmes des données.'
    },
    collectionDates: {
      label: 'Année de collecte',
      placeholder: 'Rechercher par année',
      tooltip: 'La période, en année, pendant laquelle les données ont été collectées.'
    },
    languageOfDataFiles: {
      label: 'Langue des fichers de données',
      placeholder: 'Rechercher par langue',
      tooltip: 'Langue de recherche du jeu de données, c\'est à dire la langue des noms et labels de variables or transcriptions d\'entretiens etc.'
    },
    country: {
      label: 'pays',
      placeholder: 'Recherche par pays',
      tooltip: 'Le pays dans lequel l\'étude a eu lieu.'
    },
    publisher: {
      label: 'Diffuseur',
      placeholder: 'Recherche par diffuseur',
      tooltip: 'Nom de l\'institution qui publie les données de recherche. C\'est généralement le CESSDA Service Provider.'
    },
    summary: {
      label: 'résumé des filtres',
      introduction: 'Les filtres suivants s\'appliquent à votre recherche.',
      remove: 'Sélectionnez un filtre pour le supprimer de cette recherche.',
      noFilters: 'Aucun filtre ne s\'applique à la recherche.',
      close: 'Sélectionnez <strong>Fermer</strong> pour fermer cette fenêtre.'
    }
  },
  numberOfResults: {
    zero: '%(count)s résultats trouvés',
    one: '%(count)s résultat trouvé',
    other: '%(count)s résultats trouvés'
  },
  numberOfResultsWithTime: {
    zero: '%(count)s résultats trouvés en %(time)sms',
    one: '%(count)s résultat trouvé en %(time)sms',
    other: '%(count)s résultats trouvés en  %(time)sms'
  },
  sorting: {
    relevance: 'Pertinence',
    titleAscending: 'Titre (croissant)',
    titleDescending: 'Titre (décroissant)',
    dateAscending: 'date de collecte (croissante)',
    dateDescending: 'date de collecte (décroissante)'
  },
  advancedSearch: {
    label: 'Recherche avancée',
    introduction: 'Les caractères spéciaux suivants peuvent être utilisés pour une recherche avancée :',
    and: '<span class="%(className)s">+</span> signifie l\'opérateur <strong>ET</strong>.',
    or: '<span class="%(className)s">|</span> signifie l\'opérateur <strong>OU</strong>.',
    negates: '<span class="%(className)s">-</span> <strong> élimine </strong> une chaîne simple.',
    phrase: '<span class="%(className)s">"</span> entoure plusieurs éléments pour indiquer la recherche d\'une <strong>phrase</strong>.',
    prefix: '<span class="%(className)s">*</span> à la fin d\'une chaîne signifie une recherche avec un <strong>joker</strong>.',
    precedence: '<span class="%(className)s">(</span> and <span class="%(className)s">)</span> signifie <strong>une priorité</strong>.',
    distance: '<span class="%(className)s">~N</span> après un mot signifie modifer la <strong>distance</strong> (flou).',
    slop: '<span class="%(className)s">~N</span> après une phrase signifie <strong>la valeur de la tolérance</strong>.',
    escaping: {
      heading: 'Protéger',
      content: 'Les caractères ci-dessus sont réservés. Pour les utiliser dans une recherche, il faudra les protéger avec le caractère <span class="%(className)s">\\</span>.'
    },
    defaultOperator: {
      heading: 'Opérateur par défaut',
      content: 'L\'opérateur par défaut dans une suite de chaînes de caratères est le : <strong>OU</strong>. Par exemple si vous saisissez les termes <em class="%(className)s">Sciences Sociales</em>, la recherche portera sur <em class="%(className)s">Sciences</em> <strong>OU</strong> <em class="%(className)s">Sociales</em>.'
    }
  },
  reset: {
    query: 'Effacer les crières de recherche',
    filters: 'Réinitialiser les filtres'
  },
  similarResults: {
    heading: 'Résultats similaires',
    notAvailable: 'Aucun résultat similaire n\'a été trouvé.'
  },
  resultsPerPage: 'résultats par page',
  sortBy: 'Trier par',
  showFilters: 'Show filters',
  hideFilters: 'Hide filters',
  readMore: 'Lire plus',
  readLess: 'Lire moins',
  viewJson: 'Visualiser le JSON',
  goToStudy: 'Vers les données',
  forthcoming: 'Avancer',
  back: 'Revenir en arrière',
  close: 'Fermer',
  metadata: {
    studyTitle: 'Titre',
    creator: 'Créateur',
    studyPersistentIdentifier: 'Identifiant persistant des données',
    abstract: 'Résumé',
    methodology: 'Méthodologie',
    country: 'Pays',
    timeDimension: 'Dimension temporelle',
    analysisUnit: 'Unité d\'analyse',
    samplingProcedure: 'Procédure d\'échantillonnage',
    dataCollectionMethod: 'Méthode de collecte',
    dataCollectionPeriod: 'Période de collecte',
    languageOfDataFiles: 'Langue des fichiers de données',
    access: 'Accès',
    publisher: 'Diffuseur',
    yearOfPublication: 'Date de publication',
    termsOfDataAccess: 'Conditions d\'accès aux données',
    studyNumber: 'Identifiant des données',
    topics: 'Thèmes',
    keywords: 'Mots-clé'
  },
  footer: {
    followUsOn: 'Suivez-nous sur',
    privacy: 'Politique de confidentialité',
    tools: 'CESSDA Tools & Services'
  }
};
