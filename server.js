"use strict";

const express = require("express");
const passport = require('passport');
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { BeerReview } = require('./models');

const app = express();

app.use(express.static("public"));
app.use(morgan('common'));


// get all reviews
app.get('/reviews', (req, res) => {
    BeerReview
        .find()
        .then(reviews => {
            res.json({
            reviews: reviews.map(review => review.serialize())
            });
        })
})


app.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Llistening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
    runServer,
    app,
    closeServer
};


// const {
//     router: usersRouter
// } = require('./users');
// const {
//     router: authRouter,
//     localStrategy,
//     jwtStrategy
// } = require('./auth');


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     if (req.method === 'OPTIONS') {
//         return res.send(204);
//     }
//     next();
// });

// passport.use(localStrategy);
// passport.use(jwtStrategy);

// app.use('/api/users/', usersRouter);
// app.use('/api/auth/', authRouter);

// const jwtAuth = passport.authenticate('jwt', {
//     session: false
// });

// app.get("/", () => {
//     console.log("GET request to /");
//     res.send("home page");
    
// });
// app.listen(process.env.PORT || 8080);



// module.exports = {
//     app,
//     runServer,
//     closeServer
// };
