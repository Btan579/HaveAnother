"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const {
    Style
} = require('../styles/models');
const {
    Category
} = require('../categories/models');
const {
    User
} = require('../users/models');
const {
    Beer
} = require('../beers/models');

const reviewSchema = mongoose.Schema({
    beer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beer'
    },
    haveAnother: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        userName: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

reviewSchema.methods.serialize = function () {
    return {
        id: this._id,
        beer: this.beer,
        comment: this.comment,
        haveAnother: this.haveAnother,
        user: this.user
    };
};

const Review = mongoose.model('review', reviewSchema);

module.exports = {
    Review
};
