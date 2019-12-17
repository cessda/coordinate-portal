# CESSDA Data Catalogue v2.1.0

The CESSDA Data Catalogue (CDC) harvests metadata from various endpoints.
It uses different repository handlers (see 'Data Gathering components' below) to adapt the payload for each type of endpoint to a standard format (the Cessda Metadata Model, CMM).

## Project Structure

The CDC product is made up of several components, which can be grouped as Data Gathering, User Facing, Management and QA & Deployment.

### Data Gathering components

The following *Open Source* code repositories are used to build the harvester components:

- [cessda.cdc.osmh-indexer.cmm](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm) (harvester that periodically calls the repository handlers which build the Elasticsearch indicies).
- [cessda.cdc.osmh-repository-handler.nesstar](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar) (repository handler for OAI-PMH enabled NESSTAR endpoints serving DDI 1.2).
- [cessda.cdc.osmh-repository-handler.oai-pmh](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh) (repository handler for OAI-PMH endpoints serving DDI 2.5).

### User Facing components

The following *Open Source* code repository is used to build the user facing components:

- [cessda.cdc.searchkit](https://bitbucket.org/cessda/cessda.cdc.searchkit) (user interface).


### Management components

The following private source code repositories are used to build the management components:

- cessda.cdc.admin (Spring Boot admin console, the logs are useful to check progress of harvesting).
- cessda.cdc.deploy/elasticsearch (backend to user interface, provides search and browse functionality).
- cessda.cdc.deploy/mailrelay (used for sending messages relating to the health and status of the product to the DevOps team).
- cessda.cdc.reverse (reverse proxy used as part of the Certbot automated security certificate renewal process. Also provides authentication for components, as needed).
- cessda.cdc.sitemapgenerator (generates a sitemap for use by [Google Data Search](https://toolbox.google.com/datasetsearch) crawler).

### Documentation and issue tracking components

The following private source code repositories are used to build the documentation components:
- cessda.cdc.userguide (source files in reStructuredText markup language that are converted via Sphinx to ReadTheDocs format).
- cessda.cdc.version2 (contains an issue tracker used internally to record the backlog).

### QA and Deployment

The following private source code repositories are used to test and deploy the product's components:

- cessda.cdc.deploy (contains all the scripts and infrastructure definitions needed to deploy the product).
- cessda.cdc.test (contains test scripts used to QA the product during the deployment process).
- cessda.cmm.profile (contains and XSD file that can be used to check that the XML provided by an endpoint is compliant with the CMM profile).

## Getting Started

The various Jenkins jobs in the [DataCat](https://cit.cessda.eu/view/DataCat/) view are used to build, test and deploy the components.
They are triggered automatically when code changes are committed to any of the Bitbucket repositories listed above.

## Common tasks

Reharvesting outside of scheduled harvesting periods - just run the Jenkins job [cessda.cdc.osmh-indexer.cmm](https://cit.cessda.eu/job/cessda.cdc.osmh-indexer.cmm/)
for the branch or branches you want to updated.

Check language indexes have been created - look at the [storage bucket](https://console.cloud.google.com/storage/browser/cessda-pasc-es-live/indices/?project=cessda-development) for a given branch.

Make sure the harvesters (dev, staging, live) are not run in parallel against the endpoints, as some of them will time out under the load, and not deliver all the available metadata.
Set the harvesting times via the [application.yml](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/master/src/main/resources/application.yml) file for each branch.

Adjust the read timeout, as required, via the [application.yml](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/master/src/main/resources/application.yml) file for each branch.
Update the cessda.cdc.osmh-indexer.cmm README files for each branch after making changes.

### To add endpoint/update URL of existing endpoint, edit the following files (for each branch):

cessda.cdc.osmh-indexer.cmm [harvester configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/main/src/main/resources/application.yml),

cessda.cdc.osmh-indexer.cmm [harvester tests](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/main/src/test/java/eu/cessda/cdc/oci/repository/cdcHarvesterDaoTest.java).

Depending on the repository type, you also need to edit EITHER:

cessda.cdc.osmh-repository-handler.oai-pmh [oai-pmh repository handler configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh/src/development/src/main/resources/application.yml),

and cessda.cdc.osmh-repository-handler.oai-pmh [oai-pmh repository handler tests](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh/src/development/src/test/java/eu/cessda/cdc/osmhhandler/oaipmh/configuration/HandlerConfigurationPropertiesTest.java).

OR:

cessda.cdc.osmh-repository-handler.nesstar [NESSTAR repository handler configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar/src/development/src/main/resources/application.yml),

and cessda.cdc.osmh-repository-handler.nesstar [NESSTAR repository handler tests](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar/src/development/src/test/java/eu/cessda/cdc/osmhhandler/nesstar/configuration/HandlerConfigurationPropertiesTest.java).

### To add language, create a new file (for each branch) in:

cessda.cdc.osmh-indexer.cmm [Harvester mappings directory](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/main/src/main/resources/elasticsearch/mappings/),

cessda.cdc.osmh-indexer.cmm [Harvester settings directory](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/main/src/main/resources/elasticsearch/settings/),

cessda.cdc.searchkit [Searchkit locales directory](https://bitbucket.org/cessda/cessda.cdc.searchkit/src/master/src/locales/)

and edit following files so lists of languages match:

cdc.osmh-indexer.cmm [application.yaml](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/main/src/main/resources/application.yaml).

cdc.osmh-indexer.cmm [LanguageDocumentExtractorTest.java](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/main/src/test/java/eu/cessda/cdc/oci/service/helpers/LanguageDocumentExtractorTest.java).

cessda.cdc.searchkit [Searchkit language.js](https://bitbucket.org/cessda/cessda.cdc.searchkit/src/dev/src/utilities/language.js)

## Springboot Admin

If you cannot see a component in the [Springboot Admin GUI (Development)](https://datacatalogue-dev.cessda.eu/admin/#/), [Springboot Admin GUI (Staging)](https://datacatalogue-staging.cessda.eu/admin/#/) or [Springboot Admin GUI (Production)](https://datacatalogue.cessda.eu/admin/#/), redeploy the missing component (`cessda.cdc.osmh-indexer.cmm, cessda.cdc.osmh-repository-handler.nesstar` or `cessda.cdc.osmh-repository-handler.oai-pmh`) via Jenkins, so it can register with Springboot Admin.

## Prerequisites

You need to set the values of various environment variables

[TODO] list them.

## Installing

The Jenkinsfile defines the build, test and deployment pipeline. See also **'QA and Deployment'** section, above.

## Running the tests

See **'QA and Deployment'** section, above.
