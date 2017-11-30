# CESSDA.PASC.SEARCHKIT

This repository contains all source code for the CESSDA ERIC Product and Services Catalogue web application.

Separate repositories are provided for backend architecture; harvester, indexer and Elasticsearch instance.

## Prerequisites

[Node.js](https://nodejs.org/) is required to install and run this application.

You will need an existing local or remote Elasticsearch instance setup and running.

## Quick Start

1. Check prerequisites and install any required software.
2. Clone the repository to your local workspace.
3. Open a Command Prompt/Terminal window and navigate to the project root directory.
4. Enter `npm install` to install the application and all required dependencies.
5. Set the required environment variables (see *Configuration* below).
6. Run the application using one of the following commands.
    * Development: `npm run startdev`
    * ~~Production:~~ `npm run startprod` (This script is currently undergoing refactoring)
    * ~~Local:~~ `npm run startlocal` (This script is deprecated. Use the development build)

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

```bash
<ROOT>
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

Several frameworks and languages are used in this application.

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
 

## Resources

* [Issue Tracker](https://bitbucket.org/cessda/cessda.pasc.version1/issues)
* [Trello Development Board](https://trello.com/b/P7nF2RG2)
