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

const state = {
    userDocs: [],
    categoryDocs: [],
    styleDocs: [],
    beerDocs: []
};


function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

// function seedUserData() {
//     let users = [];
//     for (var i = 1; i < 5; i++) {
//         let user = new User({
//             userName: faker.internet.userName(),
//             password: faker.internet.password()
//         });
//         users.push(user);
//     }
//     User.insertMany(users).then(results => {
//         state.userDocs = results;
//         state.userDocs.save(results);
//     });
// }


// function seedCategoriesData() {
//     let categories = [];
//     for (var i = 1; i < 5; i++) {
//         let category = new Category({
//             name: faker.lorem.word() + " Category"
//         });
//         categories.push(category);
//     }
//      Category.insertMany(categories).then(results => {
//         // console.log(results);
//         // console.log('categories console');
//          state.categoryDocs = results;
//         // console.log(newResult);
//         // state.categoryDocs.save(newResult);

        
//     });
// }

// function seedStylesData () {
//     let styles = [];
//     for (var i = 1; i < 5; i++) {
//         let style = new Style({
//             name: faker.lorem.word() + " Style"
//         });
//         styles.push(style);
//     }
//     Style.insertMany(styles).then(results => {
//         state.styleDocs = results;
//         state.styleDocs.save(results);
//     });
// }

// function seedBeerData () {  
//         let beers = [];
//         for (var i = 1; i < 5; i++) {
//             let beer = new Beer({
//                 name: faker.name.lastName(),
//                 brewery: faker.company.companyName(),
//                 category: getRandomCategory(),
//                 style: getRandomStyle(),
//                 reviews: []
//             });
//             beers.push(beer);
//         }
//         Beer.insertMany(beers).then(results => {
//             state.beerDocs = results;
//             state.beerDocs.save(results);
//         });
// }
   
function seedReviewData() {
    const seedData = [

    ]
    return Review.insertMany(seedData);
}

// function seedReviewData() {
//     console.info('seeding beer review data');
//     for (let j = 0; j < state.beerDocs.length; j++) {
//         createReviewSeed();
//     } 
// }

function seedDb() {
    // seedUserData();
    // seedCategoriesData();
    // seedStylesData();
    seedBeerData();
    seedReviewData();
}

// function getRandomStyle() {
//     return state.styleDocs[Math.floor(Math.random() * state.styleDocs.length)]._id;
// }

// function getRandomCategory() {
//     console.log(state.categoryDocs);
//     return state.categoryDocs[Math.floor(Math.random() * state.categoryDocs.length)]._id;
// }

// function getRandomBeer() {
//     return state.beerDocs.insertedIds[Math.floor(Math.random() * state.beerDocs.insertedIds.length)];
// }

// function getRandomUser() {
//     return state.userDocs[Math.floor(Math.random() * state.userDocs.length)]._id;
// }

// function createReviewSeed(beer) {
//     // console.log(beer);
//     let newReview = new Review({
//         _id: new mongoose.Types.ObjectId(),
//         beer: beer._id,
//         haveAnother: faker.random.boolean(),
//         comment: faker.lorem.sentences(),
//         user: getRandomUser()._id
//     });

//     newReview
//         .save()
//         .then(reviewResult => {
//             Beer.findOneAndUpdate({
//                     _id: beer._id
//                 }, {
//                     $push: {
//                         "reviews": reviewResult._id
//                     }
//                 }, {
//                     new: true
//                 },
//                 (err, doc) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                 }
//             );
//         });
//     // console.log(newReview);
// }


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

    it("should get 200 status and html", function () {
        return chai
            .request(app)
            .get("/")
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.html;
            });
        
    });

    it("should return all existing reviews", function () {
            let res;
            return chai.request(app)
                .get('/reviews/')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.reviews.should.have.lengthOf.at.least(1);
                    
                    // Review.find().exec()
                    // .then(rs => {
                        // console.log(rs);
                        // rws = rs;
                    // })
                    // console.log(rws);
                    // res.body.reviews.should.have.lengthOf.at.least(1);
                    return Review.countDocuments();
                
                })
                .then(count => {
                    console.log("api: " + res.body.reviews.length);
                    // console.log(count);
                    res.body.reviews.should.have.lengthOf(count);
                });
    });

        // it('should return Review with right fields', function () {
        // let resReviews;
        // return chai.request(app)
        //     .get('/reviews/')
        //     .then(function (res) {
        //         res.should.have.status(200);
        //         res.should.be.json;
               
        //         res.body.reviews.should.be.an('array');

        //         res.body.reviews.forEach(function (review) {
        //             review.should.be.a('object');
        //             review.should.include.keys('id', 'beer', 'haveAnother', 'comment', 'user');
        //         });
        //         // just check one of the posts that its values match with those in db
        //         // and we'll assume it's true for rest
        //         resReviews = res.body.reviews[0];
               
        //         return Review.findById(resReviews.id);
        //     })
        //     .then(review => {
        //         resReviews.id.should.equal(review.id);
        //         // console.log(review.beer);
        //         // console.log('hello world');
        //         // console.log(resReviews.beer);
        //         // resReviews.beer.should.equal(review.beer);
        //         resReviews.comment.should.equal(review.comment);
        //         resReviews.haveAnother.should.equal(review.haveAnother);
        //         // resReviews.user.should.equal(review.user);
        //     });
        // });
    

});