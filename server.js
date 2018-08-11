"use strict";

const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", () => {
    console.log("GET request to /");
    res.send("home page");
    
});
app.listen(process.env.PORT || 8080);



module.exports = app;