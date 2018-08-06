"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const faker = require('faker');

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

describe("sign up page", function () {
    it("should exist", function () {
        return chai
            .request(app)
            .get("/users.html")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });
});

describe("review page", function () {
    it("should exist", function () {
        return chai
            .request(app)
            .get("/reviews.html")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });
});