import React, { useState, useEffect } from 'react';
import styles from '../static/css/post-gallery.module.css';
import api from '../static/js/APIClient.js';
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

const RestaurantDetails = ({ restaurantId }) => {
    const [notes, setNotes] = useState([])
    const [restaurant, setRestaurant] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restNotes = await api.getRestaurantNotes(restaurantId);
                const rest = await api.getRestaurantbyID(restaurantId);
                setNotes(restNotes);
                setRestaurant(rest);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        if (restaurantId) {
            fetchData();
        }
    }, [restaurantId]);

    return (
        <div>
            <h1>{`${restaurant?.name} Menu`}</h1>
            {
                Object.entries(groupNotesByDish(notes)).map(([dish, userNotes]) => {
                    return (
                        <div className={styles.card} key={dish}>
                            <div className={styles.header}>
                                <h1>{dish}</h1>
                                <StarRating value={avgDishRating(userNotes)} readonly />
                            </div>

                            <div className={styles.body}>
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
