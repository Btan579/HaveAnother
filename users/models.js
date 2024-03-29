"use strict";
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

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
        userName: this.userName 
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
