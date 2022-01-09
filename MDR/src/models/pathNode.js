var mongoose = require('mongoose');

const pathNode= new mongoose.Schema({
    code : {
        type: String,
        unique: true
    },
    duration: Number,
    distance: Number,
    node : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Path Node', pathNode);