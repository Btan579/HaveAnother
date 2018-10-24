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
    seedCategoriesData();
    seedStylesData();
    seedBeerData();
    seedReviewData();
    seedUserData();

}

function seedBeerData() {
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
    Beer.insertMany(beers);
}

function seedCategoriesData() {
    let categories = [];
    for (var i = 0; i <= 40; i++){
        let category = Category({
            name: faker.lorem.word() + "Category"
        });
        categories.push(category);
    }
    Category.insertMany(categories);
}

function seedStylesData() {
    let styles = [];
    for (var i = 0; i <= 40; i++) {
        let style = Style({
            name: faker.lorem.word() + "Style"
        });
        styles.push(style);
    }
    Style.insertMany(styles);
}

function seedUserData() {
    let users = [];
    for (var i = 0; i <= 40; i++) {
        let user = new User({
            userName: faker.internet.userName(),
            password: faker.internet.password()
        });
        users.push(user);
    }
    User.insertMany(users);
}

function getRandomStyle() {
    let style = new Style();
    Style.find()
    .then(styles => {
        style = styles[Math.floor(Math.random() * styles.length)];
    });
    return style;
}

function getRandomCategory() {
    let category = new Category();
    Category.find()
        .then(categories => {
            category = categories[Math.floor(Math.random() * categories.length)];
        });
        return category;
}

function getRandomBeer() {
    let beer = new Beer();
    Beer.find()
    .then(beers => {
      beer = beers[Math.floor(Math.random() * beers.length)];
    });
    return beer;  
}

function getRandomUser() {
    let user = new User();
    User.find()
    .then(users => {
        user = users[Math.floor(Math.random() * users.length)];
    });
    return user;      
}

function createReviewSeed(beer) {
    // console.log(beer);
    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        beer: beer._id,
        haveAnother: faker.random.boolean,
        comment: faker.lorem.sentences,
        user:  getRandomUser()._id
    });

    newReview
        .save()
        .then(reviewResult => {
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
        // console.log(Review.find());
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
                    return Review.count();
                })
                .then(count => {
                    res.body.reviews.should.have.lengthOf(count);
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
