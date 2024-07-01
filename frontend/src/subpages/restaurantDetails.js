import React, { useState, useEffect } from 'react';
import StarRating from '../components/starRating.js';

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

const RestaurantDetails = ({ restaurantInfo }) => {
    const { restaurant, notes } = restaurantInfo || {};
    const [avgRestDishRating, setAvgRestDishRating] = useState();

    useEffect(() => {
        if (restaurantInfo) {
            setAvgRestDishRating(avgDishRating(notes));
        }
    }, [restaurantInfo]);

    return (
        <div>
            <span className="text-gray-600 mb-1">{restaurant?.address + `, ${restaurant?.city}, ${restaurant?.state?.toUpperCase()}`}</span>
            {
                notes?.length > 0 ?
                    <div className="flex items-center space-x-2">
                        <StarRating size={5} value={avgRestDishRating} readonly />
                        <div className="text-sm text-gray-500">{`(${notes?.length} ${notes?.length == 1 ? "rating" : "ratings"})`}</div>
                    </div>
                    :
                    <div className="italic text-gray-500">no ratings</div>
            }
            <h2 className="text-xl font-bold mt-2">Menu</h2>
            {
                notes?.length > 0 ?
                    Object.entries(groupNotesByDish(notes)).map(([dish, userNotes]) => {
                        return (
                            <div key={dish}>
                                <div className="flex items-center gap-2">
                                    <h1 className="mt-1">{dish}</h1>
                                    <StarRating size={5} value={avgDishRating(userNotes)} readonly />
                                </div>

                                <div>
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
                    :
                    <div className="italic text-gray-500">no dishes reported by customers</div>
            }
        </div>
    );
};

export default RestaurantDetails;
