var path = require("path");
var express = require("express");
var bodyParser = require("body-parser")
var methodOverride = require("method-override")
var compression = require("compression")
var _ = require("lodash")
var SearchkitExpress = require("searchkit-express")

module.exports = {
  start: function(prodMode) {
    var cors = require('cors')
    var express = require('express');
    var app = express();
    app.use(cors());
    app.use(compression())
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(methodOverride())

    // Define port to listen on as an environment variable on the server
    var port = Number(process.env.PASC_PORT || 8088);
	  var webpack = require("webpack");
      var webpackMiddleware = require("webpack-dev-middleware");
      var webpackHotMiddleware = require('webpack-hot-middleware');
      var config = require("../webpack.cessda_prod.config.js");
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
    index:'dc',
    maxSockets:500, // defaults to 1000
    queryProcessor:function(query, req, res){
      return query
      }
    })

    app.use("/_search", searchkitRouter)
    app.use("/static", express.static(__dirname + '/dist'));

    app.get('*', function(req, res) {
    	res.setHeader('Connection', 'close');
    	res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
    	res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type,x-api-applicationid', 'Access-Control-Allow-Origin');
        res.render('index');

    });

    app.listen(port, function () {
      console.log('server running at localhost:' + port +', go refresh and see magic');
    });
  }
}
;
