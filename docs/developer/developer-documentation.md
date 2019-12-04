# cessda.cdc.version2 Developer Documentation

## Getting Started

The various Jenkins jobs in the Jenkins [DataCat](https://cit.cessda.eu/view/DataCat/) view are used to build, test and deploy the CDC components.
They are triggered automatically when code changes are committed to any of the Bitbucket repos [TODO link to list].

## Harvesting Runs

1. **Initial full run** - Runs upon application start with a delay of 60 seconds.  Does a full harvest and ingest of all records for all configured endpoints (see 'add endpoint/update URL' for endpoint configuration details).

1. **Incremental run** - Runs daily (at 00:01).  Does an incremental harvest and ingestion of records for all configured endpoints, based on the most recent ingested lastModified date.

1. **Weekly full run** - Runs weekly (Sundays at 09:00, enough time for the daily incremental run to
 have finished).  Does a full harvest and ingest of records for all configured endpoints.

## Common tasks

Make sure the harvesters (dev, staging, production) are not run in parallel against the endpoints, as some of them may time out under the load, and not deliver all the available metadata.
- set the harvesting times via the [application.yml](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/master/src/main/resources/application.yml).

Adjust the read timeout, as required, via the [application.yml](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/master/src/main/resources/application.yml).
- update the cessda.cdc.osmh-indexer.cmm README file after making changes.

### To add new endpoint/update URL of existing endpoint, edit the following files:

cessda.cdc.osmh-indexer.cmm [harvester configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/main/resources/application.yml),

cessda.cdc.osmh-indexer.cmm [harvester tests](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/test/java/eu/cessda/cdc/oci/repository/cdcHarvesterDaoTest.java).

Depending on the repository type, you also need to edit EITHER:

cessda.cdc.osmh-repository-handler.oai-pmh [oai-pmh repository handler configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh/src/development/src/main/resources/application.yml),

and cessda.cdc.osmh-repository-handler.oai-pmh [oai-pmh repository handler tests](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh/src/development/src/test/java/eu/cessda/cdc/osmhhandler/oaipmh/configuration/HandlerConfigurationPropertiesTest.java).

OR:

cessda.cdc.osmh-repository-handler.nesstar [NESSTAR repository handler configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar/src/development/src/main/resources/application.yml),

and cessda.cdc.osmh-repository-handler.nesstar [NESSTAR repository handler tests](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar/src/development/src/test/java/eu/cessda/cdc/osmhhandler/nesstar/configuration/HandlerConfigurationPropertiesTest.java).


### To add language, create a new file in:

cessda.cdc.osmh-indexer.cmm [Harvester mappings directory](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/main/resources/elasticsearch/mappings/),

cessda.cdc.osmh-indexer.cmm [Harvester settings directory](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/main/resources/elasticsearch/settings/),

cessda.cdc.searchkit [Searchkit locales directory](https://bitbucket.org/cessda/cessda.cdc.searchkit/src/master/src/locales/)

and edit following files so lists of languages match:

cdc.osmh-indexer.cmm [application.yaml](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/main/resources/application.yaml).

cdc.osmh-indexer.cmm [LanguageDocumentExtractorTest.java](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/test/java/eu/cessda/cdc/oci/service/helpers/LanguageDocumentExtractorTest.java).

cessda.cdc.searchkit [Searchkit language.js](https://bitbucket.org/cessda/cessda.cdc.searchkit/src/dev/src/utilities/language.js)

## Springboot Admin

If you cannot see a component in the [Springboot Admin GUI for dev](https://datacatalogue-dev.cessda.eu/admin/#/) or [Springboot Admin GUI for staging](https://datacatalogue-staging.cessda.eu/admin/#/) or [Springboot Admin GUI for production](https://datacatalogue.cessda.eu/admin/#/),  
then redeploy the missing component (`cessda.cdc.osmh-indexer.cmm, cessda.cdc.osmh-repository-handler.nesstar` or `cessda.cdc.osmh-repository-handler.oai-pmh`) via Jenkins,
so it can register with Springboot Admin.

Make sure that the Docker file has the `"-Dspring.profiles.active"` flag set to the correct profile name (dev, staging or live) otherwise the component will not register.
