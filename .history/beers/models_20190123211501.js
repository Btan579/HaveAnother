"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const beerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brewery: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    style: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Style'
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }
});

beerSchema.methods.serialize = function () {
    return {
        id: this._id,
        name: this.name,
        brewery: this.brewery,
        category: this.category,
        style: this.style,
        reviews: this.reviews
    };
};

const Beer = mongoose.model('beer', beerSchema);

module.exports = {
    Beer
};