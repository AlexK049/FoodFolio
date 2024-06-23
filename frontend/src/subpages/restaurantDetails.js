import React, { useState, useEffect } from 'react';
import api from '../static/js/APIClient.js';
import StarRating from '../components/starRating.js';
import { cleanName } from '../static/js/utils.js'

function groupNotesByDish(notes) {
    const groupedNotes = {};

    notes.forEach((note) => {
        const { dish, ...restOfNote } = note;

        if (!groupedNotes[dish]) {
            groupedNotes[dish] = [];
        }

        groupedNotes[dish].push({ ...restOfNote });
    });

    return groupedNotes;
}

function avgDishRating(notes) {
    const totalRating = notes.reduce((sum, note) => sum + note.rating, 0);
    const avgRating = Math.round(totalRating / notes.length);
    return avgRating;
}

const RestaurantDetails = ({ restaurantId }) => {
    const [notes, setNotes] = useState([])
    const [restaurant, setRestaurant] = useState();
    const [avgRestDishRating, setAvgRestDishRating] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restNotes = await api.getRestaurantNotes(restaurantId);
                const rest = await api.getRestaurantbyID(restaurantId);
                rest.address = cleanName(rest.address);
                rest.city = cleanName(rest.city);
                setNotes(restNotes);
                setRestaurant(rest);
                setAvgRestDishRating(avgDishRating(restNotes));
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        if (restaurantId) {
            fetchData();
        }
    }, [restaurantId]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">{`${restaurant?.name} Menu`}</h1>
            <span className="text-gray-600 mb-1">{restaurant?.address + `, ${restaurant?.city}, ${restaurant?.state?.toUpperCase()}`}</span>
            {
                notes?.length > 0 ?
                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500">{notes?.length} ratings</div>
                        <StarRating value={avgRestDishRating} readonly />
                    </div>
                    :
                    <div className="italic text-gray-500">no ratings</div>
            }
            {
                Object.entries(groupNotesByDish(notes)).map(([dish, userNotes]) => {
                    return (
                        <div key={dish}>
                            <div>
                                <h1>{dish}</h1>
                                <StarRating value={avgDishRating(userNotes)} readonly />
                            </div>

                            <div >
                                {
                                    userNotes.map(note => {
                                        return (
                                            <div key={note.id}>{note.body}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default RestaurantDetails;
