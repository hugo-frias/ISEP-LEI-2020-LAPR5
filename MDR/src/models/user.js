var mongoose = require('mongoose');
const Joi = require('joi');
var Schema = mongoose.Schema;

var user = new Schema({
    email : {
        type: String,
        unique: true
    },
    password: {
        type: String   
    },
    userType: {
        type: String   
    }
});

module.exports = mongoose.model('User', user);