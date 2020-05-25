const express = require('express');
const route = express.Router();
const auth = require('./auth');
const login = require('./login');
const join = require('./join');

route.use('/login', login);
route.use('/join', join);
route.use('/auth', auth);

module.exports = route;
