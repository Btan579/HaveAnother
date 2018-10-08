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

// Get all reviews
router.get("/", (req, res) => {
    Review
    .find()
    .then(reviews => {
        console.log(reviews);
        res.json({
            reviews: reviews
        });
    }).
    catch(err => {
        if(err)return console.error(err);
    });
});

//  Get specific review by id
router.get("/:id", (req, res) => {
    Review
        .findById(req.params.id)
        .then(review => {
            res.json({
                id: review._id,
                beer: review.beer_id,
                comment: review.comment,
                haveAnother: review.haveAnother,
                user: review.author
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went horribly awry'});
    });
});

// Post review
router.post('/', (req, res) => {
    const requiredFields = ['beer_id', 'comment', 'haveAnother', 'user_id'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });


    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        beer: req.body.beer_id,
        haveAnother: req.body.haveAnother,
        comment: req.body.comment,
        user: req.body.user_id
    });

    newReview
    .save()
    .then(reviewResult => {
        console.log(reviewResult._id);
        Beer.findOneAndUpdate(
            {_id: req.body.beer_id},
            {$push: {"reviews": reviewResult._id}},
            {new: true},
            (err, doc) => {
                if (err) {
                    console.log(err);
                }
            }
        )
        .populate('review').populate('user').exec((err, beer) => {
            if(err){
                console.log(err)
            } else {
                 return res.status(201).json({
                     message: "Review saved to beer",
                     beer: beer.serialize()
                 });
            }
          
        })
        
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });
});

// Put review by id
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
        .then(updatedPost => res.status(200).json({
            id: updatedPost.id,
            beer: updatedPost.beer,
            comment: updatedPost.comment,
            haveAnother: updatedPost.haveAnother
        }))
        .catch(err => res.status(500).json({message: err}));
});
// Delete review by id
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


module.exports = { router };
