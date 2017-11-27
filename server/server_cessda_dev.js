var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var SearchkitExpress = require('searchkit-express');

module.exports = {
  start: function () {
    if (process.env.PASC_ELASTICSEARCH_URL === undefined) {
      console.error('ERROR : Unable to start PaSC application.');
      console.error('        Missing environmental variable PASC_ELASTICSEARCH_URL.');
      console.log();
      process.exit();
      return;
    } else {
      console.log('NOTICE : Using Elasticsearch instance at ' +
                  process.env.PASC_ELASTICSEARCH_URL + '.');
    }

    if (process.env.PASC_ANALYTICS_ID === undefined) {
      console.log('NOTICE : Missing environmental variable PASC_ANALYTICS_ID.');
      console.log('         Google Analytics tracking will be disabled.');
    } else {
      console.log('NOTICE : Google Analytics tracking enabled for ' +
                  process.env.PASC_ANALYTICS_ID + '.');
    }

    var cors = require('cors');
    var express = require('express');
    var app = express();
    app.use(cors());
    app.use(compression());
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    var port = Number(process.env.PASC_PORT || 8088);
    var webpack = require('webpack');
    var webpackMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var config = require('../webpack.cessda_dev.config.js');
    var compiler = webpack(config);
    app.use(webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));

    app.use(webpackHotMiddleware(compiler));

    var searchkitRouter = SearchkitExpress.createRouter({
      host: process.env.PASC_ELASTICSEARCH_URL,
      index: 'dc',
      maxSockets: 500,
      queryProcessor: function (query) {
        return query;
      }
    });

    app.use('/_search', searchkitRouter);
    app.use('/static', express.static(__dirname + '/dist'));

    app.get('*', function (req, res) {
      res.setHeader('Connection', 'close');
      res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
      res.setHeader('Access-Control-Allow-Headers',
        'authorization,content-type,x-api-applicationid,access-control-allow-origin');
      res.render('index');

    });

    app.listen(port, function () {
      console.log();
      console.log('SUCCESS : PaSC application is running at http://localhost:' + port + '.');
      console.log();
    });
  }
};
