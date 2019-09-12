# Architecture in detail

[Home](../Home.md)

**Note that this document is out of date and does not reflect the current CESSDA GCP Architecture**

All CDC components are running on a dedicated Kubernetes cluster hosted on Google Cloud Platform

## Locations and specs

---

### Development

Name                                                       | CLUSTER-IP    | EXTERNAL-IP   | PORT(S)           | CPU | MEM | Nodes
---------------------------                                | ------------- | ------------- | ----------------- | --- | --- | ---
[SpringBoot Manager](https://pasc-dev.cessda.eu/admin/)    | 10.59.246.145 |  none         | 8088:31860/TCP    |     |     |
[ElasticSearch](http://35.195.82.45:9200/)                 | 35.195.82.45  |  none         | 9200/TCP,9300/TCP |     |     |
[ElasticSearch Kibana](http://104.199.36.17:5601/)         | 104.199.36.17 |  none         | 9200/TCP,9300/TCP |     |     |
[Searchkit](https://pasc-dev.cessda.eu)                    | 10.59.248.185 |  none         | 8088/TCP          |     |     |  

### Staging

Name                                                       | CLUSTER-IP    | EXTERNAL-IP   | PORT(S)           | CPU | MEM | NODES
---------------------------                                | ------------- | ------------- | ----------------- | --- | --- | ---
[SpringBoot Manager](https://pasc-staging.cessda.eu/admin) |               |               | 8088:31860/TCP    |     |     |  
[ElasticSearch](http://35.190.217.39:9200)                 |               |               | 9200/TCP,9300/TCP |     |     |  
[Searchkit](https://pasc-staging.cessda.eu)                |               |               | 8088/TCP          |     |     |  

### Production
