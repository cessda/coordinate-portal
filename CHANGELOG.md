# Changelog

All notable changes to Searchkit will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

*For each release, use the following sub-sections:*
*- Added (for new features)*
*- Changed (for changes in existing functionality)*
*- Deprecated (for soon-to-be removed features)*
*- Removed (for now removed features)*
*- Fixed (for any bug fixes)*
*- Security (in case of vulnerabilities)*

## [Unreleased]

### Additions

- Add option to set default language as part of endpoint specification ([#192](https://bitbucket.org/cessda/cessda.cdc.version2/issues/192))
- Added Code of Conduct ([#174](https://bitbucket.org/cessda/cessda.cdc.version2/issues/174))

### Changes

- Fixed various React.js warnings present in development mode ([#232](https://bitbucket.org/cessda/cessda.cdc.version2/issues/232))
- Fixed translations not being applied to the sorting selector ([#215](https://bitbucket.org/cessda/cessda.cdc.version2/issues/215))
- Apply `eslint` suggested fixes ([#203](https://bitbucket.org/cessda/cessda.cdc.version2/issues/203))
- Update Searchkit dependencies ([#198](https://bitbucket.org/cessda/cessda.cdc.version2/issues/198))
- Update Elasticsearch to 5.6 ([#188](https://bitbucket.org/cessda/cessda.cdc.version2/issues/188))
- UI and metadata languages, search box ([#164](https://bitbucket.org/cessda/cessda.cdc.version2/issues/164))

### Removals

- Remove the Elasticsearch proxy ([#237](https://bitbucket.org/cessda/cessda.cdc.version2/issues/237))
- Remove unnecessary filtering in the default request ([#217](https://bitbucket.org/cessda/cessda.cdc.version2/issues/217))

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
