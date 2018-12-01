"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const morgan = require("morgan");

const { reviewsRouter } = require("./reviews/router");
const { usersRouter } = require("./users/router");
const { beersRouter } = require("./beers/router");
const { stylesRouter } = require("./styles/router");
const { categoriesRouter } = require("./categories/router");

const app = express();

app.use(express.static("public"));
app.use(morgan("common"));
app.use(express.json());

app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/beers", beersRouter);
app.use("/styles", stylesRouter);
app.use("/categories", categoriesRouter);

const {
    PORT,
    DATABASE_URL
} = require("./config");

mongoose.Promise = global.Promise;

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            databaseUrl,
            err => {
                if (err) {
                    return reject(err);
                }
                server = app
                    .listen(port, () => {
                        console.log(`Your app is listening on port ${port}`);
                        resolve();
                    })
                    .on("error", err => {
                        mongoose.disconnect();
                        reject(err);
                    });
            }
        );
    });
}

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


if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {
    app,
    runServer,
    closeServer
};

// mongoimport -h ds137760.mlab.com:37760 -d have-another -c reviews -u btan -p password1 --file C:\Users\btan\Projects\HaveAnother\data\reviews.json
// mongo ds115263.mlab.com:15263/test-have-another -u btan -p password1
