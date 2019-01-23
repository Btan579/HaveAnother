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
    Review
} = require('../reviews/models');

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
    // reviews: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Review'
    // }]
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }
});

// beerSchema.virtual('styleName').get( function () {
//     // return `${this.user.userName}`;

//     return Style
//         .findOne(this.style)
//         // .exec()
//         .then(style => {
//             // console.log('styleName virtual');
//             console.log(style.serialize());
//             return style.serialize();
//         });
// });

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

// beerSchema.pre('findOne', function (next) {
//     this.populate('Style');
//     next();
// });

// beerSchema.pre('find', function(next){
//     this.populate('Style');
//     next();
// });


const Beer = mongoose.model('beer', beerSchema);

module.exports = {
    Beer
};