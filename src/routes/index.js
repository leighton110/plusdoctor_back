const express = require('express');
const route = express.Router();
const login = require('./login');
const join = require('./join');

route.use('/login', login);
route.use('/join', join);

module.exports = route;
