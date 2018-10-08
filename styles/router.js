const express = require("express");
const bodyParser = require("body-parser");

const { Style } = require("./models");
const { Beer } = require("../beers/models");
const { Review } = require("../reviews/models");
const { Category } = require('../categories/models');
const { User } = require('../users/models');

const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

const router = express.Router();

router.use(bodyParser.json());



router.get('/', (req, res) => {
    Style
        .find()
        .then(styles => {
            console.log(styles);
            res.json({
                styles: styles
            });
        }).
    catch(err => {
        if (err) return console.error(err);
    });
});

router.get("/:id", (req, res) => {
    Style
        .findById(req.params.id)
        .then(style => {
            res.json({
                _id: style._id,
                name: style.name
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});

router.post('/styles', (req, res) => {
    const requiredFields = ['name'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    Style
        .findOne({
            name: req.body.name
        })
        .then(style => {
            if (style) {
                const message = `Style already exists`;
                console.error(message);
                return res.status(400).send(message);
            } else {
                Style
                    .create({
                        name: req.body.name
                    })
                    .then(style => res.status(201).json({
                        _id: style._id,
                        name: style.name
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            error: 'something went awry'
                        });
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});


router.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});


module.exports = {
    router
};