import { useMap } from "react-leaflet"
import RestaurantMarker from "./restaurantMarker";
import APIClient from "../../static/js/APIClient"
import { useEffect, useState } from "react"

const UpdatingRestaurantMarkers = ({ openRestaurantMenuModal, openAddNoteModal }) => {
    const [restaurants, setRestaurants] = useState([]);

    const map = useMap();
    const updateMapMarkers = async () => {
        //clear markers and return early if map is super zoomed out
        if (map.getZoom() < 14) {
            setRestaurants([]);
            return;
        }
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        const reducedBounds = fitBoundingBox(southWest, northEast);

        getRestaurants(reducedBounds.southWest, reducedBounds.northEast);
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
            openRestaurantMenuModal={openRestaurantMenuModal}
            openAddNoteModal={openAddNoteModal}
        />);
}

export default UpdatingRestaurantMarkers;