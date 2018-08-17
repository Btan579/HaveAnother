"use strict";

const express = require("express");
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');

// const {
//     router: usersRouter
// } = require('./users');
// const {
//     router: authRouter,
//     localStrategy,
//     jwtStrategy
// } = require('./auth');

const app = express();

app.use(express.static("public"));
app.use(morgan('common'));



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
app.listen(process.env.PORT || 8080);



// module.exports = {
//     app,
//     runServer,
//     closeServer
// };
