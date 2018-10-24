const express = require("express");
const bodyParser = require("body-parser");

const { Beer } = require("./models");
const { Review } = require("../reviews/models");
const { Category } = require('../categories/models');
const { Style } = require('../styles/models');
const { User } = require('../users/models');

const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

router.use(bodyParser.json());

router.get('/', (req, res) => {

    Beer
        .find()
        .then(beers => {
            console.log(beers);
            return res.status(200).json({
                beers: beers
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['name', 'breweryName', 'style', 'category', 'reviews'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });
    Beer
        .create({
            name: req.body.name,
            breweryName: req.body.breweryName,
            category: req.body.category,
            style: req.body.style,
            reviews: req.body.reviews
        })
        .then(beer => res.status(201).json({
            _id: beer._id,
            name: beer.name,
            breweryName: beer.breweryName,
            category: beer.category,
            style: beer.style,
            reviews: beer.reviews_id
        }))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});

router.use('*', function (req, res) {
    res.status(404).json({message: 'Not Found'});
});

module.exports = { router };