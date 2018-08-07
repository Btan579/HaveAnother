// User Sign up page
// User enters valid username/password

// User enters valid username but no password

// User enters no username or password

// User enters password but no username

// User enters username already in use

// User enters username less than 5 characters

// User enters password less than 5 characters





// Login page

// User enters valid username/password

// User enters invalid username/password

// User no username/password

// User enters valid username/ no password

// User enters no username/valid password










// var MOCK_USER_SCHEMA = {
//     'users': [{
//             userName: 'btan579',
//             userPassword: 'password1'
//         },
//         {
//             userName: 'brian79',
//             userPassword: 'password2'
//         },
//         {
//             userName: 'paul9',
//             userPassword: 'password3'
//         },
//         {
//             userName: 'mom',
//             userPassword: 'password4'
//         }
//     ]
// };

// function getUsers(callbackFn) {
//     setTimeout(function(){  callbackFn(MOCK_USER_SCHEMA)}, 2);
// }

// function display userNamesTaken(data) {
//      for (index in data.users) {
//          $('body').append(
//              '<p>' + data.users[index].userName + '</p>');
//      }
// }


// // Get and Display reviews
// var MOCK_REVIEW_SCHEMA = {
//     'beerReviews': [{
//             beerName: 'Heady Topper',
//             breweryName: 'Alchemist',
//             beerStyle: 'Double IPA',
//             beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//             haveAnother: 'Ill have another!',
//             user: 'btan579',
//             reviewID: 111
//         },
//         {
//             beerName: 'IPA',
//             breweryName: 'Harpoon',
//             beerStyle: 'IPA',
//             beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//             haveAnother: 'Ill have another!',
//             user: 'brian79',
//             reviewID: 1112
//         },
//         {
//             beerName: 'Boston Lager',
//             breweryName: 'Sam Adams',
//             beerStyle: 'Lager',
//             beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//             haveAnother: 'Ill have another!',
//             user: 'btan579',
//             reviewID: 1113
//         }, {
//             beerName: 'Alter Ego',
//             breweryName: 'Tree house',
//             beerStyle: 'American IPA',
//             beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//             haveAnother: 'Ill have another!',
//             user: 'paul9',
//             reviewID: 1114
//         },
//         {
//             beerName: 'Sip of Sunshine ',
//             breweryName: 'Lawsons Finest',
//             beerStyle: 'IPA',
//             beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//             haveAnother: 'Nah',
//             user: 'mom',
//             reviewID: 1115
//         }
//     ]
// };


// function getBeerReviews(callbackFn) {
//     setTimeout(function () {
//         callbackFn(MOCK_REVIEW_SCHEMA)
//     }, 1);
// }

// function displayBeerReviews(data) {
//     for (index in data.beerReviews) {
//         $('body').append('<p>' + data.beerReviews[index].user + '</p>');
//         $('body').append('<p>' + data.beerReviews[index].beerName + '</p>');
//         $('body').append('<p>' + data.beerReviews[index].breweryName + '</p>');
//         $('body').append('<p>' + data.beerReviews[index].beerStyle + '</p>');
//         $('body').append('<p>' + data.beerReviews[index].beerDescrip + '</p>');
//         $('body').append('<p>' + data.beerReviews[index].haveAnother + '</p>');
//         $('body').append('<p>' + data.beerReviews[index].user + '</p>');

//     }
// }

// function getAndDisplayBeerReviews() {
//     getBeerReviews(displayBeerReviews);

// }

// $(function () {
//     getAndDisplayBeerReviews();

// })




// var MOCK_BEER_STYLE = {
//     'beer styles': [
        
//     ]
// }


// // // Create user DB



// // var userSchema = {
// //     "type": "object",
// //     "properties": {
// //         "users": {
// //             "type": "array",
// //             "minItems": 3,
// //             "maxItems": 10,
// //             "items": {
// //                 "type": "object",
// //                 "properties": {
// //                     "id": {
// //                         "type": "number",
// //                         "unique": true,
// //                         "minimum": 1
// //                     },
// //                     "userName": {
// //                         "type": "string",
// //                         "unique": true,
// //                         "faker": "internet.userName"
// //                     },
// //                     "userPassword": {
// //                         "type": "string",
// //                         "faker": "internet.password"
                    
// //                 }
// //             },
// //                 "required": ["id", "userName", "userPassword", "email"]
// //             }
// //         }
// //     },
// //     "required": ["users"]
// // };

// // function

// // module.exports = schema;

// // var USER_SCHEMA = {
// //         "userName": {
// //             type: 'string',
// //             unique: true
// //         },
// //         "userPassword": 'string'
// //     };



 