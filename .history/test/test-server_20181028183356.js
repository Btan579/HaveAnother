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
const seedUserData = new Promise((resolve, reject) => {
    let users = [];
    for (var i = 1; i < 10; i++) {
        let user = new User({
            userName: faker.internet.userName(),
            password: faker.internet.password()
        });
        users.push(user);
    }
    User.insertMany(users);
});


const seedCategoriesData = new Promise((resolve, reject) => {
    let categories = [];
    for (var i = 1; i < 10; i++) {
        let category = new Category({
            name: faker.lorem.word() + "Category"
        });
        categories.push(category);
    }
    Category.insertMany(categories);
});

const seedStylesData = new Promise((resolve, reject) => {
    let styles = [];
    for (var i = 1; i < 10; i++) {
        let style = new Style({
            name: faker.lorem.word() + "Style"
        });
        styles.push(style);
    }
    Style.insertMany(styles);
});

const seedBeerData = new Promise((resolve, reject) => {  
        let beers = [];
        for (var i = 1; i < 10; i++) {
            let beer = new Beer({
                name: faker.name.lastName(),
                brewery: faker.company.companyName(),
                category: getRandomCategory()._id,
                style: getRandomStyle()._id,
                reviews: []
            });
            beers.push(beer);
        }
        Beer.insertMany(beers);
});
   

const seedReviewData = new Promise((resolve, reject) => {
    setTimeout(function () {
        console.info('seeding beer review data');
        for (let i = 0; i < 10; i++) {
            createReviewSeed(getRandomBeer());
        }
    }, 7000);
})


function seedDb() {
    seedUserData
        .then(() => {
            seedCategoriesData();
        })
        .then(() => {
            seedStylesData();
        })
        .then(() => {
            seedBeerData();
        })
        .then(() => {
            seedReviewData();
        })
        .catch(err => {
            console.log(err);
        });
}

function getRandomStyle() {
    return Style.find()
        .then(styles => {
            return styles[Math.floor(Math.random() * styles.length)];
        });
}

function getRandomCategory() {
    return Category.find()
        .then(categories => {
            return categories[Math.floor(Math.random() * categories.length)];
        });
}

function getRandomBeer() {
    return Beer.find()
        .then(beers => {
            return beers[Math.floor(Math.random() * beers.length)];
        });
}

function getRandomUser() {
    return User.find()
        .then(users => {
            return users[Math.floor(Math.random() * users.length)];
        });

}
function getRandomUser() {
    return User.find()
        .then(users => {
            return users[Math.floor(Math.random() * users.length)];
        });
}

function createReviewSeed(beer) {
    // console.log(beer);
    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        // beer: beer._id,
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





// const usersPromise = new Promise((resolve, reject) => {
//     function seedUserData(){
//         let users = [];
//         for (var i = 0; i <= 10; i++) {
//             let user = new User({
//                 userName: faker.internet.userName(),
//                 password: faker.internet.password()
//             });
//             users.push(user);
//         }
//         User.insertMany(users);
//     }
//     resolve(seedUserData());
// });


// const categoriesPromise = new Promise((resolve, reject) => {
//     function seedCategoriesData() {
//         let categories = [];
//         for (var i = 0; i <= 10; i++) {
//             let category = Category({
//                 name: faker.lorem.word() + "Category"
//             });
//             categories.push(category);
//         }
//         Category.insertMany(categories);
//     }
//     resolve(seedCategoriesData());
// });

// const stylesPromise = new Promise((resolve, reject) => {
//     function seedStylesData() {
//         let styles = [];
//         for (var i = 0; i <= 10; i++) {
//             let style = Style({
//                 name: faker.lorem.word() + "Style"
//             });
//             styles.push(style);
//         }
//         Style.insertMany(styles);
//     }
//     resolve(seedStylesData());
// });
// const seedBeerData = new Promise((resolve, reject) => {
//     let beers = [];
//     for (var i = 1; i < 10; i++) {
//         let beer =  new Beer({
//             name: faker.name.lastName(),
//             brewery: faker.company.companyName(),
//             category: getRandomCategory()._id,
//             style: getRandomStyle()._id,
//             reviews: []
//         });
//         beers.push(beer);
//     }
//     Beer.insertMany(beers);
// });

// function seedBeerData() {
//     return Beer.create({
//         name: faker.name.lastName(),
//         brewery: faker.company.companyName(),
//         category: getRandomCategory()._id,
//         style: getRandomStyle()._id,
//         reviews: []
//     });
// }
// function seedDb() {
   
// }

// function seedCategoriesData() {
//     return Category.create({
//         name: faker.lorem.word() + "Category"
//     }).then();
// }

// function seedStylesData() {
//     return Style.create({
//         name: faker.lorem.word() + "Style"
//     }).then();
// }

// function seedUserData() {
//     return User.create({
//         userName: faker.internet.userName(),
//         password: faker.internet.password()
//     }).then();

// }

// function getRandomStyle() {
//     return Style.find()
//         .then(styles => {
//             return styles[Math.floor(Math.random() * styles.length)];
//         });
// }

// function getRandomCategory() {
//     return Category.find()
//         .then(categories => {
//             return categories[Math.floor(Math.random() * categories.length)];
//         });
// }

// function getRandomUser() {
//     return User.find()
//         .then(users => {
//             return users[Math.floor(Math.random() * users.length)];
//         });
// }

// function seedBeerData() {
//     return Beer.create({
//         name: faker.name.lastName(),
//         brewery: faker.company.companyName(),
//         category: getRandomCategory()._id,
//         style: getRandomStyle()._id,
//         reviews: []
//     });
// }

// function getRandomBeer() {
//     return Beer.find()
//         .then(beers => {
//             return beers[Math.floor(Math.random() * beers.length)];
//         });
// }

// function createReviewSeed(beer) {
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

// }

// function seedReviewData() {
//     console.info('seeding beer review data');
//     for (let k = 0; k < 10; k++) {
//         createReviewSeed(getRandomBeer());
//     }
// }
