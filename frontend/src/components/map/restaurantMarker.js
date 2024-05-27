import React, { Component, createRef } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { StarRating } from '../index'
import '../../static/css/leaflet.css'

class RestaurantMarker extends Component {
    //https://stackoverflow.com/questions/37647061/how-do-i-access-refs-of-a-child-component-in-the-parent-component
    constructor(props) {
        super(props);
        this.state = {};
        this.tooltipRef = createRef();
        this.timeouts = [];
        this.isLabeled = this.props.isLabeled;
    }

    componentDidMount = () => (this.timeouts.push(setTimeout(this.checkIntersections, 100)));

    componentDidUpdate = (prevProps) => {
        if (prevProps.restaurant !== this.props.restaurant) {
            this.timeouts.push(setTimeout(this.checkIntersections, 100));
        }
    }

    componentWillUnmount = () => this.timeouts.forEach(timeout => clearTimeout(timeout));

    checkIntersections = () => {
        if (!this.isLabeled) return; //return if the marker isn't labeled (no labels to check the intersection of)
        if (!this.tooltipRef.current) return;

        //get the tooltip element generated by this component
        const tooltipEl = this.tooltipRef.current._contentNode;

        //reset display of this tooltip
        tooltipEl.style.display = 'block';

        //get all tooltips
        const tooltips = document.querySelectorAll('.leaflet-tooltip');

        const rect1 = tooltipEl.getBoundingClientRect();

        tooltips.forEach((tooltip) => {
            if (tooltip !== tooltipEl) {
                const rect2 = tooltip.getBoundingClientRect();
                if (
                    rect1.left < rect2.right &&
                    rect1.right > rect2.left &&
                    rect1.top < rect2.bottom &&
                    rect1.bottom > rect2.top
                ) {
                    //intersection detected, hide the tooltip
                    tooltipEl.style.display = 'none';
                }
            }
        });
    };

    render() {
        const { restaurant, openRestaurantModal } = this.props;

        return (
            <Marker
                key={restaurant.id}
                position={[restaurant.coordinates[0], restaurant.coordinates[1]]}
                eventHandlers={{
                    click: (e) => openRestaurantModal(restaurant.id)
                }}
            >
                {
                    this.isLabeled ?
                        <Tooltip ref={this.tooltipRef} direction="top" permanent>{restaurant.name}</Tooltip>
                        :
                        ""
                }

                {/* <Popup>
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
                </Popup> */}
            </Marker>
        );
    }
}

export default RestaurantMarker;
