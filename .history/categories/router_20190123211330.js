const express = require("express");
const bodyParser = require("body-parser");

const {
    Category
} = require("./models");

const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
    Category
        .find()
        .then(categorys => {

            res.json({
                categorys: categorys
            });
        }).
    catch(err => {
        if (err) return console.error(err);
    });
});

router.get("/:id", (req, res) => {
    Style
        .findById(req.params.id)
        .then(category => {
            res.json({
                _id: category._id,
                name: category.name
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
    const requiredFields = ["name"];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    Category
        .findOne({
            name: req.body.name
        })
        .then(category => {
            if (category) {
                const message = `Category already exists`;
                console.error(message);
                return res.status(400).send(message);
            } else {
                Category
                    .create({
                        name: req.body.name
                    })
                    .then(category => res.status(201).json({
                        _id: category._id,
                        name: category.name
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

const categoriesRouter = router;
module.exports = {
    categoriesRouter
};