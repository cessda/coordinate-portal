# FAQ

## Why is my search result not as expected?

The search catalogue works same as with most search engines with some characters having a special meaning.  Please review the following pages:

- [Example search constructs here](../search/advance_search_examples.md)
- [Basic search guide](../search/basic_search.md)
- [Advance search guide](../search/advance_search.md)

## Why am I seeing unexpected results?

Check you are sorting the results based on relevance, and not by date or alphabetical order. Search analytics are not taken into consideration when not sorting by relevance.

Note that the following fields are boosted, meaning that matching these fields will have a disproportionate effect on the relevance of the results.

- Title Study `x 4`
- Abstract `x 2`
- Creators `x 2`
- Keywords.ID `x 1.5`

To investigate why a record matched, extract the raw query using developer tools and run the query against Elasticsearch directly using the [Explain API](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-explain.html).

## Why am I seeing content in a language that I am not expecting?

If no language is detected in a particular record, it is ingested into the default index for the repository it was harvested from.

The CMM model specification assumes the language is indicated in specific element attributes of the raw OAI-PMH study record. Please review the CMM model documents if you will like to learn more.
