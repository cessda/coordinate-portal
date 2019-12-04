# cessda.cdc.version2 Operations Documentation

[Home](../Home.md)


Reharvesting outside of scheduled harvesting periods
- run the Jenkins job [cessda.cdc.deploy](https://jenkins.cessda.eu/view/CDC/job/cessda.cdc.deploy/job/master/build?delay=0sec) with module set to osmh-indexer and cluster set to development-cluster or staging-cluster, depending on which instance needs to be updated.

Check language indexes have been created
- look at the [storage bucket](https://console.cloud.google.com/storage/browser/cessda-pasc-es-live/indices/?project=cessda-development).
