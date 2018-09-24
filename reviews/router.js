const express = require("express");
const bodyParser = require("body-parser");
const {Review, Style, Category, Beer, User} = require("./models");


const router = express.Router();

router.use(bodyParser.json());

// User Endpoints

router.get('/users', (req, res) => {
    User
        .find()
        .then(users => {
            console.log(users);
            res.json(users.map(user => {
                return {
                    id: user._id,
                    userName: user.userName,
                    password: user.password
                };
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went terribly wrong'});
        });
});

router.post('/users', (req, res) => {
    const requiredFields = ['userName', 'password'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    User
        .findOne({
            userName: req.body.userName
        })
        .then(user => {
            if (user) {
                const message = `Username already taken`;
                console.error(message);
                return res.status(400).send(message);
            } else {
                User
                    .create({
                        userName: req.body.userName,
                        password: req.body.password
                    })
                    .then(user => res.status(201).json({
                        _id: user.id,
                        userName: user.userName,
                        password: user.password
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            error: 'Something went wrong'
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

router.get('/beers', (req, res) => {
    Beer
        .find()
        .then(beers => {
            console.log(beers);
            res.json(beers.map(beer => {
                return {
                     _id: beer.id,
                    name: beer.name,
                    breweryName: beer.breweryName,
                    category: beer.category,
                    style: beer.style,
                };
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went terribly wrong'});
        });
});

router.post('/beers', (req, res) => {
    const requiredFields = ['name', 'breweryName', 'style', 'category'];
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
                style: req.body.style
            })
            .then(beer => res.status(201).json({
                    _id: beer.id,
                    name: beer.name,
                    breweryName: beer.breweryName,
                    category: beer.category,
                    style: beer.style,
            }))
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: 'Something went wrong'
                });
            });       
});


// Style Endpoints
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
            res.status(500).json({error: 'something went horribly awry'});
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
        .findOne({ name: req.body.name})
        .then(style => {
            if (style) {  
                const message = `Style already exists`;
                console.error(message);
                return res.status(400).send(message);
            }
            else {
                Style
                    .create({
                        name: req.body.name
                    })
                    .then(style => res.status(201).json({
                        _id: style.id,
                        name: style.name
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({error: 'something went awry'});
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'something went horribly awry'});
        });
});



// Category Endpoints

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
                error: 'something went horribly awry'});
        });
});

router.post('/categorys', (req, res) => {
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
                        _id: category.id,
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

// Review Endpoints
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
                beer: review.beer,
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

router.post('/', (req, res) => {
    const requiredFields = ['beer', 'comment', 'haveAnother', 'user_id'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    User
        .findById(req.body.user_id)
        .then(user => {
            if (user) {
                Review
                    .create({
                        beer: req.body.beer,
                        comment: req.body.comment,
                        haveAnother: req.body.haveAnother,
                        user: req.body.id
                    })
                    .then(review => res.status(201).json({
                        id: review.id,
                        beer: review.beer,
                        comment: review.comment,
                        haveAnother: review.haveAnother,
                        user: `${user.userName}`
                        
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            error: 'Something went wrong'
                        });
                    });
            } else {
                const message = `User not found`;
                console.error(message);
                return res.status(400).send(message);
            }
        })
        .catch(err => {
            console.error(err);
            console.log(user);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
        
});

router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
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
        .catch(err => res.status(500).json({
            message: err
        }));
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
    res.status(404).json({
        message: 'Not Found'
    });
});


module.exports = { router };
