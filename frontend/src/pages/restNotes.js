import React, { useEffect, useState } from 'react';
import api from '../static/js/APIClient.js';
import NoteGallery from '../components/noteGallery';
import "../static/css/notes.css";

export const restNotes = (restID) => {
  const [notes, setNotes] = useState([]);
  const [restaurantName, setRestaurantName] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const restNotes = await api.getRestaurantNotes(restID);
        const rest = await api.getRestaurant(restID);
        const restName = rest.name;
        setNotes(restNotes);
        setRestaurantName(restName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='header'>{restaurantName} Notes</div>
      <NoteGallery notes={notes} />
    </div>
  );
};

export default restNotes;