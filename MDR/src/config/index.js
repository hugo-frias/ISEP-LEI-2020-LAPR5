var dotenv = require ('dotenv'); //calls .env file

const envFound = dotenv.config(); //Loads .env file content into | process.env
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {

    // The port to be used
    port: parseInt(process.env.PORT, 10),
  
    // The database URL to be used
    databaseURL: process.env.MONGODB_URI,

    MDVURL: process.env.MDV_URL,

    //API configs
    api: {
       prefix: '/api',
    }
}

