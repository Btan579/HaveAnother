const express = require("express");
const bodyParser = require("body-parser");

const {
    Beer
} = require("./models");
const {
    Review
} = require("../reviews/models");

const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

router.use(bodyParser.json());

router.get('/', (req, res) => {
    Beer
        .find()
        .then(beers => {
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

router.get("/:id", (req, res) => {
    let beer = {};
    Beer
        .findById(req.params.id)
        .populate('Category')
        .then(_beer => {
            beer = _beer;
            return _beer.reviews;
        })
        .then(_reviews => {
            Review
                .find({
                    '_id': {
                        $in: beer.reviews
                    }
                })
                .then(_rvs => {
                    res.status(201).json({
                        beer: beer.serialize(),
                        reviews: _rvs.map(review => review.serialize())
                    })
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['name', 'brewery', 'style', 'category', 'reviews'];
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
            brewery: req.body.brewery,
            category: req.body.category,
            style: req.body.style,
            reviews: req.body.reviews
        })
        .then(beer => res.status(201).json({
            _id: beer._id,
            name: beer.name,
            brewery: beer.brewery,
            category: beer.category,
            style: beer.style,
            reviews: beer.reviews
        }))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});

const beersRouter = router;
module.exports = {
    beersRouter
};