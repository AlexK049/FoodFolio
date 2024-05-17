import React, { useEffect, useState } from 'react';
import api from '../static/js/APIClient.js';
import NoteGallery from '../components/noteGallery';

export const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await api.getCurrentUser();
        const userNotes = await api.getUserNotes(user.id);
        setNotes(userNotes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="header">My Notes</div>
      <NoteGallery notes={notes} />
    </div>
  );
};

export default Notes;
