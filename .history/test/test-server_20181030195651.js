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

// const state = {
//     userDocs: [],
//     categoryDocs: [],
//     styleDocs: [],
//     beerDocs: []
// };


function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function seedUserData() {
    let users = [];
    for (var i = 1; i < 5; i++) {
        let user = new User({
            userName: faker.internet.userName(),
            password: faker.internet.password()
        });
        users.push(user);
    }
    return User.insertMany(users); 
}

function seedCategoriesData() {
    let categories = [];
    for (var i = 1; i < 10; i++) {
        let category = new Category({
            name: faker.lorem.slug() + " Category"
        });
        categories.push(category);
    }
     return Category.insertMany(categories);
}

function seedStylesData () {
    let styles = [];
    for (var i = 1; i < 35; i++) {
        let style = new Style({
            name: faker.lorem.words() + " Style"
        });
        styles.push(style);
    }
    return Style.insertMany(styles);
  
}

function seedBeerData () {  
        let beers = [];
        for (var i = 1; i < 5; i++) {
            let beer = new Beer({
                name: faker.name.lastName(),
                brewery: faker.company.companyName(),
                category: getRandomCategory(),
                style: getRandomStyle(),
                reviews: []
            });
            beers.push(beer);
        }
        Beer.insertMany(beers).then(results => {
            state.beerDocs = results;
            state.beerDocs.save(results);
        });
}


function seedReviewData() {
    console.info('seeding beer review data');
    for (let j = 0; j < state.beerDocs.length; j++) {
        createReviewSeed(getRandomBeer());
    } 
}

function seedDb() {
    return seedUserData()
    .then(() => {
       return seedCategoriesData();
    })
    .then(() => {
        return seedStylesData();
    })
    .then(() => {
        return seedBeersData();
    });
    // seedCategoriesData();
    // seedStylesData();
    // seedReviewData();
    // seedBeerData();
}

function getRandomStyle() {
    return state.styleDocs[Math.floor(Math.random() * state.styleDocs.length)]._id;
}

function getRandomCategory() {
    console.log(state.categoryDocs);
    return state.categoryDocs[Math.floor(Math.random() * state.categoryDocs.length)]._id;
}

function getRandomBeer() {
    return state.beerDocs.insertedIds[Math.floor(Math.random() * state.beerDocs.insertedIds.length)];
}

function getRandomUser() {
    return state.userDocs[Math.floor(Math.random() * state.userDocs.length)]._id;
}

function createReviewSeed(beer) {
    // console.log(beer);
    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        beer: beer._id,
        haveAnother: faker.random.boolean(),
        comment: faker.lorem.sentences(),
        user: getRandomUser()._id
    });

    newReview
        .save()
        .then(reviewResult => {
            Beer.findOneAndUpdate({
                    _id: beer._id
                }, {
                    $push: {
                        "reviews": reviewResult._id
                    }
                }, {
                    new: true
                },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        });
    // console.log(newReview);
}


describe('GET endpoint', function() {

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

    it("should get 200 status and html", function () {
        return chai
            .request(app)
            .get("/")
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.html;
            });
    });

    it("should return all users", function () {
        let res;
        return chai.request(app)
            .get('/users/')
            .then(_res => {
                res = _res;
                res.should.have.status(200);
                res.should.be.json;
                res.body.users.should.have.lengthOf.at.least(1);

                return User.countDocuments();
            })
            .then(count => {
                res.body.users.should.have.lengthOf(count);
            });
    });
    
    it("should return all categories", function () {
        let res;
        return chai.request(app)
            .get('/categories/')
            .then(_res => {
                res = _res;
                res.should.have.status(200);
                res.should.be.json;
                res.body.categorys.should.have.lengthOf.at.least(1);

                return Category.countDocuments();
            })
            .then(count => {
                res.body.categorys.should.have.lengthOf(count);
            });
    });

    it("should return all styles", function () {
        let res;
        return chai.request(app)
            .get('/styles/')
            .then(_res => {
                res = _res;
                res.should.have.status(200);
                res.should.be.json;
                res.body.styles.should.have.lengthOf.at.least(1);

                return Style.countDocuments();
            })
            .then(count => {
                res.body.styles.should.have.lengthOf(count);
            });
    });

    // it('should return User with right fields', function () {
    //     let resUsers;
    //     return chai.request(app)
    //         .get('/users/')
    //         .then(function (res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.an('array');

    //             res.body.forEach(function (user) {
    //                 user.should.be.a('object');
    //                 user.should.include.keys('id', 'userName', 'password');
    //             });
    //             resUsers = res.body[0];

    //             return User.findById(resUsers.id);
    //         })
    //         .then(user => {
    //             resUsers.id.should.equal(user.id.toString());
    //             resUsers.userName.should.equal(user.userName);
    //             resUsers.password.should.equal(user.password);
    //         });
    // });

    // it("should return all existing reviews", function () {
    //         let res;
    //         return chai.request(app)
    //             .get('/reviews/')
    //             .then(_res => {
    //                 res = _res;
    //                 res.should.have.status(200);
    //                 res.should.be.json;
    //                 res.body.reviews.should.have.lengthOf.at.least(1);
                   
    //                 return Review.countDocuments();
    //             })
    //             .then(count => {
    //                 res.body.reviews.should.have.lengthOf(count);
    //             });
    // });

    //     it('should return Review with right fields', function () {
    //     let resReviews;
    //     return chai.request(app)
    //         .get('/reviews/')
    //         .then(function (res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.reviews.should.be.an('array');

    //             res.body.reviews.forEach(function (review) {
    //                 review.should.be.a('object');
    //                 review.should.include.keys('id', 'beer', 'haveAnother', 'comment', 'user');
    //             });
    //             resReviews = res.body.reviews[0];
               
    //             return Review.findById(resReviews.id);
    //         })
    //         .then(review => {
    //             resReviews.id.should.equal(review.id);
    //             resReviews.beer.should.equal(review.beer._id.toString());
    //             resReviews.comment.should.equal(review.comment);
    //             resReviews.haveAnother.should.equal(review.haveAnother);
    //             resReviews.user.should.equal(review.user._id.toString());
    //         });
    //     });

        

});
  