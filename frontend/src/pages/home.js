import { useState, useEffect } from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import { UpdatingRestaurantMarkers, ControlledViewChanger } from "../components/map"
import { Modal, Hud } from "../components"
import { AddNote, RestaurantDetails } from "../subpages"
import Note from "./note.js"
import "../static/css/leaflet.css"
import api from '../static/js/APIClient.js';
import { cleanName } from '../static/js/utils.js'

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

    /* code related to the restaurant modal and getting restaurant information */
    const [restaurantMenuModalOpen, setRestaurantMenuModalOpen] = useState(false);
    const [restaurantInfo, setRestaurantInfo] = useState();
    const openRestaurantMenuModal = async (restaurantId) => {
        try {
            const restNotes = await api.getRestaurantNotes(restaurantId);
            const rest = await api.getRestaurantbyID(restaurantId);
            rest.address = cleanName(rest.address);
            rest.city = cleanName(rest.city);
            setRestaurantInfo({ restaurant: rest, notes: restNotes })
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        setRestaurantMenuModalOpen(true);
    }
    //determines if restaurant modal is in the restaurant info or add note phase
    const [isAddNotePhase, setIsAddNotePhase] = useState(false);

    /* code related to the state of the single page (map or user notes) */
    const [hudTitle, setHudTitle] = useState("Food Folio")
    const [notesOpen, setNotesOpen] = useState(false);
    const toggleContext = () => {
        setNotesOpen(current => !current);
        setHudTitle(current => {
            if (current === "Food Folio") {
                return "Food Folio Journal";
            } else {
                return "Food Folio";
            }
        })
    }
    const [userNotes, setUserNotes] = useState();
    useEffect(() => {
        const fetchUserNotes = async () => {
            try {
                const user = await api.getCurrentUser();
                const userNotes = await api.getUserNotes(user.id);
                setUserNotes(userNotes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (notesOpen) {
            fetchUserNotes();
        }
    }, [notesOpen]);

    return (
        <div className="h-screen">
            {
                notesOpen ?
                    <div className="p-20">
                        {
                            userNotes?.map((note) => <Note key={note.id} note={note} />)
                        }
                    </div>
                    :
                    <div className="relative flex justify-center items-center h-full w-full">
                        <MapContainer center={defaultMapCenter} zoom={15} minZoom={3} scrollWheelZoom={true} zoomControl={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <UpdatingRestaurantMarkers openRestaurantModal={openRestaurantMenuModal} />
                            <ControlledViewChanger center={mapCenter} zoom={15} />
                        </MapContainer>
                    </div>
            }
            <Hud openNotes={toggleContext} title={hudTitle} />
            <Modal isOpen={restaurantMenuModalOpen} close={() => { setRestaurantMenuModalOpen(false); setIsAddNotePhase(false); }} title={restaurantInfo?.restaurant?.name}>
                {
                    isAddNotePhase ?
                        <AddNote restaurantId={restaurantInfo?.restaurant?.id} cancelClick={() => setIsAddNotePhase(false)} />
                        :
                        <div className="flex flex-col">
                            <RestaurantDetails restaurantInfo={restaurantInfo} />
                            <button onClick={() => setIsAddNotePhase(true)} type="button" className="self-end text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-2">Add Note</button>
                        </div>
                }
            </Modal>
        </div >
    )
}

export default Home;
