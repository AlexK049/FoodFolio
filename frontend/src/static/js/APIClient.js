import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';

export default {
    getUserNotes: (id) => HTTPClient.get(`${API_BASE}/notes/${id}`),

    getUserbyID: (id) => HTTPClient.get(`${API_BASE}/users/${id}`),

    getSingleNote: (id) => HTTPClient.get(`${API_BASE}/notes/${id}`),

    getNearbyRestaurants: (sw, ne) => HTTPClient.get(`${API_BASE}/restaurants/nearby?sw=${JSON.stringify(sw)}&ne=${JSON.stringify(ne)}`),

    getRestaurantNotes: (id) => HTTPClient.get(`${API_BASE}/restaurants/${id}/notes`),
    
    getRestaurantbyID: (id) => HTTPClient.get(`${API_BASE}/restaurants/${id}`),

    newNote: (userID, restID, dish, rating, body) => {
        const value = {
            userID: userID,
            restID: restID,
            dish: dish,
            rating: rating,
            text: body
        };
        return HTTPClient.post(`${API_BASE}/notes/new`, value);
    },

    login: (username, password) => HTTPClient.post(`${API_BASE}/users/login`, { username, password }),

    signup: (firstName, lastName, username, password) => HTTPClient.post(`${API_BASE}/users/signup`, { firstname: firstName, lastname: lastName, username, password }),

    getCurrentUser: () => HTTPClient.get(`${API_BASE}/users/current`).then(sessionData => sessionData.user),

    logout: () => HTTPClient.post(`${API_BASE}/users/logout`, {}),

    editNote: (id, dish, rating, body) => {
        const value = {
            dish: dish,
            rating: rating,
            body: body
        };
        return HTTPClient.put(`${API_BASE}/notes/${id}`, value);
    },

    deleteNote: (id) => HTTPClient.delete(`${API_BASE}/notes/${id}`),
};
