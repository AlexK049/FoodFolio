const express = require('express');
const db = require('./db/DBConnection')
const Note = require('./constructors/Note');
const noteRouter = express.Router();
const cookieParser = require('cookie-parser');
const { getRestaurantName } = require('./utils/restaurantUtils')
noteRouter.use(cookieParser());
noteRouter.use(express.json());
const { TokenMiddleware } = require('./middleware/TokenMiddleware');

//Get notes for user
noteRouter.get('/:userID', TokenMiddleware, (req, res) => {
    const user = req.user;
    db.query('SELECT * FROM note WHERE note_userID=?', [user.id])
        .then(({ results }) => {
            const formattedResults = results.map(noteData => {
                return new Note({ ...noteData, restName: getRestaurantName(noteData.note_restID) }).toJSON()
            });
            res.json(formattedResults);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error fetching notes");
        });
});

//Get individual note
noteRouter.get('/:noteID', TokenMiddleware, (req, res) => {
    db.query('SELECT * FROM note WHERE note_id=?', [req.params.noteID])
        .then(({ results }) => {
            if (results.length > 0) {
                const note = new Note(results[0]);
                res.json(note.toJSON());
            } else {
                res.status(404).send("Note not found");
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error fetching note");
        });
});

//Create new note
noteRouter.post('/new', TokenMiddleware, (req, res) => {
    db.query('INSERT INTO note (note_userID, note_restID, note_dish, note_rating, note_body) VALUES (?, ?, ?, ?, ?)',
        [req.body.userID, req.body.restID, req.body.dish, req.body.rating, req.body.text],
        (error) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error creating new note");
            }
            console.log("hi")
            res.status(201).send("Note created successfully");
        });
});

//Edit note
noteRouter.put('/:noteID', TokenMiddleware, (req, res) => {
    db.query('UPDATE note SET note_dish=?, note_rating=?, note_body=? WHERE note_id=?',
        [req.body.dish], [req.body.rating], [req.body.body], [req.body.id],
        (error) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Error updating note");
            }
            res.status(200).send("Note updated successfully");
        });
});

//Delete note
noteRouter.delete('/:noteID', TokenMiddleware, (req, res) => {
    db.query('DELETE FROM note WHERE note_id=?',
        [req.params.noteID],
        (error) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Error deleting note");
            }
            res.status(200).send("Note deleted successfully");
        });
});

module.exports = noteRouter;