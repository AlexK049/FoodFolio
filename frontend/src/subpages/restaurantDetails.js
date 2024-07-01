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

    const dishes = [];
    Object.entries(groupedNotes).forEach(([dish, notes]) => {
        dishes.push({ dish: dish, avgRating: avgDishRating(notes) })
    });

    dishes.sort((a, b) => a.avgRating - b.avgRating);

    return dishes;
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
                    <ol className="mt-2 ">
                        {groupNotesByDish(notes).map((x, i) => (
                            <li key={x.dish} className="flex items-center gap-2 border-2 border-zinc-200 p-2 rounded mb-1">
                                <span className="relative z-10 mr-2.5 flex h-[26px] w-full max-w-[26px] items-center justify-center rounded text-base text-zinc-800 font-bold">
                                    <span className="border-4 border-orange-200 absolute top-0 left-0 z-[-1] h-full w-full -rotate-45 rounded"></span>
                                    {i + 1}
                                </span>
                                <div className="mt-1 font-medium">{x.dish}</div>
                                <StarRating size={5} value={x.avgRating} readonly />
                            </li>
                        ))}
                    </ol>
                    :
                    <div className="italic text-gray-500">no dishes reported by customers</div>
            }
        </div>
    );
};

export default RestaurantDetails;
