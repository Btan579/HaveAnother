"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');
const faker = require('faker');

const {Review, Style, Category, Beer, User } = require("../reviews/models");

const { app, runServer, closeServer } = require('../server');

const { TEST_DATABASE_URL } = require('../config');

const should = chai.should();


chai.use(chaiHttp);


function seedDb() {
    seedCategoriesData();
    seedStylesData();
    seedBeersData();
    seedUsersData();
}

function seedCategoriesData() {
    let categories = [];
    for (var i = 0; i <= 10; i++) {
        categories.push(faker.lorem.word())
    }
    Category.insertMany(categories);
}

function seedStylesData() {
    let styles = [];
    for (var i = 0; i <= 10; i++) {
        styles.push(faker.lorem.word())
    }
    Style.insertMany(styles);
}

function seedBeersData() {
    let beers = [];
    for (var i = 0; i <= 10; i++) {
        let beer = {
            name: faker.lorem.word(),
            brewery: faker.company.companyName(),
            style: getRandomStyle._id,
            category: getRandomCategory._id,
            reviews: []
        }
        beers.push(beer);
    }
    Beer.insertMany(beers);
}

function seedUsersData() {
    let users = [];
    for (var i = 0; i <= 10; i++) {
        let user = {
            userName: faker.internet.userName(),
            password: faker.internet.password()
        }
        users.push(user);
    }
    User.insertMany(users);
}

function getRandomStyle() {
    let styles = Style.find();

    return styles[Math.Floor(Math.Random() * styles.length)]
}

function getRandomCategory() {
    let categories = Category.find();
    return categories[Math.Floor(Math.Random() * categories.length)]
}


function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Reviews API resource', function() {
    
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedDb();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });




});

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






















// function seedReviewData() {
//     console.info('seeding review data');
//     const seedData = [];

//     for (let i = 1; i<= 10; i++) {
//         seedData.push(generateReviewData());
//     }
//     return Review.insertMany(seedData);
// }






// function generatehaveAnother() {
//     const haveAnothers = [true, false];
//     return haveAnothers[Math.floor(Math.random() * haveAnothers.length)];
// }

// function generateStyles() {
//     const styles = ["Aged", "American", "British", "German", "None"];
//     return styles[Math.floor(Math.random() * styles.length)];
// }

// function generateCategorys() {
//     const categorys = ["India Pale Ale", "Lager", "Stout", "Pilsner", "None"];
//     return categorys[Math.floor(Math.random() * categorys.length)];
// }

// function gernerateBreweries() {
//     const breweries = ["Miller", "Budwesier", "Coors", "Same Adams", "Magic Hat"];
//     return breweries[Math.floor(Math.random() * breweries.length)];
// }

// function gernerateBeerNames() {
//     const beerNames = ["Twisted", "Dark one", "Lobster", "Milkshake", "Tornado"];
//     return beerNames;
// }


// function generateBeers() {
//    return {
//        name: gernerateBeerNames(),
//        breweryName: gernerateBreweries(),
//        category: generateCategorys(),
//        styles: generateStyles()
//    };
// }

// generateReviewData() {
//     return {
//         beer: generateBeers(),
//         haveAnother: generatehaveAnother(),
//         comment: faker.lorem.sentence,
//         user: faker.internet.userName
//     };
// }
