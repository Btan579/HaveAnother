function seedDb() {
    for (var i = 0; i < 10; i++) {
        seedUserData();
        seedStylesData();
        seedCategoriesData();
    }
    for (var j = 0; j < 10; j++){
        seedBeerData();
    }
    seedReviewData();
}

function seedCategoriesData() {
    return Category.create({
        name: faker.lorem.word() + "Category"
    });
}
function seedStylesData() {
    return Style.create({
        name: faker.lorem.word() + "Style"
    });
}

function seedUserData() {
        return User.create({
            userName: faker.internet.userName(),
            password: faker.internet.password()
        });

}

function getRandomStyle() {
    return Style.find().exec()
    .then(styles => {
        return styles[Math.floor(Math.random() * styles.length)];
    });
}

function getRandomCategory() {
    return Category.find().exec()
    .then(categories => {
        return categories[Math.floor(Math.random() * categories.length)];
    });
}

function seedBeerData(){
    return Beer.create({
        name: faker.name.lastName(),
        brewery: faker.company.companyName(),
        category: getRandomCategory(),
        style: getRandomStyle(),
        reviews: []
    });
}

function getRandomBeer() {
    return Beer.find().exec()
        .then(beers => {
            return beers[Math.floor(Math.random() * beers.length)];
        });
}

function createReviewSeed(beer) {
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

function seedReviewData() {
    console.info('seeding beer review data');
    for (let i = 0; i < 10; i++) {
        createReviewSeed(getRandomBeer());
    }
}
