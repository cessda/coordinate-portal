const cors = require('cors');
const compression = require('compression');
const methodOverride = require('method-override');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../webpack.dev.config.js');
const path = require('path');
const helper = require('./helper');

module.exports = {
  start: function () {
    helper.checkEnvironmentVariables();

    let app = express(),
        compiler = webpack(config);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use(cors());
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

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

    app.use('/_search', helper.getSearchkitRouter());

    app.get('*', function (req, res) {
      res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
      res.setHeader('Access-Control-Allow-Headers',
        'authorization,content-type,x-api-applicationid,access-control-allow-origin');

      res.render('index');
    });

    helper.startListening(app);
  }
};
