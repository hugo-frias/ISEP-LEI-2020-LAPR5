var mongoose = require('mongoose');
const Joi = require('joi');
var Schema = mongoose.Schema;

var path = new Schema({
    code: {
        type: String,
        unique: true
    },
    isEmpty: {
        type: Boolean,
        required: true
    },
    pathNodes: [String]
});

module.exports = mongoose.model('Path', path);

