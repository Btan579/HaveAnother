"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { Style } = require('../styles/models');
const { Category } = require('../categories/models');
const { User } = require('../users/models');
const { Review } = require('../reviews/models');

const beerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breweryName: {
        type: String,
        required: true
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    style: {type: mongoose.Schema.Types.ObjectId, ref: 'Style'
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

beerSchema.pre('find', function (next) {
    this.populate('review');
    next();
});

beerSchema.pre('findOne', function (next) {
    this.populate('review');
    next();
});

beerSchema.methods.serialize = function () {
    return {
        _id: this._id,
        name: this.name,
        breweryName: this.breweryName,
        category: this.category,
        style: this.style,
        reviews: this.reviews
    };
};

const Beer = mongoose.model('beers', beerSchema);

module.exports = { Beer };