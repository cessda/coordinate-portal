# OAI-PMH Endpoint Checks

Run these simple tests from any browser:

`<endpoint URL>?verb=Identify`

`<endpoint URL>?verb=ListMetadataFormats`

`<endpoint URL>?verb=ListSets`

*e.g. <https://kuha.sa.dk/v0/oai?verb=Identify>*

And check that the responses are well formed.

You can also use the [BASE OAI-PMH Validator](http://oval.base-search.net/).

To check if any metadata records are available to harvest, enter this into a browser:

`<endpoint URL>?verb=ListIdentifiers&metadataPrefix=<metadataPrefix>`

Where `<metadataPrefix>` is one of the values returned by `<endpoint URL>?verb=ListMetadataFormats`

*e.g. <https://kuha.sa.dk/v0/oai?verb=ListIdentifiers&metadataPrefix=oai_ddi22>*
