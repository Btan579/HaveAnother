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

describe('Reviews API resource', function () {
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

    // describe('GET endpoint', function() {

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
        //             user.should.include.keys('id', 'userName');
        //         });
        //         resUsers = res.body.users[0];
        //         return User.findById(resUsers.id);
        //     })
        //     .then(user => {
        //         resUsers.id.should.equal(user.id.toString());
        //         resUsers.userName.should.equal(user.userName);
        //         // resUsers.password.should.equal(user.password);
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

            // 
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

            // it("should return a specific beer", function (done) {
            //     const newBeer = new Beer({
            //         name: faker.name.lastName(),
            //         brewery: faker.company.companyName(),
            //         category: new mongoose.Types.ObjectId(),
            //         style: new mongoose.Types.ObjectId(),
            //         reviews: []
            //     });
            //     newBeer.save((err, newBeer) => {
            //         return chai.request(app)
            //             .get(`/beers/${newBeer._id}`)
            //             .send(newBeer)
            //             .end((err, res) => {
            //                 res.should.have.status(200);
            //                 res.body.should.be.a('object');
            //                 res.body.should.have.property('name');
            //                 res.body.should.have.property('brewery');
            //                 res.body.should.have.property('category');
            //                 res.body.should.have.property('style');
            //                 res.body.should.have.property('reviews');
            //                 res.body.should.have.property('_id').equal(newBeer._id.toString());
            //             done();
            //             });       
            //     });
            // });

            //  it("should return a specific user", function (done) {
            //     const newUser = new User({
            //         userName: faker.internet.userName(),
            //         password: faker.internet.password()
            //     });
            //     newUser.save((err, newUser) => {
            //         return chai.request(app)
            //         .get(`/users/${newUser._id}`)
            //         .send(newUser)
            //         .end((err, res) => {
            //             res.should.have.status(200);
            //             res.body.should.be.a('object');
            //             res.body.should.have.property('userName');
            //             res.body.should.have.property('id').equal(newUser._id.toString());
            //         done();
            //         });
            //     });
            // });
                    
            // it("should return a specific review", function (done) {
            //     const newReview = new Review({
            //         beer: new mongoose.Types.ObjectId(),
            //         haveAnother: faker.random.boolean(),
            //         comment: faker.lorem.sentences(),
            //         user: new mongoose.Types.ObjectId(),
            //     });
            //     newReview.save((err, newReview) => {
            //         return chai.request(app)
            //         .get(`/reviews/${newReview._id}`)
            //         .send(newReview)
            //         .end((err, res) => {
            //             res.should.have.status(200);
            //             res.body.should.be.a('object');
            //             res.body.should.have.property('beer');
            //             res.body.should.have.property('comment');
            //             res.body.should.have.property('haveAnother');
            //             res.body.should.have.property('user');
            //             res.body.should.have.property('_id').eql(newReview._id.toString());
            //         done();
            //         });
            //     });
            // });
    // });


    describe('POST Endpoint', function() {
       
        // it('should POST a new user', function() {
        //     const newUser = new User({
        //         userName: faker.internet.userName(),
        //         password: faker.internet.password()
        //     });

        //     return chai.request(app)
        //     .post('/users/')
        //     .send(newUser)
        //     .then((res) => {
        //         res.should.have.status(201);
        //         res.should.be.json;
        //         res.body.should.be.a('object');
        //         res.body.should.include.keys('userName', 'password');
        //         res.body._id.should.not.be.null;
        //         res.body.userName.should.equal(newUser.userName);
        //         res.body.password.should.equal(newUser.password);
        //         return User.findById(res.body._id);
        //     })
        //     .then((user) => {
        //         user.userName.should.equal(newUser.userName);
        //         user.password.should.equal(newUser.password);
        //     });
        // });

        // it('should POST a new Beer', function() {
        //     const newBeer = new Beer({
        //         name: faker.name.lastName(),
        //         brewery: faker.company.companyName(),
        //         category: new mongoose.Types.ObjectId(),
        //         style: new mongoose.Types.ObjectId(),
        //         reviews: []
        //     });
        //     return chai.request(app)
        //         .post('/beers/')
        //         .send(newBeer)
        //         .then(function (res) {
        //             // console.log(res.body);
        //             res.should.have.status(201);
        //             res.should.be.json;
        //             res.body.should.be.a('object');
        //             res.body.should.include.keys('_id', 'name', 'brewery', 'category', 'style', 'reviews');
        //             res.body._id.should.not.be.null;
        //             res.body.name.should.equal(newBeer.name);
        //             res.body.brewery.should.equal(newBeer.brewery);
        //             res.body.category.should.equal(newBeer.category.toString());
        //             res.body.style.should.equal(newBeer.style.toString());
        //             res.body.reviews.should.be.an('array');
        //             res.body.reviews.length.should.equal(newBeer.reviews.length);
        //         });
        // });

            it('should post a new Review', function() {
                const testReview = new Review({
                    beer: new mongoose.Types.ObjectId(),
                    haveAnother: faker.random.boolean(),
                    comment: faker.lorem.sentences(),
                    user: new mongoose.Types.ObjectId()
                });
                console.log(newReview);
                return chai.request(app)
                    .post('/reviews/')
                    .send(newReview)
                    .then(function (res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.include.keys('_id', 'beer', 'haveAnother', 'comment', 'user');
                        res.body._id.should.not.be.null;
                        res.body.beer.should.equal(newReview.beer_id);
                        res.body.haveAnother.should.equal(newReview.haveAnother);
                        res.body.comment.should.equal(newReview.comment);
                        res.body.user.should.equal(newReview.user_id);
                        
                        // res.body.reviews.length.should.equal(newBeer.reviews.length);
                    });
            });

    });

});