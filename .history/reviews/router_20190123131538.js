const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {
    Review
} = require("./models");
const {
    Category
} = require('../categories/models');
const {
    User
} = require('../users/models');
const {
    Beer
} = require('../beers/models');
const {
    Style
} = require('../styles/models');

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const router = express.Router();

router.use(bodyParser.json());

const jwtAuth = passport.authenticate('jwt', {
    session: false
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

// router.get("/", (req, res) => {
//     Review
//         .find()
//         .then(reviews => {
//             res.json({
//                 reviews: reviews.map(
//                     (review) => {
//                         return review.serialize();
//                     })
//             });
//         })
//         .catch(err => {
//             if (err) return console.error(err);
//         });
// });

router.get("/:reviewIdsCsv", (req, res) => {
    let arrReviewIds = req.params.reviewIdsCsv.split(",");
    let revs;
    let savedBeer;
    let savedUsers;
    let savedStyle;
    let savedCategory;

    Review
        .find({
            '_id': {
                $in: arrReviewIds
            }
        })
        .then(reviews => {

            revs = reviews;
            return reviews[0].beer;
        })
        .then(beerId => {

            return Beer.findById(beerId)
                .exec()
                .then((beer) => {
                    savedBeer = beer;
                    return revs.map(rev => {
                        return rev.user;
                    });
                });

        })
        .then(uIds => {
            User
                .find({
                    '_id': {
                        $in: uIds
                    }
                })
                .then(users => {
                    savedUsers = users;
                    return users;
                });

        })
        .then((dataUsrs) => {

            return Style
                .findById(savedBeer.style)
                .then(style => {
                    return style;
                });
        })
        .then(dataStyle => {
            savedStyle = dataStyle;

            return Category
                .findById(savedBeer.category)
                .then(category => {
                    return category;
                });
        })
        .then(dataCategory => {
            savedCategory = dataCategory;

            res.json({
                beer: Object.assign({}, savedBeer.serialize(), savedStyle.serialize(), savedCategory.serialize()),

                reviews: revs.map((review) => {
                    for (var i = 0; i < savedUsers.length; i++) {

                        if (review.user.toString() == savedUsers[i]._id.toString()) {
                            // console.log(review.serialize());
                            let dbReview = review.serialize();
                            dbReview.user = savedUsers[i].serialize().id;
                            dbReview.userName = savedUsers[i].serialize().userName;

                            return dbReview;
                        }
                    }
                })
            });
        })
        .catch(err => {
            if (err) return console.error(err);
        });
});


// let getUser = async (userId) => {
//     let _user;
//     return await User
//         .findById(userId)
//         .then(user => {
//             // console.log(user.userName);
//             _user =  user.userName;
//             return _user;
//         })
//         .catch(err => {
//             if (err) return console.error(err);
//         });
// }

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
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});



router.post('/', jwtAuth, (req, res) => {
    console.log('posting review');
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
                    req.body.beer_id, {
                        $push: {
                            reviews: reviewResult._id
                        }
                    },
                    (err, doc) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                )
                .exec((err, beer) => {
                    if (err) {
                        console.log(err);
                    }
                    return res.status(201).json({
                        beer: beer.serialize()
                    });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});

router.put('/:id', jwtAuth, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    const updated = {};
    const updateableFields = ['beer', 'comment', 'haveAnother'];
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
        .catch(err => res.status(500).json({
            message: err
        }));
});

router.delete('/:id', jwtAuth, (req, res) => {
    Review
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted review with id \`${req.params.id}\``);
            res.status(204).end();
        });
});

router.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

const reviewsRouter = router;
module.exports = {
    reviewsRouter
};
