const express = require("express");
const bodyParser = require("body-parser");

const { Review } = require("./models");
const { Category } = require('../categories/models');
const { User } = require('../users/models');
const { Beer } = require('../beers/models');
const { Style } = require('../styles/models');

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const router = express.Router();

router.use(bodyParser.json());

router.get("/", (req, res) => {
    Review
    .find()
    .then(reviews => {
        res.json({
            reviews: reviews.map(
                (review) => {
                return review.serialize();
                })
        });
    })
    .catch(err => {
        if(err)return console.error(err);
    });
});

router.get("/", (req, res) => {
    Review
        .find()
        .then(reviews => {
            res.json({
                reviews: reviews.map(
                    (review) => {
                        return review.serialize();
                    })
            });
        })
        .catch(err => {
            if (err) return console.error(err);
        });
});

router.get("/:reviewIdsCsv", (req, res) => {
    let arrReviewIds = req.params.reviewIdsCsv.split(",");
    Review
        .find({'_id':{$in: arrReviewIds}})
        .then(reviews => {
            let beerId = reviews[0].beer;
            Beer.find({'_id': beerId}, function (err, beer) {
                console.log(err);
            })
            .then(beer => {
                res.json({
                    beer: beer.serialize(),
                    reviews: reviews.map(
                        (review) => {
                            return review.serialize();
                        })
                });
            });
        })
        .catch(err => {
            if (err) return console.error(err);
        });
});

router.get("/:id", (req, res) => {
    Review
        .findById(req.params.id)
        .then(review => {
            res.json({
                _id: review._id,
                beer: review.beer,
                comment: review.comment,
                haveAnother: review.haveAnother,
                user: review.user
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went horribly awry'});
    });
});


router.post('/', (req, res) => {
    const requiredFields = ['beer_id', 'comment', 'haveAnother', 'user_id'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    const newReview = new Review({
        beer: req.body.beer_id,
        haveAnother: req.body.haveAnother,
        comment: req.body.comment,
        user: req.body.user_id
    });

    newReview
    .save()
    .then(reviewResult => {
        Beer.findByIdAndUpdate(
            req.body.beer_id,
            {$push: {reviews: reviewResult._id}},
            (err, doc) => {
                if (err) {
                    console.log(err);
                }
            }
        )
        .exec((err, beer) => {
            if(err){
                console.log(err);
            } 
            return res.status(201).json({
            beer: beer.serialize()
           });
        });  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
});

router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({error: 'Request path id and request body id values must match'});
    }
    
    const updated = {};
    const updateableFields = ['beer', 'comment', 'haveAnother' ];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });
    Review
        .findByIdAndUpdate(req.params.id, {
            $set: updated
        }, {
            new: true
        })
        .then(updatedPost => res.status(201).json({
            id: updatedPost.id,
            beer: updatedPost.beer,
            comment: updatedPost.comment,
            haveAnother: updatedPost.haveAnother
        }))
        .catch(err => res.status(500).json({message: err}));
});

router.delete('/:id', (req, res) => {
    Review
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted review with id \`${req.params.id}\``);
            res.status(204).end();
        });
});

router.use('*', function (req, res) {
    res.status(404).json({message: 'Not Found'});
});

const reviewsRouter = router;
module.exports = { reviewsRouter };
