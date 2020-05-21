const express = require('express');
const route = express.Router();
const auth = require('./auth');
const login = require('./login');

route.use('/login', login);

route.use('/auth', auth);

module.exports = route;
