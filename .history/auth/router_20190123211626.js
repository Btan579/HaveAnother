'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const {
    User
} = require('../users/models');

const config = require('../config');
const router = express.Router();
const bcrypt = require('bcryptjs');

const createAuthToken = function (user) {
    return jwt.sign({
        user
    }, config.JWT_SECRET, {
        subject: user.userName,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const localAuth = passport.authenticate('local', {
    session: false
});

router.use(bodyParser.json());

router.post('/login', localAuth, (req, res) => {
    const authToken = createAuthToken(req.user.serialize());

    res.json({
        token: authToken,
        user: req.user
    });
});

router.post('/register', (req, res) => {
    const requiredFields = ['userName', 'password'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    var hashedPassword = bcrypt.hashSync(req.body.password, 10);

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
                        password: hashedPassword
                    })
                    .then(user => {
                        const authToken = createAuthToken(user);
                        res.status(201).json({
                            token: authToken,
                            userName: user.userName,
                            user_id: user._id
                        });
                    })
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

const jwtAuth = passport.authenticate('jwt', {
    session: false
});

router.post('/refresh', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({
        authToken
    });
});

module.exports = {
    router
};