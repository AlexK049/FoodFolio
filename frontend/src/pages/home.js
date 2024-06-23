import { useState, useEffect } from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import { UpdatingRestaurantMarkers, ControlledViewChanger } from "../components/map"
import { Modal, Hud } from "../components"
import { RestaurantDetails } from "../subpages"
import Notes from "./notes"
import "../static/css/leaflet.css"

export const Home = () => {
    const defaultMapCenter = [35.7851, -78.6813];
    const [mapCenter, setMapCenter] = useState(defaultMapCenter);

    /* NOTE: not in use until data from more than just RDU area is used */
    //https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/
    // navigator.geolocation.getCurrentPosition(position => {
    //     if (position) {
    //         setMapCenter([position.coords.latitude, position.coords.longitude]);
    //     }
    // });

    const [restaurantMenuModalOpen, setRestaurantMenuModalOpen] = useState(false);
    const [targetRestaurantId, setTargetRestaurantId] = useState();
    const [notesOpen, setNotesOpen] = useState(false);

    const openRestaurantMenuModal = (restaurantId) => {
        setTargetRestaurantId(restaurantId);
        setRestaurantMenuModalOpen(true);
    }

    return (
        <div className="h-screen flex">
            <div className="relative flex justify-center items-center h-full w-full">
                <MapContainer center={defaultMapCenter} zoom={15} minZoom={3} scrollWheelZoom={true} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <UpdatingRestaurantMarkers openRestaurantModal={openRestaurantMenuModal} />
                    <ControlledViewChanger center={mapCenter} zoom={15} />
                </MapContainer>
                <Hud openNotes={() => setNotesOpen(!notesOpen)} />
            </div>
            {
                notesOpen ?
                    <Notes />
                    :
                    ""
            }
            <Modal isOpen={restaurantMenuModalOpen} close={() => setRestaurantMenuModalOpen(false)}>
                <RestaurantDetails restaurantId={targetRestaurantId} />
            </Modal>
        </div>
    )
}

export default Home;
