let state = {
    
    reviews: {}
};


const HTMLRenderer = {
    showSection: function (sectionToShow) {
        const sections = [".logged-status", ".beer-submit-form", ".filtered-reviews", ".home-cont"];
        sections.forEach(function (item, index) {
            $(item).addClass("hidden");
        });
        $(sectionToShow).removeClass("hidden");

    },
    
    displayAllReviews: (data) => {
        console.log(data);
        $('.filtered-reviews').empty();
        $('.filtered-reviews').append('<div class="container"><div class="row"><div class="col-md-5 col-md-offset-6"><div class="filtered-review"><h6>Beer name:</h6><p>' + data.beer.name +
            '</p><h6>Brewery:</h6><p>' + data.beer.brewery +
            '</p><h6>Category:</h6><p>' + data.beer.category +
            '</p><h6>Style:</h6><p>' + data.beer.style + '</p></div></div></div></div>')

        for (let i = 0; i < data.reviews.length; i++) {
            $('.filtered-reviews').append('<div class="container"><div class="row"><div class="col-md-5 col-md-offset-6"><div class="filtered-review"></p><h6>Reviewer:</h6><p>' + data.reviews[i].user + 
            '</p><h6>Comment:</h6><p>' + data.reviews[i].comment +
            '</p><h6>have another: </h6><p>' + data.reviews[i].haveAnother + '</div></div></div></div>')
        }
    }

    // displayBeerStyle: (data) => {

    // }

};


const EventListeners = {
    listenersStarted: false,

    startListeners: function () {
        if (!this.listenersStarted) {
            this.newReviewClick();
            this.newBeerSubmit();
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
            $(".submit-form").removeClass("hidden");
        });
    },

    newBeerClick: function () {
        $(".new-beer").on("click", function () {
            event.preventDefault();
            $(".beer-submit-form").removeClass("hidden");
        });
    },

    newBeerSubmit: function () {
        $("#new-beer-form-submit").submit(function (event) {
            event.preventDefault();
            const beerName = $(this).find("#beer-name").val();
            const breweryInput = $(this).find("#brewery").val();
            const beerStyleInput = $(this).find("#beerStyleDrop").val();
            const beerCateInput = $(this).find("#beerCateDrop").val();
            // const beerDescriptionInput = $(this).find("#beer-description").val();
            // const haveAnotherInput = $(this).find("#have-another").val();
            // const notHaveAnotherInput = $(this).find("#not-another").val();

            // console.log(haveAnotherInput.checked = true);
            // console.log(notHaveAnotherInput);
        
            // if (haveAnotherInput.checked = true) {
            //     haveAnotherchecked = "I'll Have another!";
            // } else {
            //     haveAnotherchecked = "Nah";
            // }       
            const newBeer = {
                name: beerName,
                brewery: breweryInput,
                style: beerStyleInput,
                category: beerCateInput,
                reviews: []
            };
            console.log(newBeer);
            $.ajax({
                method: "POST",
                url: "/beers",
                data: JSON.stringify(newBeer),
                success: function(json) {

                },
                err: function(){
                    console.log(err);
                },
                dataType: 'json',
                contentType: 'application/json'
                })
                
            // const newBeerReview = {
            //     beerName: beerInput,
            //     breweryName: breweryInput,
            //     beerStyle: beerStyleInput,
            //     beerDescrip: beerDescriptionInput,
            //     haveAnother: haveAnotherchecked,
            //     user: 'user'
            //  };
            $(".submit-form").addClass("hidden");
            $("#form-submit").trigger('reset');
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
        $('.beerDropDown').on("change", function (event) { 
            let beerReviews =[];
        //    console.log($('#beerDrop option[attr]'.val()));
            var selected = $(this).find('option:selected');
            // console.log(selected.attr('reviews'));
            let selectedReviews = selected.attr('reviews');
            beerReviews.push(selectedReviews);
            console.log(beerReviews);

            
                $.ajax({
                    method: "GET",
                    url: `/reviews/${selectedReviews}`,
                    contentType: "application/json",
                    dataType: "json"
                })
                .then(data => {
                    console.log(data.reviews);
                   HTMLRenderer.displayAllReviews(data);

                });
           
        });
        
    },

    // reviewStyleSelect: function () {
    //     $('.beerDropDown').on("change", function (event) {
    //         let beerReviews = [];
    //         //    console.log($('#beerDrop option[attr]'.val()));
    //         var selected = $(this).find('option:selected');
    //         // console.log(selected.attr('reviews'));
    //         let selectedReviews = selected.attr('reviews');
    //         beerReviews.push(selectedReviews);
    //         console.log(beerReviews);

    //         // for(var i = 0; i < beerReviews.length; i++){
    //         $.ajax({
    //                 method: "GET",
    //                 url: `/reviews/${selectedReviews}`,
    //                 contentType: "application/json",
    //                 dataType: "json"
    //             })
    //             .then(data => {
    //                 console.log(data.reviews);
    //                 HTMLRenderer.displayAllReviews(data);

    //             });
    //         // }

    //     });

    // }



}

const App = {
    getBeerReviews: () => {
        $('#beerDropDown').on('change', "#beerDrop", e => {
            $.ajax({
                method: "GET",
                url: "/reviews",
                contentType: "application/json",
                data: JSON.stringify({ username: username, password: password })
            })
                .done(function (result) {
                    HTMLRenderer.showSection(".home");
                });
        });
    },

    reset: function () {
        EventListeners.startListeners();
        HTMLRenderer.showSection(".landing");
    },

    generateBeerDropDowns: () => {
        $('#beerDrop, select[data-source]').each(function () {
            var $select = $(this);
            $select.append('<option></option>');

            $.ajax({
                method: "GET",
                url: $select.attr('data-source'),
                contentType: "application/json",
                dataType: "json"
            })
                .then(function (options) {
                    options.beers.map(function (option) {
                        var $option = $('<option>');
                        $option
                            .val(option[$select.attr('data-valueKey')])
                            .text(option[$select.attr('data-displayKey')])
                            .attr('reviews', option.reviews.toString());
                        $select.append($option);
                    });
                });
        });
    },

    generateStyleDropDowns: () => {
        $('#beerStyleDrop, select[data-source]').each(function () {
            var $select = $(this);
            $select.append('<option></option>');

            $.ajax({
                method: "GET",
                url: $select.attr('data-source'),
                contentType: "application/json",
                dataType: "json"
            })
                .then(function (options) {
                    options.styles.map(function (option) {
                        var $option = $('<option>');
                        $option
                            .val(option[$select.attr('data-valueKey')])
                            .text(option[$select.attr('data-displayKey')])
                        $select.append($option);
                    });
                });
        });
    },

    generateCateDropDowns: () => {
        $('#beerCateDrop, select[data-source]').each(function () {
            var $select = $(this);
            $select.append('<option></option>');

            $.ajax({
                method: "GET",
                url: $select.attr('data-source'),
                contentType: "application/json",
                dataType: "json"
            })
                .then(function (options) {
                    console.log(options);
                    options.categorys.map(function (option) {
                        var $option = $('<option>');
                        $option
                            .val(option[$select.attr('data-valueKey')])
                            .text(option[$select.attr('data-displayKey')])
                        $select.append($option);
                    });
                });
        });
    },

    // getAllReviews: (callbackFn) => {
    //     let reviewData = [];
    //     setTimeout(function () {
    //         callbackFn(MOCK_REVIEWS)
    //     }, 1);

    // },

    // getAndDisplayAllReviews: () => {
    //     App.getAllReviews(HTMLRenderer.displayAllReviews);
        
        
    // },

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

    // generateBeerDrop: function () {
    //     $('#beerDropdown').load('js/beer-style-drop-items.html');
    //     $('#beer-style').load('js/beer-styles-new-reviews.html');

    // },

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
    App.generateBeerDropDowns();
    App.generateStyleDropDowns();
    App.generateCateDropDowns();
    // App.getAndDisplayAllReviews();
    // App.generateBeerDrop();
    // App.filterBeerStyles();
    EventListeners.startListeners();
    
    // HTMLRenderer.showSection(".landing");


});


