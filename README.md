# CESSDA.PASC.SEARCHKIT

This repository contains all source code for the CESSDA Data Catalogue web application.

Separate repositories are provided for backend architecture; harvester, indexer and Elasticsearch instance.

## Prerequisites

[Node.js](https://nodejs.org/) version 9.11 is required to install and run this application.

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

> **Building:** In order to run the application in production, it must first be built using the `npm run build` command.
> This will compile assets into the `/dist` directory.

> **Updating:** When fetching/pulling new builds it is recommended to run `npm install` again.
> This will ensure all locally installed dependencies match their development environment counterparts.

## Configuration

The application can be configured using the following environment variables.

| Variable                 | Required | Type      | Default Value | Description                                                                                                      |
| ------------------------ | -------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `PASC_DEBUG_MODE`        | No       | `boolean` | `false`       | Enables debug mode which outputs additional debugging information in the user interface and web browser console. |
| `PASC_PORT`              | No       | `integer` | `8088`        | The port number which will be used to access this web application.                                               |
| `PASC_ELASTICSEARCH_URL` | Yes      | `string`  | -             | The web address of the Elasticsearch instance which powers all searches.                                         |
| `PASC_ANALYTICS_ID`      | No       | `string`  | -             | The Google Analytics ID (`UA-xxxxxxxxx-x`) used for tracking events. Tracking is disabled if not provided.       |

Set environment variables using the following syntax.

* Windows: `set PASC_PORT=80`
* macOS/Linux: `export PASC_PORT=80`
* Dockerfile: `ENV PASC_PORT=80`

If running in a development environment using JetBrains WebStorm (see *Tooling* below), variables can be set within the IDE [using this documentation](https://www.jetbrains.com/help/webstorm/run-debug-configuration-node-js.html).

## Project Structure

This project follows a best practice structure for React+Redux applications. See Redux documentation for an explanation on [actions](https://redux.js.org/basics/actions) and [reducers](https://redux.js.org/basics/reducers).

```bash
<ROOT>
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

See `package.json` in the root directory for a full list of third party libraries used.

## Tooling

For development, the following software tools are recommended and have full support for the technologies/languages used in this project.

* [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) or
* [Atom](https://atom.io/) with [Nuclide](https://nuclide.io/) package

## How To

#### Add a new language

1. Create a new language file in the `/src/locales` directory, using the 2 letter language ISO code for the file name. It is recommended to copy the English file `en.js` and use that as a template/starting point.
2. Add your translations to the new file. Basic HTML markup is supported but its use should be limited. Some strings use variables which are defined as `%(VARIABLE)s`. Do not modify the JSON structure or object keys.
3. Notify the application about this new file by adding it to the languages array defined in `/src/utilities/language.js`. It is expected that each language will have its own Elasticsearch index. When specifying the `locale`, remember to add the import statement `import xx from '../locales/xx';` at the top. Use the following syntax:

```javascript
// {
//   code   : The 2 letter ISO code for this language.
//   label  : The native label for this language.
//   index  : The Elasticsearch index containing data for this language.
//   locale : The imported locale for this language.
// }
```

> Translations can be displayed in markup using `<Translate content="filters.topic.label"/>` where the `content` attribute is the JSON path to the specific string required.

N.B. list of CESSDA languages (as at June 2018):

cs (Czech)

da (Danish)

de (German)

en (English)

es (Spanish)

fi (Finnish)

fr (French)

el (Greek)

hu (Hungarian)

lt (Lithuanian)

nl (Dutch)

no (Norwegian)

pt (Portuguese)

ro (Romanian)

se (Swedish)

sk (Slovak)

sl (Slovenian)



#### Add a new field

1. Each study retrieved from Elasticsearch is first routed through the `getStudyModel()` method located in `/src/utilities/metadata.js`. This cleans the data ready to be used throughout the application. Add the new field to the object returned from this method. Like other fields, it should be provided from Elasticsearch as a child property of the `data._source` object.
2. If the field should be displayed on the search page for each result, modify the `/src/components/Result.jsx` component. Add additional HTML markup as necessary and the new field will be available as a child property of the `item` object. For example `<p>{item.newField}</p>`.
3. If the field should be displayed on the study detail page, modify the `/src/components/Detail.jsx` component. Add additional HTML markup as necessary and the new field will be available as a child property of the `item` object. For example `<p>{item.newField}</p>`.
4. Remember to add new strings to the translations located in `/src/locales` if necessary (i.e. for the new field label etc.)
5. Remember to modify the `getJsonLd()` method if you want the new field to be available in the JSON-LD Schema (see how to *Modify Schema.org JSON-LD* below).

#### Modify search filters

1. All search filters are located in `/src/containers/SearchPage.jsx` lines `78-162`. The `field` and `fieldOptions` attributes are used to map to Elasticsearch fields. Add additional markup for new filters as necessary.

> The Searchkit UI framework provides several filter controls and documentation can be found [here](http://docs.searchkit.co/stable).

#### Modify sorting fields

1. The list of available fields for sorting can be modified in the `options` attribute in `/src/components/Topbar.jsx` lines `35-61`.

#### Modify Elasticsearch queries

1. All queries performed against Elasticsearch are defined in one file for easy modification. See `/src/utilities/searchkit.js`.

#### Modify Schema.org JSON-LD (used by Google indexer)

1. General organisation information and social media links are generated for every page. JSON-LD can be modified in `/src/components/Footer.jsx` on lines `70-83`.
2. Dataset metadata is generated on the detail page for a single study record. JSON-LD can be modified in `/src/utilities/metadata.js` using method `getJsonLd()`. This method takes a study returned from `getStudyModel()` as its input.

> Google documentation on supported dataset JSON-LD properties can be found [here](https://developers.google.com/search/docs/data-types/dataset).

## Known Issues

As of *15th June 2018*...

* Elasticsearch contains no index for SE and SK languages however they have translations in the user interface. Therefore these languages currently use the English "cmmstudy_en" index. See `/src/utilities/language.js` lines `36` abd `41`. If metadata is available in those languages, new indices should be created in Elasticsearch (i.e. "cmmstudy_se" and "cmmstudy_sk")

## Resources

* [Issue Tracker](https://bitbucket.org/cessda/cessda.pasc.version2/issues)
* [Trello Development Board](https://trello.com/b/c9ibP7KR)
