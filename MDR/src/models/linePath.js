var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linePath = new Schema({
    code : {
        type: String,
        unique: true
    },
    path : String
    ,
    orientation : String,
    line: String
});

module.exports = mongoose.model('LinePath',linePath);