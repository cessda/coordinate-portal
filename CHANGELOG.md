# Changelog

All notable changes to Searchkit will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

*For each release, use the following sub-sections:*

- *Added (for new features)*
- *Changed (for changes in existing functionality)*
- *Deprecated (for soon-to-be removed features)*
- *Removed (for now removed features)*
- *Fixed (for any bug fixes)*
- *Security (in case of vulnerabilities)*

## [2.3.0] - 2021-02-09

[10.5281/zenodo.4525832](https://zenodo.org/record/4525832)

### Additions

- Add an about page with links to the documentation, this replaces the advanced search popup ([#259](https://bitbucket.org/cessda/cessda.cdc.version2/issues/259))
- Use a localised field derived from the country ISO code for the country filter ([#252](https://bitbucket.org/cessda/cessda.cdc.version2/issues/252))
- Add missing translations for `language.notAvailable.field` ([#250](https://bitbucket.org/cessda/cessda.cdc.version2/issues/250))
- Move the language selector into the search box, and add the total number of studies to the interface ([#241](https://bitbucket.org/cessda/cessda.cdc.version2/issues/241))
- Reintroduce translation support, localise "Not Available" ([#235](https://bitbucket.org/cessda/cessda.cdc.version2/issues/235))
- Whitelist styling HTML tags ([#226](https://bitbucket.org/cessda/cessda.cdc.version2/issues/226))
- Add link to the CESSDA Topics Classification CV ([#208](https://bitbucket.org/cessda/cessda.cdc.version2/issues/208))
- Add option to set default language as part of endpoint specification ([#192](https://bitbucket.org/cessda/cessda.cdc.version2/issues/192))
- Make the keywords and topics clickable in the detail view ([#175](https://bitbucket.org/cessda/cessda.cdc.version2/issues/175))
- Added Code of Conduct ([#174](https://bitbucket.org/cessda/cessda.cdc.version2/issues/174))
- Add tooltip attributions to CVS and ELSST on the study detail page ([#173](https://bitbucket.org/cessda/cessda.cdc.version2/issues/173))
- Added highlighting for searched terms in the search results page ([#145](https://bitbucket.org/cessda/cessda.cdc.version2/issues/145))

### Changes

- Updated the tooltips for the search filters ([#266](https://bitbucket.org/cessda/cessda.cdc.version2/issues/266))
- Keep all sections visible in the study details page at all times ([#263](https://bitbucket.org/cessda/cessda.cdc.version2/issues/263))
- Add a minimum results score to prevent irrelevant matches from being returned by Elasticsearch ([#258](https://bitbucket.org/cessda/cessda.cdc.version2/issues/258))
- Rename "Go to publisher" to "Access data" ([#254](https://bitbucket.org/cessda/cessda.cdc.version2/issues/254))
- Improve the semantics of the HTML on the detail page ([#245](https://bitbucket.org/cessda/cessda.cdc.version2/issues/245))
- Change the default search operator to be AND ([#242](https://bitbucket.org/cessda/cessda.cdc.version2/issues/242))
- Include all fields in the search, except for the fields the CDC user group wants to exclude ([#238](https://bitbucket.org/cessda/cessda.cdc.version2/issues/238))
- Fixed various React.js warnings present in development mode ([#232](https://bitbucket.org/cessda/cessda.cdc.version2/issues/232))
- Applied Elasticsearch boosts at query time ([#224](https://bitbucket.org/cessda/cessda.cdc.version2/issues/224/why-no-results-with-title))
	- This is due to the depreciation of index-time boosting
- Added a link to the document landing page in the footer ([#220](https://bitbucket.org/cessda/cessda.cdc.version2/issues/220))
- Fix warnings from the ZAP scanning report ([#218](https://bitbucket.org/cessda/cessda.cdc.version2/issues/218))
- Fixed translations not being applied to the sorting selector ([#215](https://bitbucket.org/cessda/cessda.cdc.version2/issues/215))
- Apply `eslint` suggested fixes ([#203](https://bitbucket.org/cessda/cessda.cdc.version2/issues/203))
- Update Searchkit dependencies ([#198](https://bitbucket.org/cessda/cessda.cdc.version2/issues/198))
- Update Elasticsearch to 5.6 ([#188](https://bitbucket.org/cessda/cessda.cdc.version2/issues/188))
- Always show the extra metadata at the bottom of each result ([#165](https://bitbucket.org/cessda/cessda.cdc.version2/issues/165))
- UI and metadata languages, search box ([#164](https://bitbucket.org/cessda/cessda.cdc.version2/issues/164))

### Removals

- Remove the data file language from the detail page ([#255](https://bitbucket.org/cessda/cessda.cdc.version2/issues/255))
- Remove the Elasticsearch proxy ([#237](https://bitbucket.org/cessda/cessda.cdc.version2/issues/237))
- Fix HTML tags appearing in various sections of the detail page ([#226](https://bitbucket.org/cessda/cessda.cdc.version2/issues/226))
- Remove unnecessary filtering in the default request ([#217](https://bitbucket.org/cessda/cessda.cdc.version2/issues/217))
- Remove "Not available" if no PID agency is present ([#156](https://bitbucket.org/cessda/cessda.cdc.version2/issues/156))

## [2.2.1] - 2020-05-04

Searchkit - [10.5281/zenodo.3786300](https://zenodo.org/record/3786300)

### Added

- French language index

### Changed

- default results sorting order (from relevance to collection date descending) ([#163](https://bitbucket.org/cessda/cessda.cdc.version2/issues/163))
- various UI label changes ([#153](https://bitbucket.org/cessda/cessda.cdc.version2/issues/153))), ([#154](https://bitbucket.org/cessda/cessda.cdc.version2/issues/154))

### Deprecated

- N/A

### Removed

- Norwegian language index

### Fixed

- compiler warnings, as recommended by Error Prone
- issues reported by SonarQube
- test data to match changes made to the expected conditions ('not available' -> 'Agency not available')

### Security

- N/A
