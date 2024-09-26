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

## [0.3.0] - 2024-XX-XX

### Additions

- Reindexing settings, mappings and scripts along with readme on how to use them
- Scrollbar for filters on search page
- Show research identifier for creator when possible
- Funding information section on detail view (funder and grant number)
- Kind of data on Detail view
- Divider line between sections on Detail view
- Keywords on result view with possibility to hide them

### Changes

- Creators can include research identifiers
- Calculate tooltip position before activating it and place above if not enough space below
- Move Topics and Keywords to be last on Detail view (since they are also in info box at the top of the page already)
- Keywords include a link to ELSST if possible

### Fixes

- About page metrics to show correct total for all languages
- Info box overflow with long topics and keywords
- Correctly hide some of the keywords initially on Detail view when there's a lot of them
- Interpolation for translations

## [0.2.0] - 2024-05-03

### Additions

- Similar results in Detail view
- Language select
- REST API endpoint and Swagger documentation
- Metrics endpoint
- Links to Privacy Policy and Acceptable Use Policy
- Sort results by publication year
- Available languages and access data link in search results
- View json and access data link in detail view
- Tooltips for all filters

### Changes

- Improved responsiveness of header elements
- Increased width of input fields for Collection year filter

### Fixes

- InstantSearch dropdown with :focus-visible pseudo-class now has the same highlight style as other elements
- Detail view now properly shows "Not available" for metadata fields where metadata is not available

### Security

- Updated version for packages with known vulnerabilities

## [0.1.0] - 2023-16-10

### Additions

- Preview release 1
