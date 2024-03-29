const express = require("express");
const bodyParser = require("body-parser");

const {
    User
} = require("./models");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.json({
                users: users.map(user => {
                    return user.serialize();
                })
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        });
});

router.get("/:userIdsCsv", (req, res) => {
    let arrUserIds = req.params.userIdsCsv.split(",");
    User
        .find({
            '_id': {
                $in: arrUserIds
            }
        })
        .then(users => {
            res.json({
                users: users.map(
                    (user) => {
                        return user.serialize();
                    }
                )
            });
        })
        .catch(err => {
            if (err) return console.error(err);
        });
});

router.get("/:id", (req, res) => {
    User
        .findById(req.params.id)
        .then(user => res.json(user.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});

router.post('/', (req, res) => {
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
                        _id: user._id,
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

router.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

const usersRouter = router;
module.exports = {
    usersRouter
};