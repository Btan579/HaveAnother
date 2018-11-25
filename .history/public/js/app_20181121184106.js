let state = {
    
    reviews: {}
};


const HTMLRenderer = {
    showSection: function (sectionToShow) {
        const sections = [".logged-status", ".submit-form", ".filtered-reviews", ".home-cont"];
        sections.forEach(function (item, index) {
            $(item).addClass("hidden");
        });
        $(sectionToShow).removeClass("hidden");

    },
    
    displayAllReviews: (data) => {
        let allReviews = [];
        console.log(data);
        // for (let i = 0; i < data.length; i++) {
        //     $('.filtered-reviews').append('<div class="container"><div class="row"><div class="col-md-5 col-md-offset-6"><div class="filtered-review"><h6>Beer name:</h6><p>' + MOCK_REVIEWS[i].beerName +
        //         '</p><h6>Brewery:</h6><p>' + data[i].breweryName +
        //         '</p><h6>Style:</h6><p>' + data[i].beerStyle +
        //         '</p><h6>Description:</h6><p>' + data[i].beerDescrip +
        //         '</p><h6>have another: </h6><p>' + data[i].haveAnother +
        //         '</p><h6>Reviewer:</h6><p>' + data[i].user + '</p></div></div></div></div>')

        // }
       
    }

    // displayBeerStyle: (data) => {

    // }

};


const EventListeners = {
    listenersStarted: false,

    startListeners: function () {
        if (!this.listenersStarted) {
            this.newReviewClick();
            this.reviewSubmit();
            this.reviewCancel();
            this.handleSignUpSubmit();
            this.handleLoginSubmit();
            this.handleSignUpLink();
            this.handleLoginLink();
            this.handleLogout();
            this.loginCancel();
            this.signupCancel();
            this.beerStyleSelect();
            this.listenersStarted = true;
        }
    },



    handleSignUpLink: function () {
        $(".register-link").on("click", function (event) {
            $(".page-heading").removeClass("hidden");
            $(".home-main").addClass("hidden");
            $(".signup-cont").removeClass("hidden");



        });
    },

    handleLoginLink: function () {
        $(".login-link").on("click", function (event) {
            $(".page-heading").removeClass("hidden");
            $(".home-main").addClass("hidden");
            $(".login-cont").removeClass("hidden");

        });
    },
    // Submit new review 

    newReviewClick: function () {
        $(".new-Review").on("click", function () {
            event.preventDefault();
            console.log("clicked");
            $(".submit-form").removeClass("hidden");
        });
    },

    reviewSubmit: function () {
        $("#form-submit").submit(function (event) {
            event.preventDefault();
            const beerInput = $(this).find("#beer-name").val();
            const breweryInput = $(this).find("#brewery").val();
            const beerStyleInput = $(this).find("#beer-style").val();
            const beerDescriptionInput = $(this).find("#beer-description").val();
            const haveAnotherInput = $(this).find("#have-another").val();
            const notHaveAnotherInput = $(this).find("#not-another").val();

            console.log(haveAnotherInput.checked = true);
            console.log(notHaveAnotherInput);
            // let haveAnotherchecked;

            if (haveAnotherInput.checked = true) {
                haveAnotherchecked = "I'll Have another!";
            } else {
                haveAnotherchecked = "Nah";
            }
            // Generate Review ID
            // const newPostID = Math.random().toString(36).substr(2, 16);
            // New Review Schema  
            const newBeerReview = {
                beerName: beerInput,
                breweryName: breweryInput,
                beerStyle: beerStyleInput,
                beerDescrip: beerDescriptionInput,
                haveAnother: haveAnotherchecked,
                user: 'user'
             };

            MOCK_REVIEWS.push(newBeerReview);
            $(".submit-form").addClass("hidden");
            App.getAndDisplayBeerReviews();
            $("#form-submit").trigger('reset');

            console.log(beerInput, breweryInput, beerStyleInput, beerDescriptionInput, haveAnotherchecked);
            console.log(MOCK_REVIEWS);
        });

    },

    reviewCancel: function () {
        $(".cancel").on("click", function () {
            $(".submit-form").addClass("hidden");

        });

    },

    signupCancel: function () {
        $("#cancel-signup").on("click", function () {
            $(".home-main").removeClass("hidden");
            $(".page-heading").addClass("hidden");
            $(".signup-cont").addClass("hidden");
            $("#form-signup").trigger('reset');
        });

    },

    loginCancel: function () {
        $("#cancel-login").on("click", function () {
            $(".page-heading").addClass("hidden");
            $(".home-main").removeClass("hidden");
            $(".login-cont").addClass("hidden");
            $("#form-login").trigger('reset');

        });

    },

    handleSignUpSubmit: function () {
        $("#form-signup").submit(function (event) {
            event.preventDefault();
            console.log("registering user");

            const newUserName = $(this).find("#user-name").val();
            const newPassword = $(this).find("#password").val();
            const newUserID = Math.random().toString(36).substr(2, 16);

            const newUser = {
                id: newUserID,
                username: newUserName,
                password: newPassword
            };

            MOCK_USERS.push(newUser);
            console.log(newUser);
            console.log(MOCK_USERS);
            $(".page-heading").addClass("hidden");
            $(".signup-cont").addClass("hidden");
            $(".home-main").removeClass("hidden");
            $(".home-cont").removeClass("hidden");
            $(".signLog").addClass("hidden");
            $(".logged-status").removeClass("hidden");
            $("#form-signup").trigger('reset');

        });


    },

    handleLoginSubmit: function () {
        $("#form-login").submit(function (event) {
            event.preventDefault();
            const loginUserName = $(this).find("#user-name").val();
            const loginPassword = $(this).find("#password").val();

            console.log(loginUserName, loginPassword);
            console.log("loggin in user");
            $(".home-cont").removeClass("hidden");
            $(".page-heading").addClass("hidden");
            $(".home-main").removeClass("hidden");
            $(".login-cont").addClass("hidden");
            $(".signLog").addClass("hidden");
            $(".logged-status").removeClass("hidden");
            $("#form-login").trigger('reset');
        });


    },

    handleLogout: function () {
        $(".logout-status").on("click", function (event) {
            console.log("logging out user");
            $(".signLog").removeClass("hidden");

        });
    },

    beerStyleSelect: function () {
        
        $('#beerDropdown').change(function () {
            
            let selectedStyle = $('#filter-review-select option:selected').val();
            console.log("selected beer style" + selectedStyle);
            // $('filtered-reviews').html('');
            $.getJSON('js/reviews.js', getSelectedStyle);
            function getSelectedStyle(data) {
                let selectEntries = [];
                console.log(data);
                if (data) {
                    data.forEach(function(item) {
                        if (item.beerStyle === selectedStyle) {
                            selectEntries.push(item);
                        }
                    });
                };
                HTMLRenderer.displayAllReviews(selectEntries);
            }
        }); 
        
    }




}

const App = {
    // signupUser: function(username, password) {
    //     $.ajax({
    //         method: "POST",
    //         url: "/api/user/register",
    //         contentType: "application/json",
    //         data: JSON.stringify({username: username, password: password})
    //     })
    //     .done(function (result) {
    //         HTMLRenderer.showSection(".home");
    //     })
    // },

    getAllReviews: (callbackFn) => {
        let reviewData = [];
        setTimeout(function () {
            callbackFn(MOCK_REVIEWS)
        }, 1);

    },

    // Display All Reviews   


    getAndDisplayAllReviews: () => {
        App.getAllReviews(HTMLRenderer.displayAllReviews);
        
        
    },

    reset: function () {

        EventListeners.startListeners();
        HTMLRenderer.showSection(".landing");

    },

    generateBeerDrop: function () {
        $('#beerDropdown').load('js/beer-style-drop-items.html');
        $('#beer-style').load('js/beer-styles-new-reviews.html');

    },

  

    // filterBeerStyles: function () {
    // $('#beerDropdown').change(function () {
    //     let selectedStyle = $('#filter-review-select option:selected').val();
    //     console.log("selected beer style" + selectedStyle);
    //     // $('filtered-reviews').html('');
    //     $.getJSON('js/reviews.js/?beerStyle=IPA', getSelectedStyle);
    //     function getSelectedStyle(data) {
    //         HTMLRenderer.displayAllReviews(data);
    //     }
    // });

    // }
    
};

// $(App.reset());

$(function () {
    App.getAndDisplayAllReviews();
    App.generateBeerDrop();
    // App.filterBeerStyles();
    EventListeners.startListeners();
    
    // HTMLRenderer.showSection(".landing");


});


