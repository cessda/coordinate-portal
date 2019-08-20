# How to's  ???

## Re - Harvesting and Ingesting

### Full run
Auto Starts after delay of 1min at startup
**JMX name**: `fullHarvestAndIngestionAllConfiguredSPsReposRecords`

### Incremental run

Runs daily at 02:30am.
**JMX name**: `dailyIncrementalHarvestAndIngestionAllConfiguredSPsReposRecords`

### Change Incremental run schedule

In the indexer.cmm repo, edit the consumerSchedule class [Here](https://bitbucket.org/cessda/cessda.pasc.osmh-indexer.cmm/src/master/src/main/java/eu/cessda/pasc/oci/ConsumerScheduler.java) and change the cron job schedule.  

** Scheduled(cron = "0 30 02 * * *") **

### Weekly run

Runs every sun at 11:30
**JMX name**: `weeklyFullHarvestAndIngestionAllConfiguredSPsReposRecords`


## Add new Language support

Current support languages are as following, with a dedicated index created for each language.

Language| Index name | Settings file | Mappings file
--------|------------| --------------| ------------
- en | cmmstudy_en  | cmmstudy_settings_en.json | cmmstudy_mappings_en.json  
- fi | cmmstudy_fi  | cmmstudy_settings_fi.json | cmmstudy_mappings_fi.json
- de | cmmstudy_de  | cmmstudy_settings_de.json | cmmstudy_mappings_de.json

To add a new language whose two letter prefix is **"dv"**

1. Add prefix to the supported list in the `application.yml` for osmh-indexer.cmm or via the Spring boot Admin (in memory not persisted) `  
    languages: ['en', 'fi', 'de', 'dv' ]`

1. Add a Index setting file with pattern cmmstudy_settings_**dv**.  If not set index will be created with default elasticsearch settings 

  - You should think about creating a "stopword" section in your ElasticSearch settings (Look at English or German settings file). You can find a list of available "Stopwords" table on ElasticSearch documentation
[ElasticSearch Stopwords](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/analysis-lang-analyzer.html)

1. Add a Mappings file with pattern cmmstudy_mappings_**dv**.  If not set index will be created with default elasticsearch mappings with dynamic field type detections.



## Disabling switches

### Default Application Language

Update this in the Spring boot admin.  Default in OCI/application.yml property is "en".
Note modification in the Spring boot admin is only held in memory and needs to be persisted in the OCI/application.yml