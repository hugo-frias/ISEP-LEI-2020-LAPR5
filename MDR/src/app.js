var express    = require('express'); // call express
var config = require('./config'); // call index.js from config folder
var {loader} = require('./loaders'); //call function loader(app) from loaders folder

function startServer() {

    // creates an express app
    const app = express();

    // configure the app created
    loader(app);
  
    // starts the server
    app.listen(config.port, () => {
        console.log(`Magic happens on port ${config.port}`);
    }).on('error', err => {
      //Logger.error(err);
      process.exit(1);
    });
  
  }
  
  startServer();