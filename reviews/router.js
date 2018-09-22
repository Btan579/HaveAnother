const express = require("express");
const bodyParser = require("body-parser");
const {Review, Style, Category, Beer} = require("./models");


const router = express.Router();

router.use(bodyParser.json());

router.get('/styles', (req, res) => {
    Style
        .find()
        .then(styles => {
            console.log(styles);
            res.json({
                styles: styles
            });
        }).
        catch (err => {
            if (err) return console.error(err);
        });
});

router.get("/styles/:id", (req, res) => {
    Style
        .findById(req.params.id)
        .then(style => {
            res.json({
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

router.get('/categorys', (req, res) => {
    Category
        .find()
        .then(categorys => {
            console.log(categorys);
            res.json({
                categorys: categorys
            });
        }).
    catch(err => {
        if (err) return console.error(err);
    });
});

router.get("/categorys/:id", (req, res) => {
    Style
        .findById(req.params.id)
        .then(category => {
            res.json({
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


router.get("/:id", (req, res) => {
    Review
        .findById(req.params.id)
        .then(review => {
            res.json({
                id: review._id,
                userName: review.userName,
                beerName: review.beerName,
                breweryName: review.breweryName,
                beerStyle: review.beerStyle,
                haveAnother: review.haveAnother,
                beerDescrip: review.beerDescrip
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went horribly awry'});
    });
});

module.exports = { router };
