"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

categorySchema.methods.serialize = function () {
    return {
        category: this.name
    };
};

const Category = mongoose.model('category', categorySchema);

module.exports = {
    Category
};