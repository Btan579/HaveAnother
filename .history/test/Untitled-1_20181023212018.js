
function seedDb() {
    for (var i = 0; i < 10; i++){
        seedCategoriesData();
        seedStylesData();
    }
    seedBeerData();
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

function getRandomStyle() {
    let style = new Style();
    Style.find().exec()
        .then(styles => {
            style = styles[Math.floor(Math.random() * styles.length)];
        });
    return style;
}

function getRandomCategory() {
    let category = new Category();
    Category.find().exec()
        .then(categories => {
            category = categories[Math.floor(Math.random() * categories.length)];
        });
    return category;
}

function seedBeerData() {
    return Category.find().exec().
    
    then(categories => {
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < 5; j++) {
                let newExcercise = new Excercise({});
                seedExcercise(users[i]._id, newExcercise);
            }
        }
    })
}



function seedDatabase() {
    for (var j = 0; j < 20; j++) {
        seedUser();
    }

    seedExcercises();
}

function seedUser() {
    return User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName()
    });
}

function seedExcercises() {
    return User.find().exec().
    then(users => {
        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < 5; j++) {
                let newExcercise = new Excercise({});
                seedExcercise(users[i]._id, newExcercise);
            }
        }
    })
}

function seedExcercise(userId, excercise) {
    return Excercise.create({
        day: faker.lorem.text(),
        muscleGroup: faker.lorem.text(),
        muscle: faker.lorem.text(),
        name: faker.lorem.text(),
        weight: faker.lorem.number(),
        sets: faker.lorem.number(),
        reps: faker.lorem.number()
        user: userId
    });
}