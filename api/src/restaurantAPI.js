const express = require('express');
const db = require('./db/DBConnection');
const Note = require('./constructors/Note');
let restaurants = require('./db/data/Restaurants_in_Wake_County.json');
const cookieParser = require('cookie-parser');
const restRouter = express.Router();
restRouter.use(cookieParser());
restRouter.use(express.json());
const { TokenMiddleware } = require('./middleware/TokenMiddleware');
const geolib = require('geolib');

restRouter.get('/nearby', TokenMiddleware, async (req, res) => {
    const ne = JSON.parse(req.query.ne);
    const sw = JSON.parse(req.query.sw);

    let nearbyRestaurants = [];

    for (const line of restaurants.features) {
        if (line.properties.FACILITYTYPE === 'Restaurant') {
            const restaurantLatitude = line.geometry.coordinates[1];
            const restaurantLongitude = line.geometry.coordinates[0];

            //check that this isn't a duplicate record (there isn't already a restaurant at those coordinates)
            if (nearbyRestaurants.find(rest => rest.coordinates[0] === restaurantLatitude && rest.coordinates[1] === restaurantLongitude) !== undefined) {
                continue;
            }

            //check that restaurant is in bounds
            if (restaurantLatitude >= Math.min(ne.lat, sw.lat) &&
                restaurantLatitude <= Math.max(ne.lat, sw.lat) &&
                restaurantLongitude >= Math.min(ne.lng, sw.lng) &&
                restaurantLongitude <= Math.max(ne.lng, sw.lng)) {
                const restaurant = {
                    id: line.properties.OBJECTID,
                    name: cleanRestaurantName(line.properties.NAME),
                    coordinates: [restaurantLatitude, restaurantLongitude],
                    address: line.properties.ADDRESS1,
                    city: line.properties.CITY,
                    state: line.properties.STATE,
                    phoneNumber: line.properties.PHONENUMBER
                };

                //get avg rest rating
                const queryRet = await db.query('SELECT COALESCE(AVG(note_rating), -1) as avg FROM note WHERE note_restID=?', [restaurant.id]);
                restaurant['rating'] = Math.round(queryRet.results[0].avg);
                nearbyRestaurants.push(restaurant);
            }
        }
    }

    res.json(nearbyRestaurants);
});

restRouter.get('/:restID', TokenMiddleware, (req, res) => {
    for (const line of restaurants.features) {
        if (line.properties.OBJECTID == req.params.restID) {
            const restaurant = {
                id: line.properties.OBJECTID,
                name: cleanRestaurantName(line.properties.NAME),
                address: line.properties.ADDRESS1,
                city: line.properties.CITY,
                state: line.properties.STATE,
                phoneNumber: line.properties.PHONENUMBER
            };
            res.json(restaurant);
        }
    }
});

// Get restaurant notes
restRouter.get('/:restID/notes', TokenMiddleware, (req, res) => {
    db.query('SELECT * FROM note WHERE note_restID=?', [req.params.restID])
        .then(({ results }) => {
            const formattedResults = results.map(noteData => new Note(noteData).toJSON());
            res.json(formattedResults);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error fetching restaurant notes");
        });
});

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

module.exports = restRouter;