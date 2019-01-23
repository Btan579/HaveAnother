"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const {
    Review
} = require('../reviews/models');
const {
    Category
} = require('../categories/models');
const {
    User
} = require('../users/models');
const {
    Beer
} = require('../beers/models');

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