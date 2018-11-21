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
    brewery: {
        type: String,
        required: true
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    style: {type: mongoose.Schema.Types.ObjectId, ref: 'Style'
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Review'
    }]
});

// beerSchema.pre('find', function (next) {
//     this.populate('review');
//     next();
// });

// beerSchema.pre('findById', function (next) {
//     this.populate('review');
//     next();
// });

// beerSchema.pre('findOne', function (next) {
//     this.populate('review');
//     next();
// });

// beerSchema.pre('findByIdAndUpdate', function (next) {
//     this.populate('review');
//     next();
// });



beerSchema.methods.serialize = function () {
    let reviews = Review.find({
            '_id': {
                $in: this.reviews
            }
        })
        .then(reviews => {
            return reviews.map(review => {
                return review.serialize();
            });
        }); 

    return {
        id: this._id,
        name: this.name,
        brewery: this.brewery,
        category: this.category,
        style: this.style,
        // reviews: this.reviews
        reviews: reviews
    };
};

const Beer = mongoose.model('beer', beerSchema);

module.exports = { Beer };