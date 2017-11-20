// @flow

/**
 * Created by terhorsn on 15.02.2017.
 * Use to define environment specific urls for elasticSearch
 * Imported and used in webpack.config @ DefinePlugin
 */
const Globals = {
  'esURL':'http://193.175.238.59:8084',
  'prod': 'http://193.175.238.35:8089',
  'local': 'http://localhost:9200',
  'prodDomain': 'http://datasearch.gesis.org',
  'cessda': 'http://CESSDAES:9200',
  'initialLanguage': 'en',
  'googleAnalyticsId': 'UA-109854552-1'
};

module.exports = Globals;
