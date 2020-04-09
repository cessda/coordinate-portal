# FAQ

## 1. For some Repos why does the handler fail to log the expected headers count

### Description

Eg: for GESIS and DANS repo

Unable to parse RecordHeadersCount from oai-pmh xml response.

```log
(getRecordHeaders)   (ListRecordHeadersServiceImpl.java:64) - ParseRecordHeaders retrieved [5923] of [-1] expected record headers for [http://dbkapps.gesis.org/dbkoai3]
```

Even with the logging on “DEBUG”, I’ve no real clues regarding our problem. Have you already seen this error?

### Answer

That actually is a friendly message to notify you that although the application has processed N number of headers it could not guarantee what was expected because the endpoint does not explicitly provide the total number of headers to expect in the resumptionToken/@completeListSize. This element could also be missing from some repos like you have just noticed for DANS.  

See example fully compliant element from UKDS:

view-source: <http://services.fsd.uta.fi/v0/oai?verb=ListIdentifiers&metadataPrefix=ddi_c>

```xml
<resumptionToken completeListSize="1363" cursor="0">
    cursor%3A0%26from%3ANone%26until%3A2018-04-05T16%3A32%3A58Z%26completeListSize%3A1363%26metadataPrefix%3Addi_c
</resumptionToken>
```

And one from DANS noting the missing attribute @completeListSize

view-source: <https://easy.dans.knaw.nl/oai/?verb=ListIdentifiers&metadataPrefix=oai_dc>

```xml
<resumptionToken cursor="0">X1175934628/1</resumptionToken>
```

## 2. Why is my search result not as expected

The search catalogue works same as with most search engines with some characters having a special meaning.  Please review the following pages:

- [Example search constructs here](../search/advance_search_examples.md)
- [Basic search guide](../search/basic_search.md)
- [Advance search guide](../search/advance_search.md)

## 3. Why am I seeing results higher than what I am expecting

Also check you are sorting the results based on relevancy and note by date.  Sorting based on relevancy is just that, and the search analytics are not taken into consideration when sorting.

Note the following fields are boosted,  meaning if they have a better match they will be boosted much higher base on the following order.

- Title Study `x 3.5`
- Abstract `x 2`
- Creators `x 2`

## 4. Why am I seeing content in a language that I am not expecting

- If no language is detected for a particular language this is ingested into the English record index.
- CMM model specification assumes language is indicated in specific element's attributes of the raw SPs study record, please review the CMM model documents if you will like to learn more.
