const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

const styleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const beerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breweryName: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    style: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Style'
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reviews'}]
});

const reviewSchema = mongoose.Schema({
    beer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Beer'
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
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

reviewSchema.virtual('author').get(function() {
 return `${this.user.userName}`;
});


reviewSchema.methods.serialize = function () {
    return {
        beer: this.beer,
        comment: this.comment,
        haveAnother: this.haveAnother,
        user: this.author
    };
};

const Style = mongoose.model('styles', styleSchema);
const Category = mongoose.model('categorys', categorySchema);
const Review = mongoose.model('reviews', reviewSchema);
const User = mongoose.model('users', userSchema);
const Beer = mongoose.model('beers', beerSchema);

module.exports = {Review, Style, Category, User, Beer};


// categorySchema.pre('find', function (next) {
//     this.populate('categories');
//     next();
// });

// reviewSchema.pre('find', function (next) {
//     this.populate('beerCategory');
//     next();
// });

// reviewSchema.virtual('beerType').get(function () {
//     return `${this.categorySchema.firstName} ${this.author.lastName}`.trim();
// });