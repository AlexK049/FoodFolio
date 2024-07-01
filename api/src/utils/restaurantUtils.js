const restaurants = require('../db/data/Restaurants_in_Wake_County.json');

function cleanRestaurantName(restaurantName) {
    // remove ids present in some restaurant names
    let cleanedName = restaurantName.split(" #")[0];

    // make restaurant name be lower case except the first letter of each word
    const excludeList = ["and"];
    const words = cleanedName.split(' ');
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (excludeList.includes(word.toLowerCase())) {
            words[i] = word.toLowerCase();
        } else if (word.length > 0) {
            const firstLetter = word[0].toUpperCase();
            const restOfWord = (word.length > 1) ? word.substring(1).toLowerCase() : "";
            words[i] = firstLetter + restOfWord;
        } else {
            words.splice(i, 1);
            i--;
        }
    }
    cleanedName = words.join(' ');

    return cleanedName;
}

function getRestaurantName(restaurantId) {
    for (const line of restaurants.features) {
        if (line.properties.OBJECTID == restaurantId) {
            return cleanRestaurantName(line.properties.NAME);
        }
    }
    return "";
}

module.exports = { cleanRestaurantName, getRestaurantName };