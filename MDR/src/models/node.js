const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
    },

    ShortName: {
        type: String,
        required: true,
        unique: true
    },

    Latitude: {
        type: Number,
        required: true
    },

    Longitude: {
        type: Number,
        required : true
    },

    IsDepot : {
        type: Boolean,
        required: true
    },

    IsReliefPoint: {
        type: Boolean
    },

    Model: {
        type: String
    }
});

module.exports = mongoose.model('Node', nodeSchema);