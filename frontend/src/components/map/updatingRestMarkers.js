import { useMap } from "react-leaflet"
import RestaurantMarker from "./restaurantMarker";
import APIClient from "../../static/js/APIClient"
import { useEffect, useState } from "react"

function isCoordsEqual(coord1, coord2) {
    if (coord1 === undefined && coord2 !== undefined || coord1 !== undefined && coord2 === undefined) {
        return false;
    } else if (coord1 === undefined && coord2 === undefined) {
        return true;
    }

    const rnd = x => Math.round(x * 100) / 100;
    const coord1Lat = rnd(coord1.lat);
    const coord1Lng = rnd(coord1.lng);
    const coord2Lat = rnd(coord2.lat);
    const coord2Lng = rnd(coord2.lng);
    return coord1Lat === coord2Lat && coord1Lng === coord2Lng;
}

const UpdatingRestaurantMarkers = ({ openRestaurantModal }) => {
    const map = useMap();

    const [restaurants, setRestaurants] = useState([]);

    let lastUpdatedBounds = undefined;
    const updateMapMarkers = async () => {
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        const reducedBounds = fitBoundingBox(southWest, northEast);

        //if the popup is right on the edge of the leaflet map, parts of the map rerender infinitely since the coordinates start margininally changing, 
        //so this is here to stop this function from continuing executing if that is the case
        if (isCoordsEqual(lastUpdatedBounds?.southWest, reducedBounds.southWest) && isCoordsEqual(lastUpdatedBounds?.northEast, reducedBounds.northEast)) {
            return;
        }

        //clear markers and return early if map is super zoomed out
        if (map.getZoom() < 14) {
            setRestaurants([]);
            return;
        }


        getRestaurants(reducedBounds.southWest, reducedBounds.northEast);

        lastUpdatedBounds = reducedBounds;
    };

    const getRestaurants = async (sw, ne) => {
        try {
            const rests = await APIClient.getNearbyRestaurants(sw, ne);
            //only update restaurants if diff rests were found to minimize unnecessary and jarring rerenders of the map container
            if (JSON.stringify(rests) !== JSON.stringify(restaurants)) {
                setRestaurants(rests);
            }
        } catch (error) {
        }
    }

    const fitBoundingBox = (southWest, northEast) => {
        const centerLat = (northEast.lat + southWest.lat) / 2;
        const centerLng = (northEast.lng + southWest.lng) / 2;

        const newNorthEast = {
            //make it cut out at the top a little faster so you don't just see the bottom of the markers
            lat: centerLat + (northEast.lat - centerLat) * 0.8,
            lng: centerLng + (northEast.lng - centerLng) * 0.99
        };

        const newSouthWest = {
            lat: centerLat - (centerLat - southWest.lat) * 0.99,
            lng: centerLng - (centerLng - southWest.lng) * 0.99
        };

        return {
            northEast: newNorthEast,
            southWest: newSouthWest
        };
    }

    useEffect(() => {
        updateMapMarkers();

        map.on('moveend', updateMapMarkers);

        //clean up the event listener when the component unmounts
        return () => {
            map.off('moveend', updateMapMarkers);
        };
    }, []);

    return restaurants.map(restaurant =>
        <RestaurantMarker
            key={restaurant.id}
            restaurant={restaurant}
            openRestaurantModal={openRestaurantModal}
            isLabeled={false}
        />
    );
}

export default UpdatingRestaurantMarkers;