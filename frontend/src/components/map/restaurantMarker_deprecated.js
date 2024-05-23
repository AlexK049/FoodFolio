import { Marker, Popup, Tooltip } from 'react-leaflet'
import { StarRating } from '../index'
import '../../static/css/leaflet.css'

/**
 * Creates a marker for a restaurant.
 * 
 * @param {Object} restaurant
 * @param {number} restaurant.id
 * @param {string} restaurant.name the name of the restaurant, may contain number identifiers (start with '#' or '(WCID' )
 * @param {number[]} restaurant.coordinates an array where the first index is the latitude, and the second index is the longitude
 * @param {string} restaurant.city
 * @param {string} restaurant.state
 * @param {string} restaurant.phoneNumber
 * @param {number} restaurant.rating the rating of the restaurant determined by the rating of notes
 * 
 * @param {(restaurantId: number) => void} openRestaurantMenuModal
 * @param {(restaurantId: number) => void} openAddNoteModal
 * @returns {Object} the restaurant marker JSX.
 */
const RestaurantMarker_deprecated = ({ restaurant, openRestaurantMenuModal, openAddNoteModal }) => {
    return (
        <Marker key={restaurant.id} position={[restaurant.coordinates[0], restaurant.coordinates[1]]}>
            <Tooltip direction="top" permanent>{restaurant.name}</Tooltip>
            <Popup>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{restaurant.name}</h5>
                        </div>
                        <div className="modal-body">
                            {
                                restaurant.rating && restaurant.rating != -1
                                    ?
                                    <StarRating value={restaurant.rating} size={3} readonly />
                                    :
                                    <span className="fst-italic fw-lighter">no ratings</span>
                            }
                            <p><strong>Address:</strong>{` ${restaurant.address}, ${restaurant.city}`}</p>
                            <p><strong>Phone Number:</strong>{` ${restaurant.phoneNumber}`}</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => openRestaurantMenuModal(restaurant.id)}>
                                View Menu
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => openAddNoteModal(restaurant.id)}>
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default RestaurantMarker_deprecated;
