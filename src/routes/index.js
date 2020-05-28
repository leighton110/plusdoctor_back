const express = require('express');
const route = express.Router();
const login = require('./login');
const join = require('./join');
const hospital = require('./hospital');

route.use('/login', login);
route.use('/join', join);
route.use('/hospital', hospital);

module.exports = route;
