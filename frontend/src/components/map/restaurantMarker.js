import { Marker, Popup } from 'react-leaflet'
import { StarRating } from '../index'
import { cleanRestaurant } from '../../static/js/utils';

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
const RestaurantMarker = ({ restaurant, openRestaurantMenuModal, openAddNoteModal }) => {
    //prepare the parameter object to be used by the UI:
    const r = cleanRestaurant(restaurant);

    return (
        <Marker key={r.id} position={[r.coordinates[0], r.coordinates[1]]}>
            <Popup>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{r.name}</h5>
                        </div>
                        <div className="modal-body">
                            {
                                r.rating && r.rating != -1 
                                ?
                                    <StarRating value={r.rating} size={3} readonly />
                                    :
                                    <span className="fst-italic fw-lighter">no ratings</span>
                            }
                            <p><strong>Address:</strong>{` ${r.address}, ${r.city}`}</p>
                            <p><strong>Phone Number:</strong>{` ${r.phoneNumber}`}</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => openRestaurantMenuModal(r.id)}>
                                View Menu
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => openAddNoteModal(r.id)}>
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default RestaurantMarker;
