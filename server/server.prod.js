const cors = require('cors');
const compression = require('compression');
const methodOverride = require('method-override');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helper = require('./helper');

module.exports = {
  start: function () {
    helper.checkBuildDirectory();
    helper.checkEnvironmentVariables(true);

    let app = express();

    app.use(cors());
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use('/_search', helper.getSearchkitRouter());
    app.use('/static', express.static(path.join(__dirname, '../dist')));

    app.get('*', function (req, res) {
      res.setHeader('Access-Control-Allow-Headers',
        'authorization,content-type,x-api-applicationid', 'Access-Control-Allow-Origin');

      res.sendFile(path.join(path.join(__dirname, '../dist'), 'index.html'));
    });

    helper.startListening(app);
  }
};
