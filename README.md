
[![Build Status](https://jenkins.cessda.eu/buildStatus/icon?job=cessda.cdc.searchkit%2Fmaster)](https://jenkins.cessda.eu/job/cessda.cdc.searchkit/job/master/)
[![Quality Gate Status](https://sonarqube.cessda.eu/api/project_badges/measure?project=eu.cessda.pasc%3Apasc-searchkit&metric=alert_status)](https://sonarqube.cessda.eu/dashboard?id=eu.cessda.pasc%3Apasc-searchkit)
[![Coverage](https://sonarqube.cessda.eu/api/project_badges/measure?project=eu.cessda.pasc%3Apasc-searchkit&metric=coverage)](https://sonarqube.cessda.eu/dashboard?id=eu.cessda.pasc%3Apasc-searchkit)
[![Maintainability Rating](https://sonarqube.cessda.eu/api/project_badges/measure?project=eu.cessda.pasc%3Apasc-searchkit&metric=sqale_rating)](https://sonarqube.cessda.eu/dashboard?id=eu.cessda.pasc%3Apasc-searchkit)
[![Reliability Rating](https://sonarqube.cessda.eu/api/project_badges/measure?project=eu.cessda.pasc%3Apasc-searchkit&metric=reliability_rating)](https://sonarqube.cessda.eu/dashboard?id=eu.cessda.pasc%3Apasc-searchkit)
[![Security Rating](https://sonarqube.cessda.eu/api/project_badges/measure?project=eu.cessda.pasc%3Apasc-searchkit&metric=security_rating)](https://sonarqube.cessda.eu/dashboard?id=eu.cessda.pasc%3Apasc-searchkit)
[![Lines of Code](https://sonarqube.cessda.eu/api/project_badges/measure?project=eu.cessda.pasc%3Apasc-searchkit&metric=ncloc)](https://sonarqube.cessda.eu/dashboard?id=eu.cessda.pasc%3Apasc-searchkit)

# CESSDA.CDC.SEARCHKIT

This repository contains all source code for the CESSDA Data Catalogue web application.

Separate repositories are provided for backend architecture; harvester, indexer and Elasticsearch instance.

## Quality - Software Maturity Level

The overall Software Maturity Level for this product and the individual scores for each attribute can be found in the [SML](SML.md) file.

## Prerequisites

[Node.js](https://nodejs.org/) version 12 (LTS) is required to install and run this application.

You will need an existing local or remote Elasticsearch instance setup and running.

## Quick Start

Please be aware of *Known Issues* (see bottom) before running.

1. Check *Prerequisites* and install any required software.
2. Clone the repository to your local workspace.
3. Open a Command Prompt/Terminal window and navigate to the project root directory.
4. Enter `npm install` to install the application and all required dependencies.
5. Set the required environment variables (see *Configuration* below).
6. Run the application using one of the following commands.
    * Development: `npm run startdev`
    * Production: `npm run startprod` (Requires the application to be built. See *Building* below.)

> **Building:** In order to run the application in production, it must first be built using the `npm run build` command. This will compile assets into the `/dist` directory. This is not needed if the application is started with `npm run startdev`.  
> **Updating:** When fetching/pulling new builds it is recommended to run `npm install` again. This will ensure all locally installed dependencies match their development environment counterparts.  
> **Testing:** Tests can be run using `npm run test`. Code coverage will be reported in the `/coverage` directory.

## Configuration

The application can be configured using the following environment variables.

| Variable                 | Required | Default Value | Description                                                                                                      |
| ------------------------ | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `PASC_DEBUG_MODE`        | No       | `false`       | Enables debug mode which outputs additional debugging information in the user interface and web browser console. |
| `PASC_PORT`              | No       | `8088`        | The port number which will be used to access this web application.                                               |
| `PASC_ELASTICSEARCH_URL` | Yes      | `http://localhost:9200/` | The web address of the Elasticsearch instance which powers all searches.                              |
| `PASC_ENABLE_ANALYTICS`  | No       | `false`       | Enables collecting user metrics which are sent to Matomo Analytics. This is a build time parameter.              |

Set environment variables using the following syntax.

* Windows: `set PASC_PORT=80`
* macOS/Linux: `export PASC_PORT=80`
* Dockerfile: `ENV PASC_PORT=80`

If running in a development environment using JetBrains WebStorm (see *Tooling* below), variables can be set within the IDE [using this documentation](https://www.jetbrains.com/help/webstorm/run-debug-configuration-node-js.html).

## Project Structure

This project follows a best practice structure for React+Redux applications. See Redux documentation for an explanation on [actions](https://redux.js.org/basics/actions) and [reducers](https://redux.js.org/basics/reducers).

```bash
<ROOT>
├── coverage            # The output directory for the code coverage report using the test command.
├── dist                # The output directory for compilation using the build command.
├── flow-typed          # Flow library definitions for type checking.
├── infrastructure      # Scripts and configuration for deployment.
├── node_modules        # Third party packages and node dependencies.
├── server              # Markup and scripts for the server instance.
└── src                 # Contains all source code and assets for the application.
    ├── actions         # Redux actions and action creators for state container.
    ├── components      # React user interface components.
    ├── containers      # React page container components.
    ├── img             # Image assets.
    ├── locales         # Language translations.
    ├── reducers        # Redux reducers for state container.
    ├── styles          # SASS files for styling.
    └── utilities       # Miscellaneous scripts and helpers.
└── tests               # Jest unit tests.
```

## Technology Stack

Several frameworks are used in this application.

The primary programming language is Flow and JSX in ECMAScript 6. See *Tooling* (below) for compatible IDEs.

| Framework/Technology                                 | Description                                              |
| ---------------------------------------------------- | -------------------------------------------------------- |
| JavaScript/[JSX](https://facebook.github.io/jsx/)    | ECMAScript with XML-like syntax extensions.              |
| [React](https://reactjs.org/)                        | JavaScript library for building user interfaces.         |
| [Redux](https://redux.js.org/)                       | Predictable state container for JavaScript applications. |
| [Searchkit](http://www.searchkit.co/)                | React component library for Elasticsearch.               |
| [Babel](https://babeljs.io/)                         | JavaScript compiler for ECMAScript 6.                    |
| [Flow](https://flow.org/)                            | Static type checker for JavaScript.                      |
| [Flow-Typed](https://github.com/flowtype/flow-typed) | Central repository for Flow library definitions.         |
| [Webpack](https://webpack.js.org/)                   | JavaScript module bundler.                               |
| [Sass](http://sass-lang.com/)                        | CSS extension language.                                  |
| [Bulma](https://bulma.io/)                           | CSS framework based on Flexbox.                          |
| [Jest](https://jestjs.io/)                           | JavaScript testing framework.                            |
| [Enzyme](https://airbnb.io/enzyme/)                  | JavaScript testing utility for React Components.         |

See [`package.json`](package.json) in the root directory for a full list of third party libraries used.

## Tooling

For development, the following software tools are recommended and have full support for the technologies/languages used in this project.

* [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)
* [Atom](https://atom.io/) with [Nuclide](https://nuclide.io/) (EOL Announced) package

## How To

### Add a new language

1. Create a new language file in the `/src/locales` directory, using the 2 letter language ISO code for the file name. It is recommended to copy the English file `en.js` and use that as a template/starting point.
2. Add your translations to the new file. Basic HTML mark-up is supported but its use should be limited. Some strings use variables which are defined as `%(VARIABLE)s`. Do not modify the JSON structure or object keys.
3. Notify the application about this new file by adding it to the languages array defined in `/src/utilities/language.js`. It is expected that each language will have its own Elasticsearch index. When specifying the `locale`, remember to add the import statement `import xx from '../locales/xx';` at the top. Use the following syntax:

```javascript
{
  code:   // The 2 letter ISO code for this language.
  label:  // The native label for this language.
  index:  // The Elasticsearch index containing data for this language.
  locale: // The imported locale for this language.
}
```

> Translations can be displayed in mark-up using `<Translate content="filters.topic.label"/>` where the `content` attribute is the JSON path to the specific string required.

N.B. list of CESSDA languages (*as of May 2020*):

* cs (Czech)
* da (Danish)
* de (German)
* el (Greek)
* en (English)
* es (Spanish)
* et (Estonian)
* fi (Finnish)
* fr (French)
* hu (Hungarian)
* it (Italian)
* nl (Dutch)
* no (Norwegian)
* pt (Portuguese)
* sk (Slovak)
* sl (Slovenian)
* sr (Serbian)
* sv (Swedish)

#### Add a new field

1. Each study retrieved from Elasticsearch is first routed through the `getStudyModel()` method located in `/src/utilities/metadata.js`. This cleans the data ready to be used throughout the application. Add the new field to the object returned from this method. Like other fields, it should be provided from Elasticsearch as a child property of the `data._source` object.
2. If the field should be displayed on the search page for each result, modify the `/src/components/Result.jsx` component. Add additional HTML mark-up as necessary and the new field will be available as a child property of the `item` object. For example `<p>{item.newField}</p>`.
3. If the field should be displayed on the study detail page, modify the `/src/components/Detail.jsx` component. Add additional HTML mark-up as necessary and the new field will be available as a child property of the `item` object. For example `<p>{item.newField}</p>`.
4. Remember to add new strings to the translations located in `/src/locales` if necessary (i.e. for the new field label etc.)
5. Remember to modify the `getJsonLd()` method if you want the new field to be available in the JSON-LD Schema (see how to *Modify Schema.org JSON-LD* below).

#### Modify search filters

All search filters are located in `/src/containers/SearchPage.jsx` lines `78-162`.

1. Configure Elasticsearch CMMStudy fields to filter on:
   * The `field` and `fieldOptions` attributes are used to map to Elasticsearch fields.
   * Add additional mark-up for new filters as necessary.
2. Configure the number of items returned in the filters:

By changing the following field (Generally we have set these to 500):

```jsx
<SideBar>
  <NameOfTypeOfFilter
      id="ItsGivenID-toMatchElasticField"
      size={500}  // < -- Change number Here
  />
  ...
</SideBar>
```

> The Searchkit UI framework provides several filter controls and documentation can be found at <http://docs.searchkit.co/stable>

#### Modify sorting fields

1. The list of available fields for sorting can be modified in the `options` attribute in `/src/components/Topbar.jsx` lines `35-61`.

#### Modify Elasticsearch queries

1. All queries performed against Elasticsearch are defined in one file for easy modification. See `/src/utilities/searchkit.js`.

#### Modify Schema.org JSON-LD (used by Google indexer)

1. General organisation information and social media links are generated for every page. JSON-LD can be modified in `/src/components/Footer.jsx` on lines `70-83`.
2. Dataset metadata is generated on the detail page for a single study record. JSON-LD can be modified in `/src/utilities/metadata.js` using method `getJsonLd()`. This method takes a study returned from `getStudyModel()` as its input.

> Google documentation on supported dataset JSON-LD properties can be found at <https://developers.google.com/search/docs/data-types/dataset>

## Known Issues

As of *6 August 2019*

* The User Interface only displays records that are available in the selected UI language. So the message shown towards the top left hand side e.g. '21460 results shown' refers to the selected language only, and not the total number of available records.

* Not all UI languages have any records available to search/view in that language, so have been temporarily removed from the UI language menu, and hence cannot be selected (currently cs, de, et, fr, hu, it, pt, sr). Therefore these languages currently use the English `cmmstudy_en` index. When metadata is available in any of these languages, new indices should be created.

* Not all UI languages have a corresponding UI translation (currently cs, da, et, hu, it, nl, pt, sr), so the labels appear in English (if the language is selectable, see above).

See [cessda.cdc.version2 README](https://bitbucket.org/cessda/cessda.cdc.version2/src/master/README.md) for more details regarding adding UI languages, indexes etc.

## Deployment

The Jenkinsfile defines the deployment process. See also **'QA and Deployment'** section, above.

## Built With

The Jenkinsfile defines the build process. See also **'QA and Deployment'** section, above.

## Contributing

Please read [CESSDA Guideline for developers](https://bitbucket.org/cessda/cessda.guidelines.cit/wiki/Developers) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

See [Semantic Versioning](https://semver.org/) for guidance.

## Contributors

You can find the list of contributors in the `CONTRIBUTORS.md` file.

## License

See the [LICENSE](LICENSE) file.

## FAQs

See the [FAQ](FAQ.md) file.

## Acknowledgments

None at present.
