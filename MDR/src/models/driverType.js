var mongoose = require('mongoose');
const Joi = require('joi');
var Schema = mongoose.Schema;

var driverType = new Schema({
    code : {
        type: String,
        unique: true
    },
    description: {
        type: String   
    }
});

module.exports = mongoose.model('Driver Type', driverType);