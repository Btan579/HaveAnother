"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { Style } = require('../styles/models');
const { User } = require('../users/models');
const { Beer } = require('../beers/models');
const { Review } = require('../reviews/models');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Category = mongoose.model('categorys', categorySchema);

module.exports = { Category };