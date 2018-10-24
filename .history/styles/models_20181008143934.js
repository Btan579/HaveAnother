"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { Review } = require('../reviews/models');
const { Category } = require('../categories/models');
const { User } = require('../users/models');
const { Beer } = require('../beers/models');

const styleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});


const Style = mongoose.model('styles', styleSchema);


module.exports = { Style };