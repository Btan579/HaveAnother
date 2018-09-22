"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("index page", function () {
    it("should exist", function () {
        return chai
            .request(app)
            .get("/")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });
});










// "use strict";

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

