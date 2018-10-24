"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

mongoose.Promise = global.Promise;

const { Category } = require('../categories/models');
const { Style } = require('../styles/models');
const { User } = require('../users/models');
const { Beer } = require('../beers/models');
const { Review } = require('../reviews/models');

const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

const should = chai.should();


chai.use(chaiHttp);

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}


// Seed database
function seedDb() {
    seedUsersData();
    seedBeersData();
    seedReviewData();
}

function seedBeersData() {
        let beers = [];
        for (var i = 0; i <= 40; i++) {
            let beer = new Beer({
                name: faker.name.lastName(),
                breweryName: faker.company.companyName(),
                category: getRandomCategory(),
                style: getRandomStyle(),
                reviews: []
            });
            beers.push(beer);
        }
        return Beer.insertMany(beers);

    }


function seedUsersData() {
    let users = [];
    for (var i = 0; i <= 5; i++) {
        let user = new User({
            userName: faker.internet.userName(),
            password: faker.internet.password()
        });
        users.push(user);
    }
    return User.insertMany(users);
}
//  Generate random review data

function getRandomStyle() {
    let styles = [{
            "_id": "5ba6c4de7deaad1410cb55f0",
            "name": "Aged"
        },
        {
            "_id": "5ba6c5637deaad1410cb55f2",
            "name": "American"
        },
        {
            "_id": "5ba6c56b7deaad1410cb55f3",
            "name": "Australasian"
        },
        {
            "_id": "5ba6c5a27deaad1410cb55f4",
            "name": "Baltic"
        },
        {
            "_id": "5ba6c5bc7deaad1410cb55f5",
            "name": "Bamberg"
        },
        {
            "_id": "5ba6c5c87deaad1410cb55f6",
            "name": "Belgian"
        },
        {
            "_id": "5ba6c5d77deaad1410cb55f7",
            "name": "British"
        },
        {
            "_id": "5ba6c5e77deaad1410cb55f8",
            "name": "California"
        },
        {
            "_id": "5ba6c6147deaad1410cb55f9",
            "name": "Dark"
        },
        {
            "_id": "5ba6c61e7deaad1410cb55fa",
            "name": "English"
        },
        {
            "_id": "5ba6c6277deaad1410cb55fb",
            "name": "European"
        },
        {
            "_id": "5ba6c6397deaad1410cb55fc",
            "name": "French & Belgian"
        },
        {
            "_id": "5ba6c6447deaad1410cb55fd",
            "name": "French"
        },
        {
            "_id": "5ba6c65c7deaad1410cb55fe",
            "name": "Irish"
        },
        {
            "_id": "5ba6c6667deaad1410cb55ff",
            "name": "Japanese"
        },
        {
            "_id": "5ba6c6727deaad1410cb5600",
            "name": "Leipzip"
        },
        {
            "_id": "5ba6c67e7deaad1410cb5601",
            "name": "Pale to Amber"
        },
        {
            "_id": "5ba6c6887deaad1410cb5602",
            "name": "Scottish"
        },
        {
            "_id": "5ba6c6937deaad1410cb5603",
            "name": "Sour"
        },
        {
            "_id": "5ba6c69a7deaad1410cb5604",
            "name": "South German"
        }
    ];
           return styles[Math.floor(Math.random() * styles.length)];
}

function getRandomCategory() {
    let categories = [
        {
            "_id": "5ba6cd14efc0e23b88b901e8",
            "name": "Aged"
        },
        {
            "_id": "5ba6d4080812ed470102ab0e",
            "name": "Amber Lager"
        },
        {
            "_id": "5ba6d4080812ed470102ab0f",
            "name": "Barley Wine Ale"
        },
        {
            "_id": "5ba6d4080812ed470102ab10",
            "name": "Berliner Weisse"
        },
        {
            "_id": "5ba6d4080812ed470102ab11",
            "name": "Bernsteinfarbenes Weizen"
        },
        {
            "_id": "5ba6d4080812ed470102ab12",
            "name": "Biere de Garde"
        },
        {
            "_id": "5ba6d4080812ed470102ab13",
            "name": "Blonde Ale"
        },
        {
            "_id": "5ba6d4080812ed470102ab14",
            "name": "Bock Rauchbier"
        },
        {
            "_id": "5ba6d4080812ed470102ab15",
            "name": "Bohemian Pilsener"
        },
        {
            "_id": "5ba6d4080812ed470102ab16",
            "name": "Brown Ale"
        },
        {
            "_id": "5ba6d4080812ed470102ab17",
            "name": "Brown Ale / Altbier"
        },
        {
            "_id": "5ba6d4080812ed470102ab18",
            "name": "Brown Porter"
        },
        {
            "_id": "5ba6d4080812ed470102ab19",
            "name": "Chocolate / Cocoa Flavored Beer"
        },
        {
            "_id": "5ba6d4080812ed470102ab1a",
            "name": "Coffee Flavored Beer"
        },
        {
            "_id": "5ba6d4080812ed470102ab1b",
            "name": "Common Beer"
        }
    ];
            return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomBeer() {
Beer.find()
    .then(beers => {
        return beers[Math.floor(Math.random() * beers.length)];
    });
}

// function getRandomBeer() {
//     let beers = [];
//     for (var i = 0; i <= 40; i++) {
//         let beer = new Beer({
//             name: faker.name.lastName(),
//             breweryName: faker.company.companyName(),
//             category: getRandomCategory(),
//             style: getRandomStyle(),
//             reviews: []
//         });
//         beers.push(beer);
//     }
//         return beers[Math.floor(Math.random() * beers.length)];
    
// }

function getRandomUser() {
    return User.find()
    .then(users => {
        return users[Math.floor(Math.random() * users.length)];
    });
}

function createReviewSeed(beer) {
    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        beer: beer._id,
        haveAnother: faker.random.boolean,
        comment: faker.lorem.sentences,
        user:  getRandomUser._id
    });

    newReview
        .save()
        .then(reviewResult => {
            // console.log(reviewResult._id);
            Beer.findOneAndUpdate(
                {_id: beer._id},
                {$push: {"reviews": reviewResult._id}},
                {new: true},
                    (err, doc) => {
                        if (err) {
                            console.log(err);
                        }
                    }
            );  
        });
}

function  seedReviewData() {
    console.info('seeding beer review data');

    for (let i = 1; i <= 10; i++){
        createReviewSeed(getRandomBeer());
    }
    
    return Review.insertMany();
}

describe("GET root", function () {
     it("should get 200 status and html", function () {
         return chai
            .request(app)
            .get("/")
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.html;
                
             });
     });
 });


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

    describe("GET endpoint", function () {
        it("should return all existing reviews", function () {
            let res;
            return chai.request(app)
                .get('/reviews/')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);

                    return Review.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                });
            });

        // it('should return review with right fields', function () {

        // let resReview;
        // return chai.request(app)
        //     .get('/reviews/')
        //     .then(function (res) {

        //         res.should.have.status(200);
        //         res.should.be.json;
        //         res.body.should.be.a('array');
        //         res.body.should.have.lengthOf.at.least(1);

        //         res.body.forEach(function (review) {
        //             review.should.be.a('object');
        //             review.should.include.keys('id', 'beer', 'comment', 'user');
        //         });
        //         // just check one of the posts that its values match with those in db
        //         // and we'll assume it's true for rest
        //         resReview = res.body[0];
        //         return Review.findById(resReview.id);
        //     })
        //     .then(post => {
        //         resReview.id.should.equal(review.id);
        //         resReview.beer.should.equal(review.beer);
        //         resReview.comment.should.equal(review.comment);
        //         resReview.haveAnother.should.equal(review.haveAnother);
        //         resReview.user.should.equal(review.user);
        //     });
//         // });
        });

});









// // function getRandomStyle() {
// Style.find()
//     .then(styles => {
//         console.log(styles[Math.floor(Math.random() * styles.length)]);
    // });

// function seedBeersData() {
//     let beers = [];
//     for (var i = 0; i <= 40; i++) {
//         let beer = new Beer({
//             name: faker.name.lastName(),
//             breweryName: faker.company.companyName(),
//             category: getRandomCategory(),
//             style: getRandomStyle(),
//             reviews: []
//         });
//         beers.push(beer);
//     }
//     console.dir(beers);
//     return Beer.insertMany(beers);

// }
