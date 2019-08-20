# Deployment Process

## All environments

This document purpose is to explain how to deploy a fully functional DC solution.
You should deploy all the components in the correct order, Admin, MailRelay and ElasticSearch components are blocking deployment for other components if not present.

### Requirements

- Access to Bitbucket, Google Cloud Platform and CIT platform

### Components to deploy

1. cessda.pasc.admin - Spring Admin component
2. cessda.mgmt.mailrelay - Mail relay used by Harvester/Indexer
3. cessda.pasc.es - ElasticSearch Cluster
4. cessda.pasc.osmh.repository-handler.oai-pmh (OAI-PMH Harvester)
5. cessda.pasc.osmh.repository-handler.nesstar (NESSTAR Harvester)
6. cessda.pasc.osmh-indexer.cmm (DC Indexer - CMM)
7. cessda.pasc.searchkit (DC Frontend)
8. cessda.pasc.reverse (Reverse Proxy for all DC components)

### Procedure (Same for all components, we will use the dev environment for our procedure)

1. Connect to CIT platform - [CESSDA CIT Platform](https://cit.cessda.eu)
1. Select Component pipeline - For our example, we will use cessda.pasc.admin
1. Select the dev branch

![Screen Shot 2018-06-19 at 10.32.11.png](https://bitbucket.org/repo/oLgpneG/images/906901221-Screen%20Shot%202018-06-19%20at%2010.32.11.png)

1. Click on "Build Now"

![Screen Shot 2018-06-19 at 10.33.05.png](https://bitbucket.org/repo/oLgpneG/images/337565825-Screen%20Shot%202018-06-19%20at%2010.33.05.png)

1. Wait few minute, and check that the deploy is successful. You can also check that the commit list is correct.

![Screen Shot 2018-06-19 at 10.34.54.png](https://bitbucket.org/repo/oLgpneG/images/3652916872-Screen%20Shot%202018-06-19%20at%2010.34.54.png)