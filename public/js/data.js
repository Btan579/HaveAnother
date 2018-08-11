const MOCK_NEW_USERS = [
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

];




const MOCK_USERS = [{
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
    ];


const BEER_REVIEWS = {
            beerNames:
            {
                    beerName: 'Heady Topper',
                    breweryName: 'Alchemist',
                    beerStyle: 'Double IPA',
                    beerDescrip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    haveAnother: 'Ill have another!',
                    user: 'btan579',
                    reviewID: 111
                },
                Brewe{
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
        };




const BEER_STYLES = [
    "Aged Beer",
    "American Rye Ale or Lager",
    "American Amber Lager",
    "American Amber Lager",
    "American Amber / Red Ale",
    "American Barley Wine Ale",
    "American Brown Ale",
    "American Cream Ale or Lager",
    "American Dark Lager",
    "American Ice Lager",
    "American Imperial Porter",
    "American Imperial Stout",
    "American India Black Ale",
    "American India Pale Ale",
    "American Lager",
    "American Light Lager",
    "American Low Carb Light Lager",
    "American Malt Liquor",
    "American Marzen / Oktoberfest",
    "American Pale Ale",
    "American Pilsener",
    "American Premium Lager",
    "American Sour Ale",
    "American Stout",
    "American Strong Pale Ale",
    "American Wheat Wine Ale",
    "Australasian Light Lager",
    "Australasian Pale Ale",
    "Baltic Porter",
    "Bamberg Bock Rauchbier",
    "Bamberg Helles Rauchbier",
    "Bamberg Marzen",
    "Bamberg Weiss Rauchbier",
    "Belgian Blonde Ale",
    "Belgian Dark Strong Ale",
    "Belgian Dubbel",
    "Belgian Flanders / Oud Bruin",
    "Belgian Fruit Lambic",
    "Belgian Gueuze Lambic",
    "Belgian Lambic",
    "Belgian Pale Ale",
    "Belgian Pale Strong Ale",
    "Belgian Quadrupel",
    "Belgian Table Beer",
    "Belgian Tripel",
    "Belgian White",
    "Berliner Weisse",
    "Bohemian Pilsener",
    "British Barley Wine Ale",
    "British Imperial Stout",
    "Brown Porter",
    "California Common Beer",
    "Chocolate / Cocoa Flavored Beer",
    "Classic English Pale Ale",
    "Classic Irish Dry Stout",
    "Coffee Flavored Beer",
    "Dark American Wheat Ale or Lager",
    "Dark American Belgo Ale",
    "Dortmunder / European Export",
    "Dry Lager",
    "English Brown Ale",
    "English Dark Mild Ale",
    "English India Pale Ale",
    "English Pale Mild Ale",
    "English Summer Ale",
    "European Low Alcohol Lager",
    "European Dark",
    "Experimental Beer",
    "Extra Special Bitter",
    "Field Beer",
    "Foreign Export Stout",
    "French & Belgian Saison",
    "French Biere de Garde",
    "Fresh Hop Ale",
    "Fruit Beer",
    "Fruit Wheat Ale or Lager",
    "German Brown Ale / Altbier",
    "German Doppelbock",
    "German Eisbock",
    "German Heller Bock / Maibock",
    "German Kolsch",
    "German Leichtes Weizen",
    "German Marzen",
    "German Oktoberfest",
    "German Pilsener",
    "German Rye Ale",
    "German Schwarzbier",
    "Gluten Free Beer",
    "Golden or Blonde Ale",
    "Herb and Spice Beer",
    "Imperial or Double India Pale Ale",
    "Imperial or Double Red Ale",
    "International Pale Ale",
    "International Pilsener",
    "Irish Red Ale",
    "Japanese Sake Yeast Beer",
    "Kellerbier Ale",
    "KellerbierLager",
    "Latin American Light Lager",
    "Leipzig Gose",
    "Light American Wheat Ale or Lager",
    "Munchner Helles",
    "Non Alcoholic Beer",
    "Oatmeal Stout",
    "Old Ale",
    "Ordinary Bitter",
    "Other Belgian Ales",
    "Other Strong Ale or Lager",
    "Out of Category",
    "Pale American Belgo Ale",
    "Porter",
    "Pumpkin Beer",
    "Robust Porter",
    "Scotch Ale",
    "Scottish Export Ale",
    "Scottish Heavy Ale",
    "Scottish Light Ale",
    "Session Beer",
    "Smoke Beer",
    "Smoke Porter",
    "South German Bernsteinfarbenes Weizen",
    "South German Dunkel Weizen",
    "South German Hefeweizen",
    "South German Kristal Weizen",
    "South German Weizenbock",
    "Special Bitter or Best Bitter",
    "Specialty Beer",
    "Specialty Honey Lager or Ale",
    "Specialty Stouts",
    "Strong Ale",
    "Sweet Stout",
    "Traditional German Bock",
    "Tropical Light Lager",
    "Vienna Lager",
    "Winter Warmer",
    "Wood and Barrel Aged Beer",
    "Wood and Barrel Aged Dark Beer",
    "Wood and Barrel Aged Pale to Amber Beer",
    "Wood and Barrel Aged Sour Beer",
    "Wood and Barrel Aged Strong Beer"

];