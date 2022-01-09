var { Router } = require('express');
var router = Router();
var bodyParser = require('body-parser');
var modelsLoader = require('../api');
var cors = require('cors');

function configureApp(app) {

  app.use(cors());
  app.enable('trust proxy');

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // all of our routes will be prefixed with /api
  app.use('/api', modelsLoader());

}

// exports the function configureApp(app)
module.exports.configureApp = configureApp;