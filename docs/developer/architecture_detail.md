[Home](../Home.md)


# Architecture in detail

---

![Architecture overview showing current component dependencies][current_architecture_diagram]

[current_architecture_diagram]: ../images/Phase%202%20Search%20Components%20Diagram%20-%20Architecture-V0-CURRENT.png "Architecture current phase"

## Notes on Components 


### Searchkit

Changes are in progress and will be done in a separate branch

- Changes needs to be made to reflect the new data model structure and fields
  - Full Text Search Query
  - Filter Queries needs
  - Work around logic that checks if data is in a "cc" language field etc needs to be removed
  -   

### Elasticsearch

There is a new Elasticsearch cluster deployed for use by CDC v2 apps.
See the [Elasticsearch Repo](https://bitbucket.org/cessda/cessda.pasc.searchkit)


Once a cluster is provisioned the CDC v2 OSMH Consumer Indexer (OCI) can handle full management of its indices.

- Auto index creation, if one does not exist.
- Index Settings
- Index Mappings 
- Data ingestion
    - Full data harvest and 
    
---

---    
    
# Process Notes

## Runs

1. **Initial full run** - Runs upon application start with a delay of 60secs.  Does a full harvest and 
ingestion of all records for all configured Repos.

1. **Incremental run** - Runs daily (at 02:30?).  Does an incremental harvest and ingestion of records 
for all configured Repos, based on the most recent ingested lastModified date.

1. **Weekly full run** - Runs weekly (Sundays at 14:30? enough time for the daily incremental run to
 have finished).  Does a full harvest and ingestion of records for all configured Repos.
   
    - I felt like adding this third type of run as I have not been able to see a successful harvest and 
    ingestion of all repos without one of them being irresponsive and delaying the run.  This weekly 
    full run should help protect us from being out of sync due to behaviours not yet detected as we 
    have not had the applications running long enough in dev/staging yet.


## Currently a full run takes about 1hr for:

1. GESIS 
1. GESIS EN
1. UKDS
1. FSD (EN and FI) - FSD takes about 31min of this time.

As you have noted it only takes the addition of one very slow Service Provider to double Harvest and 
Ingest times.  So caution should be taken when adding new repos with cron timers adjusted accordingly.


# Incremental run notes:

Whilst testing the new Incremental feature, I have noticed that every day that I attempt a harvest majority of the record's timestamps (lastModified dates) are updated to that given day's date.  Therefore, expect in some cases that the incremental harvest will be ingesting just as much content into elasticsearch as it would in a full harvest and ingest run.  


One such case is GESIS where pretty much all records are updated to today's date leading to the incremental harvest ingesting all records without the advantage of only harvesting and ingesting the Delta since the last harvest and ingest run. 




# Special note on dates:

In order to be able to ingest all FSD Records, Dates format have been relaxed.


**Example exceptions**

```
2018-12-03 19:14:28.236 INFO (lambda$executeBulk$0) (ESIndexerService.java:79) - Id [Finish-Data-Services__oai:fsd.uta.fi:FSD2203], message [MapperParsingException[failed to parse [dataCollectionPeriodStartdate]]; nested: IllegalArgumentException[Cannot parse "1998-07-00": Value 0 for dayOfMonth must be in the range [1,31]];]
2018-12-03 19:14:28.236 INFO (lambda$executeBulk$0) (ESIndexerService.java:79) - Id [Finish-Data-Services__oai:fsd.uta.fi:FSD2325], message [MapperParsingException[failed to parse [dataCollectionPeriodStartdate]]; nested: IllegalArgumentException[Cannot parse "2005-04-00": Value 0 for dayOfMonth must be in the range [1,30]];] 
2018-12-03 19:14:28.237 INFO (lambda$executeBulk$0) (ESIndexerService.java:79) - Id [Finish-Data-Services__oai:fsd.uta.fi:FSD2206], message [MapperParsingException[failed to parse [dataCollectionPeriodStartdate]]; nested: IllegalArgumentException[Cannot parse "2001-00-00": Value 0 for monthOfYear must be in the range [1,12]];] 
2018-12-03 19:14:28.237 INFO (lambda$executeBulk$0) (ESIndexerService.java:79) - Id [Finish-Data-Services__oai:fsd.uta.fi:FSD1239], message [MapperParsingException[failed to parse [dataCollectionPeriodStartdate]]; nested: IllegalArgumentException[Cannot parse "2001-09-00": Value 0 for dayOfMonth must be in the range [1,30]];]
```


Also note that Tony from FSD has now gone ahead to remove the "00" after this fix.  

- A previous date of `2005-04-00` is now `2005-04`
- The current implementation also support this fix by Toni.   
 