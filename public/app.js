var MOCK_REVIEWS_DATA = {
        "beerReviews": [
        {
            "user": "btan579",
            "beerName": "Heady Topper",
            "breweryName": "Alchemist",
            "beerStyle": "Double IPA",
            "beerDescrip": "Lorem ipsum dolor sit amet, consectetur     adipiscing elit. In vitae faucibus purus. Aenean mollis, augue venenatis consequat interdum, ex tellus nullam."
        },
        {
            "user": "btan579",
            "beerName": "IPA",
            "breweryName": "Harpoon",
            "beerStyle": "IPA",
            "beerDescrip": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae faucibus purus. Aenean mollis, augue venenatis consequat interdum, ex tellus nullam."
        },
        {
            "user": "btan579",
            "beerName": "Boston lager",
            "breweryName": "Sam Adams",
            "beerStyle": "lager",
            "beerDescrip": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae faucibus purus. Aenean mollis, augue venenatis consequat interdum, ex tellus nullam."
        }
    ]

};

function getBeerReviews(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_REVIEWS_DATA)}, 1);
}

function displayBeerReviews(data) {
    for (index in data.beerReviews) {
        $('body').append('<p>' + data.beerReviews[index].user + '</p>');
        $('body').append('<p>' + data.beerReviews[index].beerName + '</p>');
        $('body').append('<p>' + data.beerReviews[index].breweryName + '</p>');
        $('body').append('<p>' + data.beerReviews[index].beerStyle + '</p>');
        $('body').append('<p>' + data.beerReviews[index].beerDescrip + '</p>');
        
    }
}

function getAndDisplayBeerReviews() {
    getBeerReviews(displayBeerReviews);
    
}

$(function() {
    getAndDisplayBeerReviews();
    
})







// var MOCK_USER = {
//     "user": {
//             "userName": "btan579",
//             "userPassword": "password1"
//         }
// };

// function getUserName(callbackFn) {
//     setTimeout(function () {
//         callbackFn(MOCK_USER)
//     }, 1);
// }

// function loginUser(userName, userPassword) {

// }