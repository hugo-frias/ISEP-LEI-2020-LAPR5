var {connectDataBase} = require('./mongoose'); //calls connectDataBase() function from mongoose.js
var {configureApp} = require('./express'); //calls configureApp(app) function from express.js


function loader(app) {

   // The connection to the database is made
   connectDataBase();

   // Configure the app
   configureApp(app);
   console.log('App configured!');

   //modelsLoader(router);

};

// exports the function loader(app)
module.exports.loader = loader;