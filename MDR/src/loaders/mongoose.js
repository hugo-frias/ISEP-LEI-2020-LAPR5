const mongoose = require('mongoose'); //calls mongoose
const config = require('../config'); //calls index.js from config folder

function connectDataBase() {
  mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("Server is working!");
  });
  mongoose.Promise = global.Promise;  
}

// exports the function connectDataBase()
module.exports.connectDataBase = connectDataBase;