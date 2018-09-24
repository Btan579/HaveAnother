"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server.js');

const { TEST_DATABASE_URL } = require('../config');

const should = chai.should();


chai.use(chaiHttp);

describe("GET endpoint", function () {
    it("should return all reviews", function () {
        return chai.request(app)
            .get("/")
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.html;
            });
    });
});

// "use strict";npmpmnpm

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../server.js");
// const faker = require('faker');


// const expect = chai.expect;

// const {Review} = require('../models');

// chai.use(chaiHttp);

// describe("GET endpoint", function () {
//     it("should return all existing reviews", function () {
//         return chai
//             .request(app)
//             .get("/")
//             .then(function (res) {
//                 expect(res).to.have.status(200);
//             });
//     });
// });

