"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const styleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

styleSchema.methods.serialize = function () {
    return {
        style: this.name
    };
};

const Style = mongoose.model('style', styleSchema);

module.exports = {
    Style
};