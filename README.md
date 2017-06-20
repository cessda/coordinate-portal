# gesis datasearch / da|ra SearchNet Frontend 
### Meant to be an update regarding dependencies and responsiveness of the service

based on Searchkit ES6 Boilerplate

## Elasticsearch server hints
[https://git.gesis.org/dsn/dara/wikis/ElasticSearchSetup]

##
Config.js holds the elasticsearch URLs for different environments and are automatically injected with DefinePlugin depending on the webpack.config (local/dev/prod) being used.  
  
You also have to adjust the elasticsearch Client in the server specific js file 
@ searchkitRouter = SearchkitExpress.createRouter({ ... })

Adjust URLs accordingly and start with either 
* npm run startdev
* npm run startprod 
* npm run startlocal

## Query Syntax

1. The facets have a binary effect: records not matching any of the selected filters are not included in the set.
1. It's different with the Search Box. Here, terms are combined [https://www.elastic.co/guide/en/elasticsearch/guide/2.x/bool-query.html] into an elasticsearch 'should' clause.  
1. General syntax: 

```
The simple_query_string supports the following special characters:
+ signifies AND operation
| signifies OR operation
- negates a single token
" wraps a number of tokens to signify a phrase for searching
* at the end of a term signifies a prefix query
( and ) signify precedence
~N after a word signifies edit distance (fuzziness)
~N after a phrase signifies slop amount
In order to search for any of these special characters, they will need to be escaped with \.
```


* [Feldname]:[Feldwert] 
 * http://10.6.13.128:3000/search?q=setUrl%3A%22http%3A%2F%2Fwww.da-ra.de%2Foaip%2Foai%22
 * http://10.6.13.128:3000/search?q=type.nn%3A%22Dataset%22
 * http://localhost:3000/search?q=%2Btype.nn%3A%22Dataset%22%20%2BsetUrl%3A%22http%3A%2F%2Fwww.da-ra.de%2Foaip%2Foai%22%20%2BsetSpec%3A39&setSpec[0]=39
 * Feldnamen im DC index: http://10.6.13.128:9200/dc/_mapping
* technical documentation: http://docs.searchkit.co/stable/docs/components/basics/search-box.html



## Configuration of elasticsearch server

In the code, the urls are being set automatically depending on your specification in config.js and changes to the specific server configuration file. Furthermore, you got to specify the port the elasticsearch client is running on and and add it accordingly.

### windows
`set PORT=8088` 
 to unset : 
`set PORT=`

check with `echo %PORT%`


### linux
`export PORT=8088`
 or in /etc/bash.bash.rc / ~/.bashrc : 
`export PORT=8088`

check with `echo $PORT`
 
## Install node.js on ubuntu

```
sudo apt-get remove nodejs
```
Install nodeJS v5.3.0:
```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```