import React, { useState } from 'react';
import api from '../static/js/APIClient.js';
import StarRating from '../components/starRating.js';

const AddNote = ({ restaurantId, cancelClick }) => {
    const [dishName, setDishName] = useState('');
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleCancelClick = () => {
        setDishName('');
        setRating('');
        setBody('');
        cancelClick();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!dishName || !rating || !body) {
            setShowToast(true);
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
            //user is offline, store the form data locally
            const offlineFormData = {
                userID: user.id,
                restaurantId: restaurantId,
                dish: dishName,
                rating: parseInt(rating, 10),
                body: body,
            };

            //store the form data in local storage
            const storedFormData = JSON.parse(localStorage.getItem('offlineFormData')) || [];
            storedFormData.push(offlineFormData);
            localStorage.setItem('offlineFormData', JSON.stringify(storedFormData));
        }
        //reset the form after submission
        setDishName('');
        setRating('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
                <label className="text-gray-700 text-md font-bold">Dish:</label>
                <input type="text" placeholder="dish name" value={dishName} onChange={(e) => setDishName(e.target.value)} className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="flex gap-2 items-center">
                <label className="text-gray-700 text-md font-bold">Rating (out of 5):</label>
                <StarRating value={rating} onChange={setRating} size={6} />
            </div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="write your thoughts..." />
            {
                showToast ?
                    <div id="toast-warning" className="my-2 flex items-center w-full p-3 text-gray-500 bg-white border border-zinc-300 rounded-lg" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                            </svg>
                            <span className="sr-only">Warning icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">Please fill in dish name and star rating.</div>
                        <button onClick={() => setShowToast(false)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-warning" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    :
                    ""
            }
            <div className="flex gap-1 justify-between mt-3">
                <button onClick={handleCancelClick} type="button" className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
                <button onClick={handleSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Save Note</button>
            </div>
        </form>
    );
};

export default AddNote;