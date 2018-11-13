function seedBeerData() {
    const seedData = [{
            "reviews": [],
            "name": "Kentucky Brunch Brand Stout",
            "brewery": "Toppling Goliath",
            "category": "5ba6d4080812ed470102ab40",
            "style": "5ba6c5637deaad1410cb55f2",
        },
        {
            "reviews": [],
            "name": "Marshmallow Handjee",
            "brewery": "3 Floyds",
            "category": "5ba6d4080812ed470102ab40",
            "style": "5bd638f8c9e0a26aac9e0d70",
        },
        {
            "reviews": [],
            "name": "Barrel-Aged Abraxas",
            "brewery": "Perennial Artisan Ales",
            "category": "5ba6d4080812ed470102ab40",
            "style": "5ba6c5637deaad1410cb55f2",

        },
        {
            "reviews": [],
            "name": "King Julius",
            "brewery": "Tree House",
            "category": "5ba6d4080812ed470102ab42",
            "style": "5ba705a9ac95c72aa4e0ec58",
        },
        {
            "reviews": [],
            "name": "Pliny The Younger",
            "brewery": "Russian River",
            "category": "5bd63aabc9e0a26aac9e0d74",
            "style": "5ba6c5637deaad1410cb55f2",

        },
        {
            "reviews": [],
            "name": "Very Green",
            "brewery": "Tree House",
            "category": "5ba6d4080812ed470102ab23",
            "style": "5ba705a9ac95c72aa4e0ec58",

        },
        {
            "reviews": [],
            "name": "Fundamental Observation",
            "brewery": "Bottle Logic",
            "category": "5ba6d4080812ed470102ab40",
            "style": "5ba6c5637deaad1410cb55f2",

        },
        {
            "reviews": [],
            "name": "India Pale Ale",
            "brewery": "Harpoon",
            "category": "5ba6d4080812ed470102ab42",
            "style": "5ba6c6a97deaad1410cb5606",

        },
        {
            "reviews": [],
            "name": "Boston Lager",
            "brewery": "Sam Adams",
            "category": "5ba6d4080812ed470102ab49",
            "style": "5ba6c6a97deaad1410cb5606",

        },
        {
            "reviews": [],
            "name": "Alter Ego",
            "brewery": "Tree house",
            "category": "5ba6d4080812ed470102ab42",
            "style": "5ba6c5637deaad1410cb55f2",

        },
        {
            "reviews": [],
            "name": "Sip of Sunshine",
            "brewery": "Lawsons Finest",
            "category": "5ba6d4080812ed470102ab42",
            "style": "5ba705a9ac95c72aa4e0ec58",

        },
        {
            "reviews": [],
            "name": "Heady Topper",
            "brewery": "Alchemist",
            "category": "5ba6d4080812ed470102ab23",
            "style": "5ba705a9ac95c72aa4e0ec58",

        },
        {
            "reviews": [],
            "name": "Pumpkin",
            "brewery": "UFO",
            "category": "5bb97482a1ba6549ccf4d2f8",
            "style": "5bb97557a1ba6549ccf4d2f9",

        },
        {
            "reviews": [],
            "name": "Pumpkinhead",
            "brewery": "Shipyard",
            "category": "5bb97482a1ba6549ccf4d2f8",
            "style": "5bb97557a1ba6549ccf4d2f9",

        },
        {
            "reviews": [],
            "name": "Back in Black",
            "brewery": "21st Amendment",
            "category": "5ba6d4080812ed470102ab42",
            "style": "5bbbba87d0dddc3e10cd6e9f",
        }
    ];
    return Beer.insertMany(seedData);
}

function seedReviewData() {
    const seedData = [
        /* 1 */
        {
            "beer": "5bd63a26c9e0a26aac9e0d73",
            "haveAnother": true,
            "comment": "So hoppy!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 2 */
        {
            "beer": "5bd63abbc9e0a26aac9e0d75",
            "haveAnother": true,
            "comment": "So hoppy!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 3 */
        {
            "beer": "5bd63b3fc9e0a26aac9e0d76",
            "haveAnother": true,
            "comment": "So hoppy!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 4 */
        {
            "beer": "5bd63e28c9e0a26aac9e0d7b",
            "haveAnother": true,
            "comment": "So hoppy!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 5 */
        {
            "beer": "5bd63e5ac9e0a26aac9e0d7d",
            "haveAnother": true,
            "comment": "So hoppy!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 6 */
        {
            "beer": "5bd63a26c9e0a26aac9e0d73",
            "haveAnother": true,
            "comment": "So hoppy!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 7 */
        {
            "beer": "5bd63ec3c9e0a26aac9e0d81",
            "haveAnother": true,
            "comment": "There needs to be more beer like this!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 8 */
        {
            "beer": "5bd63eacc9e0a26aac9e0d80",
            "haveAnother": true,
            "comment": "My favorite pumpkin beer!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 9 */
        {
            "beer": "5ba6e9c0c79f231224fe0f6f",
            "haveAnother": true,
            "comment": "My favorite pumpkin beer!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 10 */
        {
            "beer": "5bd63eacc9e0a26aac9e0d80",
            "haveAnother": true,
            "comment": "My favorite pumpkin beer!",
            "user": "5ba6e9c0c79f231224fe0f6f"

        },

        /* 11 */
        {
            "beer": "5bd63eacc9e0a26aac9e0d80",
            "haveAnother": false,
            "comment": "Pumpkin beer is gross!",
            "user": "5bd7a91d1ad4f431386d31b5"

        },

        /* 12 */
        {
            "beer": "5bd63eacc9e0a26aac9e0d80",
            "haveAnother": true,
            "comment": "Pumpkin beer is okay",
            "user": "5bd7a93a1ad4f431386d31b6"

        },

        /* 13 */
        {
            "beer": "5bd63e7fc9e0a26aac9e0d7f",
            "haveAnother": true,
            "comment": "In the running for favorite pumpkin beer",
            "user": "5bd7a93a1ad4f431386d31b6"

        },

        /* 14 */
        {
            "beer": "5bd63e7fc9e0a26aac9e0d7f",
            "haveAnother": true,
            "comment": "I'll drink anything UFO brews",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 15 */
        {
            "beer": "5bd63dd2c9e0a26aac9e0d7a",
            "haveAnother": true,
            "comment": "I almost want to love this beer",
            "user": "5ba6e9c0c79f231224fe0f6f"

        },

        /* 16 */
        {
            "beer": "5bd63d96c9e0a26aac9e0d79",
            "haveAnother": false,
            "comment": "Not as good as it should be",
            "user": "5ba6e9c0c79f231224fe0f6f"

        },

        /* 17 */
        {
            "beer": "5bd63d96c9e0a26aac9e0d79",
            "haveAnother": true,
            "comment": "Hard to find in MA =)",
            "user": "5bd7a93a1ad4f431386d31b6"

        },

        /* 18 */
        {
            "beer": "5bd63d3bc9e0a26aac9e0d78",
            "haveAnother": true,
            "comment": "My got to IPA",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 19 */
        {
            "beer": "5bd63898c9e0a26aac9e0d6f",
            "haveAnother": true,
            "comment": "Thats some stout!",
            "user": "5ba6e716e8241829201dcc22"

        },

        /* 20 */
        {

            "beer": "5bd7a91d1ad4f431386d31b5",
            "haveAnother": true,
            "comment": "Had a sample of this, sad I can't get it all the time",
            "user": "5bd7a91d1ad4f431386d31b5"

        },

        /* 21 */
        {

            "beer": "5bd63d96c9e0a26aac9e0d79",
            "haveAnother": true,
            "comment": "Hard to find in MA =)",
            "user": "5bd7a93a1ad4f431386d31b6"

        }
    ];
    return Review.insertMany(seedData);
}


it("should return a specific review", function () {
    let reviews;
    return Review
        .findOne()
        .then(function (_reviews) {
            reviews = _reviews;
            return chai.request(app).get(`/reviews/${reviews.id}`);
        })
        .then(function (res) {
            res.should.have.status(200);
            return Review.findById(reviews.id);
        });
});

it('should return Beer with right fields', function () {
    let resBeers;
    return chai.request(app)
        .get('/beers/')
        .then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.beers.should.be.an('array');

            res.body.beers.forEach(function (review) {
                review.should.be.a('object');
                review.should.include.keys('_id', 'name', 'brewery', 'category', 'style', 'reviews');
            });
            resBeers = res.body.beers[0];

            return Beer.findById(resBeers._id);
        })
        .then(beer => {
            resBeers._id.should.equal(beer._id.toString());
            resBeers.name.should.equal(beer.name);
            resBeers.brewery.should.equal(beer.brewery);
            resBeers.category.should.equal(beer.category._id.toString());
            resBeers.style.should.equal(beer.style._id.toString());
            resBeers.reviews.should.eql(beer.reviews);
        });
});

it("should return all beers", function () {
    let res;
    return chai.request(app)
        .get('/beers/')
        .then(_res => {
            res = _res;
            res.should.have.status(200);
            res.should.be.json;
            res.body.beers.should.have.lengthOf.at.least(1);

            return Beer.countDocuments();
        })
        .then(count => {
            res.body.beers.should.have.lengthOf(count);
        });
});

it('should return Beer with right fields', function () {
    let resBeers;
    return chai.request(app)
        .get('/beers/')
        .then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.beers.should.be.an('array');

            res.body.beers.forEach(function (review) {
                review.should.be.a('object');
                review.should.include.keys('_id', 'name', 'brewery', 'category', 'style', 'reviews');
            });
            resBeers = res.body.beers[0];

            return Beer.findById(resBeers._id);
        })
        .then(beer => {
            resBeers._id.should.equal(beer._id.toString());
            resBeers.name.should.equal(beer.name);
            resBeers.brewery.should.equal(beer.brewery);
            resBeers.category.should.equal(beer.category._id.toString());
            resBeers.style.should.equal(beer.style._id.toString());
            resBeers.reviews.should.eql(beer.reviews);
        });
});


it("should return a specific beer", function () {
    let beers;
    return Beer
        .findOne()
        .then(function (_beers) {
            beers = _beers;
            return chai.request(app).get(`/beers/${beers._id}`);
        })
        .then(function (res) {
            res.should.have.status(200);
            return Beer.findById(beers._id);
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

it('should return Style with right fields', function () {
    let resStyles;
    return chai.request(app)
        .get('/styles/')
        .then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.styles.should.be.an('array');

            res.body.styles.forEach(function (style) {
                style.should.be.a('object');
                style.should.include.keys('_id', 'name');
            });
            resStyles = res.body.styles[0];

            return Style.findById(resStyles._id);
        })
        .then(style => {
            resStyles._id.should.equal(style._id.toString());
            resStyles.name.should.equal(style.name);
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

it('should return Category with right fields', function () {
    let resCategories;
    return chai.request(app)
        .get('/categories/')
        .then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.categorys.should.be.an('array');

            res.body.categorys.forEach(function (category) {
                category.should.be.a('object');
                category.should.include.keys('_id', 'name');
            });
            resCategories = res.body.categorys[0];

            return Category.findById(resCategories._id);
        })
        .then(category => {
            resCategories._id.should.equal(category._id.toString());
            resCategories.name.should.equal(category.name);
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
            res.body.should.have.lengthOf.at.least(1);

            return User.countDocuments();
        })
        .then(count => {
            res.body.should.have.lengthOf(count);
        });
});

it('should return User with right fields', function () {
    let resUsers;
    return chai.request(app)
        .get('/users/')
        .then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');

            res.body.forEach(function (user) {
                user.should.be.a('object');
                user.should.include.keys('id', 'userName', 'password');
            });
            resUsers = res.body[0];

            return User.findById(resUsers.id);
        })
        .then(user => {
            resUsers.id.should.equal(user.id.toString());
            resUsers.userName.should.equal(user.userName);
            resUsers.password.should.equal(user.password);
        });
});


//  it("should return a specific user", function () {
//      let users;
//      return User
//          .findOne()
//          .then(function (_users) {
//              users = _users;
//              return chai.request(app).get(`/users/${users.id}`);
//          })
//          .then(function (res) {
//              res.should.have.status(200);
//              return User.findById(users.id);
//          });
//  });