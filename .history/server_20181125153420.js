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

app.use("/reviews/", reviewsRouter);
app.use("/users/", usersRouter);
app.use("/beers/", beersRouter);
app.use("/styles/", stylesRouter);
app.use("/categories/", categoriesRouter);



mongoose.Promise = global.Promise;

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app
            .listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve(server);
            })
            .on("error", err => {
                reject(err);
            });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
            if (err) {
                reject(err);
                // so we don't also call `resolve()`
                return;
            }
            resolve();
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
