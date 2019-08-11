state = {
    noReviews: null,
    currentUser: "",
    currentUserId: "",
     newLogin: true,
    // selectedUsers: [],
    // selectedUsersArr: []
};

const HTMLRenderer = {
    showSection: function (sectionToShow) {
        const sections = [".logged-status", ".submit-form-beer-cont", ".filtered-reviews-cont", ".home-cont"];
        sections.forEach(function (item, index) {
            $(item).addClass("hidden");
        });
        $(sectionToShow).removeClass("hidden");

    },

    displayFilteredReviews: (data) => {
        
        if (state.noReviews) {
            $(".filtered-reviews-cont").removeClass("hidden");
            $('.filtered-reviews-cont').empty();
            $('.filtered-reviews-cont').append('<h4>There are currently <em>no</em> reviews for this beer.</em><h4>');
        } else {
            $(".filtered-reviews-cont").removeClass("hidden");
            $('.filtered-reviews-cont').empty();
            $('.filtered-reviews-cont').append('<button type="button" id="close-review" class="btn">X</button>' + '<div id="filtered-beer"><h4>' + data.beer.name +
                '</h4><h4>' + data.beer.style +
                '</h4><h4>' + data.beer.category +
                '</h4><h4><em>Brewed by </em>' + data.beer.brewery + '</div>');
for (let i = 0; i < data.reviews.length; i++) {
    
    if (data.reviews[i].haveAnother) {
        $('.filtered-reviews-cont').append('<div id="filtered-reviews" data-review-id="' + data.reviews[i].id + '" data-user-id="' + data.reviews[i].user + '"><div class="row"><div class ="col-md-6">' + '<h6>Reviewer:</h6><p>' + data.reviews[i].userName +
            '</p><h6>Comment: </h6><p>' + data.reviews[i].comment  +
            '</p><h6>Have another?: </h6><p>' + " I'll have another! " + '</p></div>' + '<div class="col-md-6"><div class ="edit-delete-cont" data-review-id="' + data.reviews[i].id + '" data-user-id="' + data.reviews[i].user + '"><a href="#" class="edit-link" >Edit</a><a href="#" class ="delete-link" >Delete</a></div><div class="edit-input" hidden><form class="edit-review-form" action="#" method="PUT"><fieldset><label for="edit-review-comment">Comment:</label><input name = "edit-review-comment" type="text" class="edit-review-comment" maxlength = "200"></fieldset><fieldset><label for="edit-review-have-another">'+ "I'll have another!" + '</label><input type="checkbox" name="edit-review-have-another" class="edit-review-have-another"></fieldset><fieldset><button type="submit" class="edit-review-submit">Submit</button><button type ="reset" class="edit-review-cancel" >Cancel</button></fieldset></form></div></div>');
        window.scrollTo(0, 0);
    } else {
        window.scrollTo(0, 0);
        $('.filtered-reviews-cont').append('<div id="filtered-reviews" data-review-id="' + data.reviews[i].id + '" data-user-id="' + data.reviews[i].user + '"><div class="row"><div class ="col-md-6">' + '<h6>Reviewer:</h6><p>' + data.reviews[i].userName +
            '</p><h6>Comment: </h6><p>' + data.reviews[i].comment +
            '</p><h6>Have another?: </h6><p>' + " Nah " + '</p></div>' + '<div class="col-md-6"><div class ="edit-delete-cont" data-review-id="' + data.reviews[i].id + '" data-user-id="' + data.reviews[i].user + '"><a href="#" class="edit-link">Edit</a><a href="#" class ="delete-link" >Delete</a></div><div class="edit-input" hidden><form class="edit-review-form" action="#" method="PUT"><fieldset><label for="edit-review-comment">Comment:</label><input name="edit-review-comment" type="text" class="edit-review-comment" maxlength = "200"></fieldset><fieldset><label for="edit-review-have-another">' + "I'll have another!" + '</label><input type="checkbox" name="edit-review-have-another" class="edit-review-have-another"></fieldset><fieldset><button type="submit" class="edit-review-submit">Submit</button><button type ="reset" class="edit-review-cancel">Cancel</button></fieldset></form></div></div>');
    }
            }
        }

    },

    displayUserInfo: function () {
        $(".greeting").html(`Hi, ${state.currentUser}!`);
    },

    hideUserInfo: function () {
        $(".greeting").addClass("hidden");
    },

    showAlert: function (alert) {
        const displayTime = 2000;

        $(alert).prop("hidden", false);
        setTimeout(function () {
            $(alert).prop("hidden", true);
        }, displayTime);

        window.scrollTo(0, 0);
    },

    showError: function (error) {
        const displayTime = 2000;

        $(".error").text(error);

        $(".error").prop("hidden", false);
        setTimeout(function () {
            $(".error").prop("hidden", true);
        }, displayTime);

        window.scrollTo(0, 0);
    }


};


const EventListeners = {
    listenersStarted: false,
    startListeners: function () {
        if (!this.listenersStarted) {
            this.newBeerClick();
            this.newBeerSubmit();
            this.beerCancel();
            this.beerStyleSelect();
            this.newReviewClick();
            this.reviewCancel();
            this.newReviewSubmit();
            this.toggleBeerDropSelect();
            this.handleSignUpLink();
            this.handleSignupCancel();
            this.handleSignUpSubmit();
            this.handleLogOutLink();
            this.handleLoginLinkPrimary();
            this.handleLoginSubmit();
            this.handleLoginCancel();
            this.showPassClickSignup();
            this.showPassClickLogin();
            this.editReviewCancel();
            this.editReviewClick();
            this.editReviewSubmit();
            this.deleteReviewClick();
            this.reviewClose();
            this.listenersStarted = true;
        }
    },

    newBeerClick: function () {
        $(".new-beer-link").on("click", function (event) {
            event.preventDefault();
            $(".submit-form-beer-cont").removeClass("hidden");
            App.generateStyleDropDowns();
            App.generateCateDropDowns();
        });
    },

    beerCancel: function () {
        $("#cancel-beer").on("click", function () {
            $("#form-submit-beer").trigger('reset');
            $(".submit-form-beer-cont").addClass("hidden");
        });

    },

    newReviewClick: function () {
        $(".new-review-link").on("click", function (event) {
            event.preventDefault();
            $(".submit-form-review-cont").removeClass("hidden");
            App.generateBeersDropDownNewReview();


        });
    },

    reviewCancel: function () {
        $("#cancel-new-review").on("click", function () {
            $("#form-submit-new-review").trigger('reset');
            $(".submit-form-review-cont").addClass("hidden");
        });

    },

    newBeerSubmit: function () {
        $("#form-submit-beer").submit(function (event) {
            event.preventDefault();
            const beerName = $(this).find("#new-beer-name").val();
            const breweryInput = $(this).find("#new-brewery").val();
            const beerStyleInput = $(this).find("#styleDropNewBeer").val();
            const beerCateInput = $(this).find("#cateDropNewBeer").val();

            const newBeer = {
                name: beerName,
                brewery: breweryInput,
                style: beerStyleInput,
                category: beerCateInput,
                reviews: []
            };
            
            $.ajax({
                method: "POST",
                url: "/beers",
                data: JSON.stringify(newBeer),
                success: function (json) {

                },
                err: function () {
                    console.log(err);
                },
                dataType: 'json',
                contentType: 'application/json'
            });

            $(".submit-form-beer-cont").addClass("hidden");
            $("#form-submit-beer").trigger('reset');
            App.generateBeerReviewsDropDowns();
        });

    },

    newReviewSubmit: function () {
         let haveAnotherChecked;
         
        $("#submit-new-review-form").submit(function (event) {
            event.preventDefault();
            const beerId = $(this).find("#newReviewBeerDrop").val();
            const reviewComment = $(this).find("#new-review-comment").val();
            
        
            haveAnotherChecked = $("#new-review-have-another").is(":checked");

            if (haveAnotherChecked) {
                haveAnotherChecked = true;
            } else {
                haveAnotherChecked = false;
            }

            const newReview = {
                beer_id: beerId,
                comment: reviewComment,
                haveAnother: haveAnotherChecked,
                user_id: state.currentUserId
            };
            
         
            const token = localStorage.getItem("token");
           
            $.ajax({
                method: "POST",
                url: "/reviews",
                data: JSON.stringify(newReview),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                success: function (json) {
                   
                    HTMLRenderer.showAlert(".alert--save");
                },
                err: function () {
                     HTMLRenderer.showAlert(".alert--unauthorized");
                    console.log(err);
                },
                dataType: 'json',
                contentType: 'application/json'
            })
            .fail(function () {
                HTMLRenderer.showAlert(".alert--unauthorized");
            });

            $(".submit-form-review-cont").addClass("hidden");
           $("#submit-new-review-form").trigger('reset');
            App.generateBeerReviewsDropDowns();
        });

    },

    beerStyleSelect: function () {
        $('#beerDrop').on("change", function (event) {
            // event.preventDefault();
            let beerReviews = [];
            var selected = $(this).find('option:selected');
            let selectedReviews = selected.attr('reviews');
            beerReviews.push(selectedReviews);
            
            if (!$.trim(beerReviews)) {
                console.log("There are no reviews to display");
                state.noReviews = true;
                HTMLRenderer.displayFilteredReviews(state.noReviews);
            } else {
                state.noReviews = false;
                $.ajax({
                        method: "GET",
                        url: `/reviews/${selectedReviews}`,
                        contentType: "application/json",
                        dataType: "json"
                    })
                    .then(data => {
                        HTMLRenderer.displayFilteredReviews(data);
                    });
            }
            
            
        });

    },

    toggleBeerDropSelect: () => {
        $('#beerDropLink').on("click").toggle("hidden");
    },

    handleSignUpLink: function () {
        $(".signup-link").on("click", function (event) {
            $(".page-heading").removeClass("hidden");
            $(".banner").addClass("hidden");
            $(".signup-cont").removeClass("hidden");
        });
    },

    handleSignupCancel: function () {
        $("#cancel-signup").on("click", function () {
            $(".banner").removeClass("hidden");
            $(".page-heading").addClass("hidden");
            $(".signup-cont").addClass("hidden");
            $("#form-signup").trigger('reset');
        });
    },

    handleLoginCancel: function () {
        $("#cancel-login").on("click", function () {
            $(".banner").removeClass("hidden");
            $(".page-heading").addClass("hidden");
            $(".login-cont").addClass("hidden");
            $("#form-login").trigger('reset');
        });
    },

    handleSignUpSubmit: function () {
        $("#form-signup").submit(function (event) {
            event.preventDefault();
        
            const newUserName = $(this).find("#user-name-signup").val();
            const newPassword = $(this).find("#password-signup").val();

            const newUser = {
                userName: newUserName,
                password: newPassword
            };
            $.ajax({
                method: "POST",
                url: "/auth/register/",
                data: JSON.stringify(newUser),
                success: function (json) {
                    state.currentUser = json.userName;
                    state.currentUserId = json.user_id;
                    HTMLRenderer.displayUserInfo(state.currentUser);
                    localStorage.setItem("token", json.token);
                },
                err: function () {
                    console.log(err);
                },
                dataType: 'json',
                contentType: 'application/json'
            });
            // ADD on sucssfull
            $(".page-direction-button-cont").addClass("hidden");
            $(".logout").removeClass("hidden");
            $(".greeting").removeClass("hidden");
            $(".page-heading").addClass("hidden");
            $(".signup-cont").addClass("hidden");
            $(".banner").removeClass("hidden");
            $("#form-signup").trigger('reset');
        });


    },

    handleLoginSubmit: function () {
        $("#form-login").submit(function (event){
            event.preventDefault();

            const loginUserName = $(this).find("#user-name-login").val();
            const loginPassword = $(this).find("#password-login").val();

            const loginUser = {
                username: loginUserName,
                password: loginPassword
            };
            $.ajax({
                method: "POST",
                url: "/auth/login/",
                data: JSON.stringify(loginUser),
                success: function (json) {
                    localStorage.setItem("token", json.token);
                    state.currentUser = json.user.userName;
                    state.currentUserId = json.user._id;
                
                    HTMLRenderer.displayUserInfo(state.currentUser);
                     $(".page-direction-button-cont").addClass("hidden");
                     $(".logout").removeClass("hidden");
                     $(".greeting").removeClass("hidden");
                     $(".page-heading").addClass("hidden");
                     $(".banner").removeClass("hidden");
                     $(".login-cont").addClass("hidden");
                     $("#form-login").trigger('reset');
                },
                err: function () {
                    console.log(err);
                },
                dataType: 'json',
                contentType: 'application/json'
            })
            .fail(function () {
                 $("#form-login").trigger('reset');
                HTMLRenderer.showError("Incorrect username/password");
            });

        });
    },

    handleLoginLinkPrimary: function () {
        $(".login-link").on("click", function (event) {
    $(".page-heading").removeClass("hidden");
    $(".banner").addClass("hidden");
    $(".login-cont").removeClass("hidden");

        });
    },

    handleLogOutLink: function () {
        $(".logout").on("click", function () {
             $(".page-direction-button-cont").removeClass("hidden");
             $(".logout").addClass("hidden");
             $(".greeting").addClass("hidden");
            
            App.logoutUser();
        });
    },

    showPassClickSignup: function () {
        $("#showPassCheck-signup").on("click", function (event) {
            var x = document.getElementById("password-signup");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        });
    },

    showPassClickLogin: function () {
        $("#showPassCheck-login").on("click", function (event) {
            var x = document.getElementById("password-login");
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        });
    },

    editReviewClick: function () {
        $(".filtered-reviews-cont").on("click", ".edit-link", function (event) {
            event.preventDefault();
            $(this).closest(".col-md-6").find(".edit-input").show();
            $(this).closest(".col-md-6").find(".edit-input").find("#user-name-login").val();
            $(this).find("#user-name-login").val();
        });
    },

    deleteReviewClick: function () {
        $(".filtered-reviews-cont").on("click", ".delete-link", function (event) {
            event.preventDefault();
          
            const reviewIdDelete = $(this).closest(".col-md-6").find(".edit-delete-cont").data("review-id");
            const correctUser = $(this).closest(".col-md-6").find(".edit-delete-cont").data("user-id");
        
            const token = localStorage.getItem("token");

            if (correctUser === state.currentUserId){
                $.ajax({
                    method: "DELETE",
                    url: `/reviews/${reviewIdDelete}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    success: function (json) {

                        HTMLRenderer.showAlert(".alert--delete");
                    },
                    err: function () {
                        HTMLRenderer.showAlert(".alert--unauthorized");
                        console.log(err);
                    },
                    dataType: 'json',
                    contentType: 'application/json'
                })
                    .fail(function () {
                        HTMLRenderer.showAlert(".alert--unauthorized");
                    });

                $("#beerDrop option:eq(0)").prop("selected", true);
                $(".filtered-reviews-cont").addClass("hidden");
                $('.filtered-reviews-cont').empty();
            } else {
                HTMLRenderer.showAlert(".alert--unauthorized");
            }

            
        });
    },

    editReviewSubmit: function () {
        let haveAnotherChecked;
        
        $(".filtered-reviews-cont").on("submit", ".edit-review-form", function (event) {
            event.preventDefault();
           
            const editedReviewId = $(this).closest(".col-md-6").find(".edit-delete-cont").data("review-id");
            const editedComment = $(this).parent().find(".edit-review-comment").val();
                  
            haveAnotherChecked = $(".edit-review-have-another").is(":checked");

            if (haveAnotherChecked) {
                haveAnotherChecked = true;
            } else {
                haveAnotherChecked = false;
            }

            const editedReview = {
                id: editedReviewId,
                comment: editedComment,
                haveAnother: haveAnotherChecked
            };
            const token = localStorage.getItem("token");

            $.ajax({
                    method: "PUT",
                    url: `/reviews/${editedReviewId}`,
                    data: JSON.stringify(editedReview),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    success: function (json) {
                        
                        HTMLRenderer.showAlert(".alert--save");
                    },
                    err: function () {
                        HTMLRenderer.showAlert(".alert--unauthorized");
                        console.log(err);
                    },
                    dataType: 'json',
                    contentType: 'application/json'
                })
                .fail(function () {
                    HTMLRenderer.showAlert(".alert--unauthorized");
                });

            $("#beerDrop option:eq(0)").prop("selected", true);
            $(".filtered-reviews-cont").addClass("hidden");
            $('.filtered-reviews-cont').empty();
            $(".edit-review-form").trigger('reset');
            $(this).closest(".col-md-6").find(".edit-input").hide();
        });
    },

    editReviewCancel: function () {
         $(".filtered-reviews-cont").on("click", ".edit-review-cancel", function (event) {
             event.preventDefault();
            $(".edit-review-form").trigger('reset');
            $(this).closest(".col-md-6").find(".edit-input").hide(); 
         });
    },

    reviewClose: function () {
        $(".filtered-reviews-cont").on("click", "#close-review", function (event) {
            event.preventDefault();
             $(".filtered-reviews-cont").addClass("hidden");
             $('.filtered-reviews-cont').empty();
             $("#beerDrop option:eq(0)").prop("selected", true);
        });
    }
};

const App = {

    generateStyleDropDowns: () => {
        $('#styleDropNewBeer').empty();
        $('#styleDropNewBeer, select[data-source-style]').each(function () {
            var $selectStyle = $(this);
            
            $selectStyle.append('<option></option>');
            $.ajax({
                    method: "GET",
                    url: $selectStyle.attr('data-source-style'),
                    contentType: "application/json",
                    dataType: "json"
                })
                .then(function (styleOptions) {
                    
                    styleOptions.styles.map(function (styleOption) {
                        var $styleOption = $('<option>');
                        $styleOption
                            .val(styleOption[$selectStyle.attr('data-valueKey')])
                            .text(styleOption[$selectStyle.attr('data-displayKey')]);
                        $selectStyle.append($styleOption);
                    });
                    $("#styleDropNewBeer").html($('#styleDropNewBeer option').sort(function (x, y) {
                        
                        return $(x).text() < $(y).text() ? -1 : 1;
                    }));

                    $("#styleDropNewBeer").get(0).selectedIndex = 0;
                });
        });
    },

    generateCateDropDowns: () => {
        $('#cateDropNewBeer').empty();
        $('#cateDropNewBeer, select[data-source-cat]').each(function () {
            var $selectCat = $(this);
            $selectCat.append('<option></option>');
            $.ajax({
                    method: "GET",
                    url: $selectCat.attr('data-source-cat'),
                    contentType: "application/json",
                    dataType: "json",
                })
                .then(function (catOptions) {
                    catOptions.categorys.map(function (catOption) {
                        var $catOption = $('<option>');
                        $catOption
                            .val(catOption[$selectCat.attr('data-valueKey')])
                            .text(catOption[$selectCat.attr('data-displayKey')]);
                        $selectCat.append($catOption);
                    });
                    $("#cateDropNewBeer").html($('#cateDropNewBeer option').sort(function (x, y) {
                        
                        return $(x).text() < $(y).text() ? -1 : 1;
                    }));

                    $("#cateDropNewBeer").get(0).selectedIndex = 0;
                });
        });
    },
    generateBeerReviewsDropDowns: () => {
        $('#beerDrop').empty();
        $('#beerDrop, select[data-source-beer]').each(function () {
            var $selectBeer = $(this);
           
            $selectBeer.append('<option></option>');

            $.ajax({
                    method: "GET",
                    url: $selectBeer.attr('data-source-beer'),
                    contentType: "application/json",
                    dataType: "json"
                })
                .then(function (beerOptions) {
                    beerOptions.beers.map(function (beerOption) {
                        var $optionBeer = $('<option>');
                        $optionBeer
                            .val(beerOption[$selectBeer.attr('data-valueKey')])
                            .text(beerOption[$selectBeer.attr('data-displayKey')])
                            .attr('reviews', beerOption.reviews.toString());
                        $selectBeer.append($optionBeer);
                    });
                    $("#beerDrop").html($('#beerDrop option').sort(function (x, y) {
                        
                        return $(x).text() < $(y).text() ? -1 : 1;
                    }));

                    $("#beerDrop").get(0).selectedIndex = 0;
                });
        });  
    },

    generateBeersDropDownNewReview: () => {
        $('#newReviewBeerDrop').empty();
        $('#newReviewBeerDrop, select[data-source-nBeer]').each(function () {
            var $selectNew = $(this);
            $selectNew.append('<option></option>');
            $.ajax({
                    method: "GET",
                    url: $selectNew.attr('data-source-nBeer'),
                    contentType: "application/json",
                    dataType: "json"
                })
                .then(function (optionsNew) {
                    optionsNew.beers.map(function (optionNew) {
                        var $optionNew = $('<option>');
                        $optionNew
                            .val(optionNew[$selectNew.attr('data-valueKey')])
                            .text(optionNew[$selectNew.attr('data-displayKey')]);
                        $selectNew.append($optionNew);
                    });

                    $("#newReviewBeerDrop").html($('#newReviewBeerDrop option').sort(function (x, y) {
                        return $(x).text() < $(y).text() ? -1 : 1;

                    }));

                    $("#newReviewBeerDrop").get(0).selectedIndex = 0;
                });
        });
    },

    logoutUser: function () {
        localStorage.removeItem("token");
        state.currentUser = "";
        state.currentUserId = "";
    },
};

$(function () {
    EventListeners.startListeners();
    App.generateBeerReviewsDropDowns();
});