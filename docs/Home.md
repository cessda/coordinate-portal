# CESSDA Data Catalogue v2.1.0

The CESSDA Data Catalogue (CDC) harvests metadata from various endpoints.
It uses different repository handlers to adapt the payload for each type of endpoint to a standard format (the Cessda Metadata Model, CMM).

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
- elasticsearch (backend to user interface, provides search and browse functionality).
- kibana (used to analyse the raw content of the harvested data).
- mailrelay (used for sending messages relating to the health and status of the product to the DevOps team).
- cessda.mgmt.reverse (reverse proxy used as part of the Certbot automated security certificate renewal process. Also provides authentication for components, as needed).


### QA and Deployment


The following source code repositories are used to test and deploy the product's components:

- cessda.cdc.deploy (contains all the scripts and infrastructure definitions needed to deploy the product).
- cessda.cdc.test (contains test scripts used to QA the product during the deployment process).
- cessda.cdc.profile (contains and XSD file that can be used to check that the XML provided by an endpoint is compliant with the CMM profile).



## Advanced Search

See [Advanced Search](ADVANCEDSEARCH.md) for details.


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

cessda.cdc.osmh-indexer.cmm [harvester configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/main/resources/application.yml),

cessda.cdc.osmh-indexer.cmm [harvester tests](https://bitbucket.org/cessda/cessda.cdc.osmh-indexer.cmm/src/develop/src/test/java/eu/cessda/cdc/oci/repository/cdcHarvesterDaoTest.java).

Depending on the repository type, you also need to edit EITHER:

cessda.cdc.osmh-repository-handler.oai-pmh [oai-pmh repository handler configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh/src/development/src/main/resources/application.yml),

and cessda.cdc.osmh-repository-handler.oai-pmh [oai-pmh repository handler tests](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.oai-pmh/src/development/src/test/java/eu/cessda/cdc/osmhhandler/oaipmh/configuration/HandlerConfigurationPropertiesTest.java).

OR:

cessda.cdc.osmh-repository-handler.nesstar [NESSTAR repository handler configuration](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar/src/development/src/main/resources/application.yml),

and cessda.cdc.osmh-repository-handler.nesstar [NESSTAR repository handler tests](https://bitbucket.org/cessda/cessda.cdc.osmh-repository-handler.nesstar/src/development/src/test/java/eu/cessda/cdc/osmhhandler/nesstar/configuration/HandlerConfigurationPropertiesTest.java).


### To add language, create a new file (for each branch) in:

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

## Prerequisites

You need to set the values of various environment variables

[TODO] list them.


## Installing

The Jenkinsfile defines the build, test and deployment pipeline. See also **'QA and Deployment'** section, above.


## Running the tests

See **'QA and Deployment'** section, above.


## Deployment

The Jenkinsfile defines the deployment process. See also **'QA and Deployment'** section, above.



## Built With

The Jenkinsfile defines the build process. See also **'QA and Deployment'** section, above.


## Contributing

Please read [CESSDA Guideline for developers](https://bitbucket.org/cessda/cessda.guidelines.cit/wiki/Developers) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

See [Semantic Versioning](https://semver.org/) for guidance.

## Contributors

You can find the list of contributors in the `CONTRIBUTORS.md` file for each component repository.

## License

See the [LICENSE](LICENSE) file.

## FAQs

See the [FAQ](FAQ.md) file.

## Acknowledgments

None at present.
