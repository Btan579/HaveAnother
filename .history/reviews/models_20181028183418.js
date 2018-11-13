"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { Style } = require('../styles/models');
const { Category } = require('../categories/models');
const { User } = require('../users/models');
const { Beer } = require('../beers/models');

const reviewSchema = mongoose.Schema({
    // beer: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Beer'
    // },
    haveAnother: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

// reviewSchema.pre('find', function (next) {
//     this.populate('beer');
//     next();
// });

// reviewSchema.pre('findOne', function (next) {
//     this.populate('beer');
//     next();
// });

// reviewSchema.virtual('author').get(function() {
//  return `${this.user.userName}`;
// });

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

module.exports = { Review };
