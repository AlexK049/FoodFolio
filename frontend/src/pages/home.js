import { useState } from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import { UpdatingRestaurantMarkers, ControlledViewChanger } from "../components/map"
import { Modal, RestaurantMenu, AddNote } from "../components"
import "../static/css/leaflet.css"

export const Home = () => {
    const defaultMapCenter = [35.7851, -78.6813];
    const [mapCenter, setMapCenter] = useState(defaultMapCenter);

    //https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/
    navigator.geolocation.getCurrentPosition(position => {
        if (position) {
            setMapCenter([position.coords.latitude, position.coords.longitude]);
        }
    });

    const [restaurantMenuModalOpen, setRestaurantMenuModalOpen] = useState(false);
    const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
    const [targetRestaurantId, setTargetRestaurantId] = useState();

    const openRestaurantMenuModal = (restaurantId) => {
        setTargetRestaurantId(restaurantId);
        setRestaurantMenuModalOpen(true);
    }

    const openAddNoteModal = (restaurantId) => {
        setTargetRestaurantId(restaurantId);
        setAddNoteModalOpen(true);
    }

    return (
        <div>
            <div className="d-flex flex-column align-items-center mt-3">
                <MapContainer center={defaultMapCenter} zoom={15} minZoom={3} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <UpdatingRestaurantMarkers openRestaurantMenuModal={openRestaurantMenuModal} openAddNoteModal={openAddNoteModal} />
                    <ControlledViewChanger center={mapCenter} zoom={15} />
                </MapContainer>
            </div>
            <Modal isOpen={restaurantMenuModalOpen} close={() => setRestaurantMenuModalOpen(false)}>
                <RestaurantMenu restaurantId={targetRestaurantId} />
            </Modal>
            <Modal isOpen={addNoteModalOpen} close={() => setAddNoteModalOpen(false)}>
                <AddNote restaurantId={targetRestaurantId} />
            </Modal>
        </div>
    )
}

export default Home;
