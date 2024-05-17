import React, { useState, useEffect } from 'react';
import styles from '../static/css/post-gallery.module.css';
import api from '../static/js/APIClient.js';

const NoteGallery = ({ notes }) => {
    const [restaurantNames, setRestaurantNames] = useState({});
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        // Fetch restaurant names for all unique restIDs
        const uniqueRestIDs = Array.from(new Set(notes.map((n) => n.note_restID)));
        const uniqueUserIDs = Array.from(new Set(notes.map((n) => n.note_userID)));

        const fetchRestaurantNames = async () => {
            const names = {};
            for (const restID of uniqueRestIDs) {
                const rest = await api.getRestaurantbyID(restID);
                names[restID] = rest.name;
            }
            setRestaurantNames(names);
        };
        const fetchUserNames = async () => {
            const usernames = {};
            for (const userID of uniqueUserIDs) {
                const user = await api.getUserbyID(userID);
                console.log(user);
                usernames[userID] = user.username;
            }
            setUserNames(usernames);
        };

        fetchRestaurantNames();
        fetchUserNames();
    }, [notes]);

    const Note = ({ userID, restID, dish, rating, body }) => {
        const restName = restaurantNames[restID] || 'Loading...';
        const username = userNames[userID] || 'Loading...';

        return (
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.user}>@{username}</h1>
                    <h3 className={styles.vendor}>{restName}</h3>
                    <h2 className={styles.dish}>{dish}</h2>
                    <h5 className={styles.rating}>{rating}/5</h5>
                </div>
                <p className={styles.body}>{body}</p>
            </div>
        );
    };

    return (
        <div className={styles.gallery}>
            {notes.map((n) => (
                <Note key={n.note_id} userID={n.note_userID} restID={n.note_restID} dish={n.note_dish} rating={n.note_rating} body={n.note_body} />
            ))}
        </div>
    );
};

export default NoteGallery;
