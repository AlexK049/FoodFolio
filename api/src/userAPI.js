const crypto = require('crypto');
const express = require('express');
const db = require('./db/DBConnection')
const User = require('./constructors/User');
const cookieParser = require('cookie-parser');

const userRouter = express.Router();

userRouter.use(cookieParser());
userRouter.use(express.json());

const { TokenMiddleware, generateToken, removeToken } = require('./middleware/TokenMiddleware');

/* USER ROUTES */
userRouter.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        db.query('SELECT * FROM user WHERE user_username=?', [req.body.username]).then(({ results }) => {
            const user = results && results.length > 0 ? new User(results[0]) : undefined;
            if (user) { // we found our user
                crypto.pbkdf2(req.body.password, user.salt, 100000, 64, 'sha256', (err, derivedKey) => {
                    if (err) { //problem computing digest, like hash function not available
                        reject({ code: 400, message: "Error: " + err });
                    }

                    const digest = derivedKey.toString('hex');
                    if (user.password == digest) {
                        generateToken(req, res, user);
                        res.status(200).json(user);
                    }
                    else {
                        res.status(401).json({ error: "not authenticated" });
                    }
                });
            }
            else { // if no user with provided username
                res.status(401).json({ error: "not authenticated" });
            }
        });
    }
    else {
        res.status(401).json({ error: "not authenticated" });
    }
});

userRouter.post('/logout', (req, res) => {
    removeToken(req, res);
    res.status(200);
});

userRouter.post('/signup', (req, res) => {
    //method that will include salt generation, hashing and storage of user
    const salt = crypto.randomBytes(128).toString('base64');
    crypto.pbkdf2(req.body.password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
        db.query('INSERT INTO user (user_username, user_firstname, user_lastname, user_passwordhash, user_salt) VALUES (?, ?, ?, ?, ?)',
            [req.body.username, req.body.firstname, req.body.lastname, derivedKey.toString('hex'), salt]).then(({ err }) => {
            if (err) {
                res.status(400).json({ msg: "failed to sign up user" });
            } else {
                res.status(200).json({ msg: "user sign up success" });
            }
        });
    });
});

userRouter.get('/current', TokenMiddleware, (req, res) => {
    return res.status(200).json({ user: req.user });
});

userRouter.get('/:userID', TokenMiddleware, (req, res) => {
    db.query('SELECT * FROM user WHERE user_id=?', [req.params.userID]).then(({results}) => {
        res.json(new User(results[0]));
    });
});

module.exports = userRouter;
