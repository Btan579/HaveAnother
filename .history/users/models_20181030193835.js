"use strict";

const mongoose = require("mongoose");

const { Style } = require('../styles/models');
const { Category } = require('../categories/models');
const { Review } = require('../reviews/models');
const { Beer } = require('../beers/models');

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

userSchema.methods.serialize = function () {
    return {
        id: this._id,
        userName: this.userName,
        password: this.password 
    };
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
