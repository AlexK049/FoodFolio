import React, { useState } from 'react';
import api from '../static/js/APIClient.js';
import StarRating from '../components/starRating.js';

const AddNote = ({ restaurantId }) => {
    const [dishName, setDishName] = useState('');
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!dishName || !rating || !body) {
            alert('Please fill in all fields');
            return;
        }
        const user = await api.getCurrentUser();
        if (navigator.onLine) {
            api.newNote(
                user.id,
                restaurantId,
                dishName,
                parseInt(rating, 10),
                body,
            );
        } else {
            // User is offline, store the form data locally
            const offlineFormData = {
                userID: user.id,
                restaurantId: restaurantId,
                dish: dishName,
                rating: parseInt(rating, 10),
                body: body,
            };

            // Store the form data in local storage
            const storedFormData = JSON.parse(localStorage.getItem('offlineFormData')) || [];
            storedFormData.push(offlineFormData);
            localStorage.setItem('offlineFormData', JSON.stringify(storedFormData));
        }
        // Reset the form after submission
        setDishName('');
        setRating('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">
                            Dish Name:
                            <input type="text" className="form-control" value={dishName} onChange={(e) => setDishName(e.target.value)} />
                        </label>
                        <StarRating value={rating} onChange={setRating} size={4} />
                        {/* <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="privateCheckbox" />
                            <label className="form-check-label" htmlFor="privateCheckbox">
                                Private
                            </label>
                        </div> */}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">
                            Body:
                            <textarea className="form-control" value={body} onChange={(e) => setBody(e.target.value)} />
                        </label>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6 offset-md-3">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 offset-md-3">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddNote;