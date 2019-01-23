"use strict";
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

// const { Style } = require('../styles/models');
// const { Category } = require('../categories/models');
// const { Review } = require('../reviews/models');
// const { Beer } = require('../beers/models');

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

// userSchema.pre('findOne', function () {
//     this.populate('author');
//         // .exec();
//     next();
// });

userSchema.methods.serialize = function () {
    return {
        id: this._id,
        userName: this.userName
        // password: this.password 
    };
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('user', userSchema);

module.exports = {
    User,
    userSchema
};
