let state = {
    MOCK_REVIEWS: {
        'beerReviews': [{
                beerName: 'Heady Topper',
                breweryName: 'Alchemist',
                beerStyle: 'Double IPA',
                beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                haveAnother: 'Ill have another!',
                user: 'btan579',
                reviewID: 111
            },
            {
                beerName: 'IPA',
                breweryName: 'Harpoon',
                beerStyle: 'IPA',
                beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                haveAnother: 'Ill have another!',
                user: 'brian79',
                reviewID: 1112
            },
            {
                beerName: 'Boston Lager',
                breweryName: 'Sam Adams',
                beerStyle: 'Lager',
                beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                haveAnother: 'Ill have another!',
                user: 'btan579',
                reviewID: 1113
            }, {
                beerName: 'Alter Ego',
                breweryName: 'Tree house',
                beerStyle: 'American IPA',
                beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                haveAnother: 'Ill have another!',
                user: 'paul9',
                reviewID: 1114
            },
            {
                beerName: 'Sip of Sunshine ',
                breweryName: 'Lawsons Finest',
                beerStyle: 'IPA',
                beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                haveAnother: 'Nah',
                user: 'mom',
                reviewID: 1115
            }
        ]
    },

    MOCK_USERS: [
        {
            id: "111",
            username: 'btan579',
            password: 'password1'
        },
        {
            id: "222",
            username: 'brian79',
            password: 'password2'
        },
        {
            id: "333",
            username: 'paul9',
            password: 'password3'
        },
        {
            id: "444",
            username: 'mom1',
            password: 'password4'
        },
        {
            id: "555",
            username: 'beerfan1',
            password: 'password5'
        }
    ],

    reviews: {}
};

const App = {
    signupUser: function(username, password) {
        $.ajax({
            method: "POST",
            url: "/api/user/register",
            contentType: "application/json",
            data: JSON.stringify({username: username, password: password})
        })
        .done(function (result) {
            HTMLRenderer.showSection(".home");
        })
    },

    getBeerReviews: (callbackFn) => {
        setTimeout(function () {
            callbackFn(state.MOCK_REVIEWS)
        }, 1);

    },
// Display All Reviews   
   

    getAndDisplayBeerReviews: () => {
         App.getBeerReviews(App.displayBeerReviews);
    }
};

$(function () {
    App.getAndDisplayBeerReviews();
    EventListeners.startListeners();
});

const HTMLRenderer = {
 showSection: function (sectionToShow) {
     const sections = [".landing", ".form-signup-cont", "form-login-cont", ".beer-review", ".home"];
     sections.forEach(function (item, index) {
         $(item).addClass("hidden");
     });
     $(sectionToShow).removeClass("hidden");
 },

  displayBeerReviews: (data) => {
      for (let i = 0; i < data.beerReviews.length; i++) {
          $('.home').append('<p>' + data.beerReviews[i].beerName + '</p>');
          $('.home').append('<p>' + data.beerReviews[i].breweryName + '</p>');
          $('.home').append('<p>' + data.beerReviews[i].beerStyle + '</p>');
          $('.home').append('<p>' + data.beerReviews[i].beerDescrip + '</p>');
          $('.home').append('<p>' + data.beerReviews[i].haveAnother + '</p>');
          $('.home').append('<p>' + data.beerReviews[i].user + '</p>');
      }

  }

};

const EventListeners = {
    listenersStarted: false,

    startListeners: function () {
        if (!this.listenersStarted) {
            this.reviewSubmit();
            this.handleSignUpLink();
            this.handleSignUpSubmit();
            this.handleLoginLink();
            this.listenersStarted = true;
        }
    },
 // Submit new review 

    newReviewClick: function () {
        $(".side-bar-button new-revew").on("click", function () {
            event.preventDefault();
            $(".beer-review").removeClass("hidden");
            $(".home").addClass("hidden");
        });
    },
    reviewSubmit: function () {
        $(".beer-form").submit(function (event) {
            event.preventDefault();
            const beerInput = $(this).find("#beer-name").val();
            const breweryInput = $(this).find("#brewery").val();
            const beerStyleInput = $(this).find("#beer-style").val();
            const beerDescriptionInput = $(this).find("#beer-description").val();
            const haveAnotherInput = $(this).find("#have-another").val();
            const notHaveAnotherInput = $(this).find("#not-another").val();

            let haveAnotherchecked;
            if (haveAnotherInput.checked = true) {
                haveAnotherchecked = "I'll Have another!";
            } else {
                haveAnotherchecked = 'Nah';
            }
// Generate Review ID
            const newPostID = Math.random().toString(36).substr(2, 16);
// New Review Schema  
            const newBeerReview = {
                beerName: beerInput,
                breweryName: breweryInput,
                beerStyle: beerStyleInput,
                beerDescrip: beerDescriptionInput,
                haveAnother: haveAnotherchecked,
                user: 'user',
                reviewID: newPostID
            };
            state.MOCK_REVIEWS.beerReviews.push(newBeerReview);
             $(".beer-review").addClass("hidden");
             $(".home").removeClass("hidden");
        });
    },
    
    handleSignUpLink: function () {
        $(".register-link").on("click", function () {
            $(".form-signup-cont").removeClass("hidden");
            $(".landing").addClass("hidden");
        });
    },

    handleLoginLink: function () {
        $(".login-link").on("click", function (event) {
            $(".form-login-cont").removeClass("hidden");
            $(".landing").addClass("hidden");
        });
    },

    handleSignUpSubmit: function () {
        $(".form-signup").submit(function (event) {
            event.preventDefault();  
            const newUserName = $(this).find(".form-signup_username").val();
            const newPassword = $(this).find(".form-signup_password").val();
            const newUserID = Math.random().toString(36).substr(2, 16);

            const newUser = {
                id: newUserID,
                username: newUserName,
                password: newPassword
            };
            state.MOCK_USERS.push(newUser);
        });
        
        $(".home").removeClass("hidden");
        $(".form-signup-cont").addClass("hidden");
    }

    // handleLoginSubmit: function () {

    // }

};


// const App = {

//     // reviews: {},

//     // getBeerReviews: (callbackFn) => {
//     //     setTimeout(function(){ callbackFn(MOCK_REVIEWS)}, 1);

//     // },

//     // displayBeerReviews: data => {
//     //          for (index in data.beerReviews) {
//     //              $('.home').append('<p>' + data.beerReviews[index] + '</p>');
//     //          }

//     // },

//     // getAndDisplayBeerReviews: () => {

//     //     getBeerReviews(displayBeerReviews);
//     // },



//     // createReview: () => {

//     //     let newReview = `
//     //     ${newBeerReviews.beerName}
//     //     ${newBeerReviews.breweryName}
//     //     ${newBeerReviews.beerStyle}
//     //      ${newBeerReviews.beerDescrip}
//     //      ${newBeerReviews.user}
//     //    `;

//     //     App.reviews.push(newReview);
//     //     return newReview;


//     // },



// };


// const newBeerReviews = {
//     beerName: 'Heady Topper',
//     breweryName: 'Alchemist',
//     beerStyle: 'Double IPA',
//     beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     haveAnother: 'Ill have another!',
//     user: 'btan579',
//     reviewID: ''
// };


// const HTMLRenderer = {


// };

// const EventListeners = {

// };





//  currentUser: {},


//  signUpUser: function (username, password) {
//      MOCK_NEW_USERS.push({
//              username: username,
//              password: password
//          })
//          .done(function (result) {
//              HTMLRenderer.showSection(".form-login");
//          })
//          .fail(function () {
//              HTMLRenderer.showAlert(".alert-signup");
//          })
//  },

//  loginUser: function (username, password) {
//      MOCK_USERS.push({
//              username: username,
//              password: password
//          })
//          .done(function (result) {
//              const {
//                  authToken
//              } = result;
//              localStorage.setItem("token", authToken);
//              App.currentUser = username;
//              HTMLRenderer.displayUserInfo(App.currentUser);
//              HTMLRenderer.showSpecificElement(".logout");
//              HTMLRenderer.hideSpecificElement(".form-login");
//              HTMLRenderer.showElement(".logged-in");
//              HTMLRenderer.hideElement(".login");
//              HTMLRenderer.showElement(".logout");
//          })
//          .fail(function () {
//              HTMLRenderer.showError("Incorrect username/password")
//          });
//  },

//  logoutUser: function () {
//      localStorage.removeItem("token");
//  }



// User Sign up page
// User enters valid username/password

// User enters valid username but no password

// User enters no username or password

// User enters password but no username

// User enters username already in use

// User enters username less than 5 characters

// User enters password less than 5 characters

//  signUpUser: function (username, password) {
//      $.ajax({
//          method: "POST",
//          url: "/api/auth/signup",
//          contentType: "application/json",
//          data: JSON.stringify({
//              username: username,
//              password: password
//          })
//      })
//      .done(function (result) {
//          showSection(".form-login");
//          })
//      .fail(function () {
//          showAlert(".alert-signup");
//          });
//  },


// Login page

// User enters valid username/password

// User enters invalid username/password

// User no username/password

// User enters valid username/ no password

// User enters no username/valid password
// loginUser: function(username, password) {
//     $.ajax({
//         method: "POST",
//         url: "/api/auth/login",
//         contentType: "application/json",
//         data: JSON.stringify({
//             username: username,
//             password: password
//         })
//     })
//     .done(function (result) {
//             HTMLRenderer.showSectidasdon(".form-login");
//         })
//         .fail(function () {
//             HTMLRenderer.showError("Incorrect username/password");
//         });
// }











// var MOCK_USER_SCHEMA = {
//     'users': [{
//             username: 'btan579',
//             userPassword: 'password1'
//         },
//         {
//             username: 'brian79',
//             userPassword: 'password2'
//         },
//         {
//             username: 'paul9',
//             userPassword: 'password3'
//         },
//         {
//             username: 'mom',
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
//              '<p>' + data.users[index].username + '</p>');
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
// //                     "username": {
// //                         "type": "string",
// //                         "unique": true,
// //                         "faker": "internet.username"
// //                     },
// //                     "userPassword": {
// //                         "type": "string",
// //                         "faker": "internet.password"

// //                 }
// //             },
// //                 "required": ["id", "username", "userPassword", "email"]
// //             }
// //         }
// //     },
// //     "required": ["users"]
// // };

// // function

// // module.exports = schema;

// // var USER_SCHEMA = {
// //         "username": {
// //             type: 'string',
// //             unique: true
// //         },
// //         "userPassword": 'string'
// //     };