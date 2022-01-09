var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var line = new Schema({
    code : {
        type: String,
        unique: true
    },
    name : String
    ,
    color : String
    ,
    linePaths : [String],

    allowedVehicles: [String],

    deniedVehicles: [String],

    allowedDrivers: [String],

    deniedDrivers: [String],
});

module.exports = mongoose.model('Line',line);