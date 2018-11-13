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

function seedBeerData (categories, styles) {  
    let beers = [];
    for (var i = 1; i < 15; i++) {
        let beer = new Beer({
            name: faker.name.lastName(),
            brewery: faker.company.companyName(),
            category: getRandomCategory(categories),
            style: getRandomStyle(styles),
            reviews: []
        });
        beers.push(beer);
    }
    return Beer.insertMany(beers);
}

function seedReviewData(users, beers) {
    console.info('seeding beer review data');
    for (let j = 0; j < 30; j++) {
        createReviewSeed(users, beers);
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
    .then(async () => {
        let categories = await getCategories();
        let styles = await getStyles();
        return seedBeerData(categories, styles);
    })
    .then(async () => {
        let beers = await getBeers();
        let users = await getUsers();
        return seedReviewData(users, beers);
    });
}

function getCategories() {
    return Category.find()
    .then(cats => {
        return cats;
    });
}

function getStyles() {
    return Style.find()
        .then(stys => {
            return stys;
        });
}

function getUsers() {
    return User.find()
        .then(usrs => {
            return usrs;
        });
}

function getBeers() {
    return Beer.find()
        .then(brs => {
            return brs;
        });
}

function getRandomStyle(styles) {
    return styles[Math.floor(Math.random() * styles.length)]._id;
}

function getRandomCategory(categories) {   
    return categories[Math.floor(Math.random() * categories.length)]._id;
}

function getRandomBeer(beers) {
    return beers[Math.floor(Math.random() * beers.length)]._id;
}

function getRandomUser(users) {
    return users[Math.floor(Math.random() * users.length)]._id;
}

function createReviewSeed(users, beers) {
    let beerId = getRandomBeer(beers);
    let userId = getRandomUser(users);
    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        beer: beerId,
        haveAnother: faker.random.boolean(),
        comment: faker.lorem.sentences(),
        user: userId
    });
    newReview
        .save()
        .then(reviewResult => {
            // console.log(reviewResult);
            Beer.findOneAndUpdate({ _id: beerId}, 
                { $push: {"reviews": reviewResult._id}}, 
                {new: true},
                (err, doc) => {
                    if (err) { console.log(err);
                    }
                }
            );
        });
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

    // it("should get 200 status and html", function () {
    //     return chai
    //         .request(app)
    //         .get("/")
    //         .then(function (res) {
    //             res.should.have.status(200);
    //             res.should.be.html;
    //         });
    // });

    // it("should return all users", function () {
    //     let res;
    //     return chai.request(app)
    //         .get('/users/')
    //         .then(_res => {
    //             res = _res;
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.users.should.have.lengthOf.at.least(1);

    //             return User.countDocuments();
    //         })
    //         .then(count => {
    //             res.body.users.should.have.lengthOf(count);
    //         });
    // });
    
    // it("should return all categories", function () {
    //     let res;
    //     return chai.request(app)
    //     .get('/categories/')
    //     .then(_res => {
    //         res = _res;
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.categorys.should.have.lengthOf.at.least(1);

    //         return Category.countDocuments();
    //         })
    //     .then(count => {
    //         res.body.categorys.should.have.lengthOf(count);
    //         });
    // });

    // it("should return all styles", function () {
    //     let res;
    //     return chai.request(app)
    //     .get('/styles/')
    //     .then(_res => {
    //         res = _res;
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.styles.should.have.lengthOf.at.least(1);

    //             return Style.countDocuments();
    //     })
    //     .then(count => {
    //         res.body.styles.should.have.lengthOf(count);
    //     });
    // });

    // it("should return all beers", function () {
    //     let res;
    //     return chai.request(app)
    //     .get('/beers/')
    //     .then(_res => {
    //         res = _res;
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.beers.should.have.lengthOf.at.least(1);
    //         // console.log(res.body.beers);
    //         // console.log(res.body);

    //         return Beer.countDocuments();
    //     })
    //     .then(count => {
    //         res.body.beers.should.have.lengthOf(count);
    //     });
    // });

    // it("should return all existing reviews", function () {
    //     let res;
    //     return chai.request(app)
    //     .get('/reviews/')
    //     .then(_res => {
    //         res = _res;
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.reviews.should.have.lengthOf.at.least(1);
                   
    //         return Review.countDocuments();
    //     })
    //     .then(count => {
    //         res.body.reviews.should.have.lengthOf(count);
    //     });
    // });

    it("should return a specific review", function () {
    //    let specificReview;
        // let review;
        let res;
        return chai.request(app)
            .get('/reviews/:id')
            .then(_res => {
                res = _res;
                

            })
            
        // return Review.findOne()
        //     .then(rev => {
        //         console.log(rev);
        //         return rev;
        //     });
        
        // return Review
        //     .find()
        //     .then(function (review) {
        //         // specificReview = review;
        //             console.log(review);
        //         // make request then inspect it to make sure it reflects
        //         // data we sent
        //         // return chai.request(app)
        //         //     .get(`/review/${review._id}`)
        //         //     .then(() => {
        //         //         console.log(review.id);
        //         //     });
        //     });
            // .then(function (res) {
            //     expect(res).to.have.status(204);

            //     return Review.findById(specificReview.id);
            // })
            // .then(function (review) {
            //     specificReview.id.should.equal(review.id);
            // });
       
       
       
       
       
       
        // return Review
        // .findOne(review._id)
        // .then(function(review) {
        //     console.log(review);
            // review.should.have.status(200);
            // review.should.be.json;
        // });
        // return chai.request(app)
            
        //     .get('/reviews/:id')
        //     .then(_res => {
        //             res = _res;
        //             console.log(res.);
        //             // res.should.have.status(200);
        //             // res.should.be.json;
        //             // res.reviews.should.have.lengthOf.at.least(1);

        //             // return Review.countDocuments();
        //         })
        //         .then(() => {
        //             // res.body.reviews.should.have.lengthOf(count);
        //         });


            // .then(function (_review) {
            //     review = _review;
            //     return chai.request(app).get(`/reviews/${review._id}`);
            //     review.should.have.status(200);
            //     res.should.be.json;
            // })
            // .then(function (review) {
            //     res.should.have.status(200);
            //     return Review.findById(review._id);
            // });
    });


    // it('should return User with right fields', function () {
    //     let resUsers;
    //     return chai.request(app)
    //     .get('/users/')
    //     .then(function (res) {
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         res.body.users.should.be.an('array');

    //         res.body.users.forEach(function (user) {
    //             user.should.be.a('object');
    //             user.should.include.keys('id', 'userName', 'password');
    //         });
    //         resUsers = res.body.users[0];
    //         return User.findById(resUsers.id);
    //     })
    //     .then(user => {

    //         resUsers.id.should.equal(user.id.toString());
    //         resUsers.userName.should.equal(user.userName);
    //         resUsers.password.should.equal(user.password);
    //     });
    // });

    // it('should return Beer with right fields', function () {
    //     let resBeers;
    //     return chai.request(app)
    //         .get('/beers/')
    //         .then(function (res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.beers.should.be.an('array');
                
    //             // console.log(res.body.beers.reviews);

    //             res.body.beers.forEach(function (beer) {
    //                 // console.log(beer);
    //                 beer.should.be.a('object');
    //                 beer.should.include.keys('_id', 'name', 'brewery', 'category', 'style', 'reviews');
    //             });
    //             resBeers = res.body.beers[0];
    //             // console.log(res.body.beers[0]);

    //             return Beer.findById(resBeers._id);
    //         })
    //         .then(beer => {
    //             resBeers._id.should.equal(beer._id.toString());
    //             resBeers.name.should.equal(beer.name);
    //             resBeers.brewery.should.equal(beer.brewery);
    //             resBeers.category.should.equal(beer.category._id.toString());
    //             resBeers.style.should.equal(beer.style._id.toString());
    //             // console.log(resBeers.reviews);
    //             // console.log(beer.reviews);
    //             // resBeers.reviews.beers.should.eql(beer.reviews.beers);
    //             // beer.reviews.should.equal(beer.reviews);
    //             // console.log(resBeers.style);
    //             // console.log(resBeers.reviews);
    //             // console.log('ayayayayayayaya');
    //             // console.log(beer.reviews);
    //             // console.log(resBeers);
    //             // console.log(beer);
    //             // console.log(resBeers.reviews._id);
    //         });

    // });

        // it('should return Review with right fields', function () {
        //     let resReviews;
        //     return chai.request(app)
        //     .get('/reviews/')
        //     .then(function (res) {
        //         res.should.have.status(200);
        //         res.should.be.json;
        //         res.body.reviews.should.be.an('array');

        //         res.body.reviews.forEach(function (review) {
        //             review.should.be.a('object');
        //             review.should.include.keys('id', 'beer', 'haveAnother', 'comment', 'user');
        //         });
        //         resReviews = res.body.reviews[0];
        //         return Review.findById(resReviews.id);
        //     })
        //     .then(review => {
        //         resReviews.id.should.equal(review.id);
        //         resReviews.beer.should.equal(review.beer._id.toString());
        //         resReviews.comment.should.equal(review.comment);
        //         resReviews.haveAnother.should.equal(review.haveAnother);
        //         resReviews.user.should.equal(review.user._id.toString());
        //     });
        // });


        // it('should return Style with right fields', function () {
        //     let resStyles;
        //     return chai.request(app)
        //         .get('/styles/')
        //         .then(function (res) {
        //             res.should.have.status(200);
        //             res.should.be.json;
        //             res.body.styles.should.be.an('array');

        //             res.body.styles.forEach(function (style) {
        //                 style.should.be.a('object');
        //                 style.should.include.keys('_id', 'name');
        //             });
        //             resStyles = res.body.styles[0];

        //             return Style.findById(resStyles._id);
        //         })
        //         .then(style => {
        //             resStyles._id.should.equal(style._id.toString());
        //             resStyles.name.should.equal(style.name);
        //         });
        // });

        // it('should return Category with right fields', function () {
        //     let resCategories;
        //     return chai.request(app)
        //         .get('/categories/')
        //         .then(function (res) {
        //             res.should.have.status(200);
        //             res.should.be.json;
        //             res.body.categorys.should.be.an('array');

        //             res.body.categorys.forEach(function (category) {
        //                 category.should.be.a('object');
        //                 category.should.include.keys('_id', 'name');
        //             });
        //             resCategories = res.body.categorys[0];

        //             return Category.findById(resCategories._id);
        //         })
        //         .then(category => {
        //             resCategories._id.should.equal(category._id.toString());
        //             resCategories.name.should.equal(category.name);
        //         });
        // });

        //  it("should return a specific user", function () {
        //      let users;
        //      return User
        //          .find()
        //          .then(function (_users) {
        //              users = _users;
        //              return chai.request(app).get(`/users/${users._id}`);
        //          })
        //          .then(function (res) {
        //              console.log(users);
        //              console.log(users._id);
        //              res.should.have.status(200);
        //              return User.findById(users._id);
        //          })
        //         // .then(function(_users) {
        //         //     users._id.shoud.equal(_users._id)
        //         //  });
        //  });

        //  it("should return all users", function () {
        //      let res;
        //      return chai.request(app)
        //          .get('/users/:id')
        //          .then(_res => {
        //              res = _res;
        //              res.should.have.status(200);
        //              res.should.be.json;
        //              res.body.users.should.have.lengthOf.at.least(1);

        //              return User.countDocuments();
        //          })
        //          .then(count => {
        //              res.body.users.should.have.lengthOf(count);
        //          });
        //  });

        //  it("should return a specific beer", function () {
        //      let beers;
        //      return Beer
        //          .findOne()
        //          .then(function (_beers) {
        //              beers = _beers;
        //              return chai.request(app).get(`/beers/${beers._id}`);
        //          })
        //          .then(function (res) {
        //              res.should.have.status(200);
        //              return Beer.findById(beers._id);
        //          });
        //  });

});