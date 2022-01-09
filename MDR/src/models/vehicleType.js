var mongoose = require('mongoose');
const Joi = require('joi');
var Schema = mongoose.Schema;


var vehicleType = new Schema({
    code:{
        type:String, unique:true,
    },
    name: {
        type: String,
    },
    autonomy: {
        type: Number
    },
    cost: {
        type: Number
    },
    avgSpeed: {
        type: Number
    },
    energy: {
        type: String
    },
    consumption: {
        type: Number
    },
    emission: {
        type: Number
    }
});

module.exports = mongoose.model('Vehicle Type', vehicleType);