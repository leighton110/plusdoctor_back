const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');

// route.post('/hospital', authController.hospital);
route.post('/user', authController.join);

module.exports = route;
