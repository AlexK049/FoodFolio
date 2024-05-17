const express = require('express');
const routes = express.Router();

const noteRouter = require('./noteAPI');
routes.use("/notes", noteRouter);

const userRouter = require('./userAPI');
routes.use("/users", userRouter);

const restRouter = require('./restaurantAPI');
routes.use("/restaurants", restRouter);

module.exports = routes;