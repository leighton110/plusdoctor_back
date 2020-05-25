const express = require('express');
const route = express.Router();
const loginController = require('../controllers/login');

route.post('/hospital', loginController.hospital);
route.post('/user', loginController.user);

module.exports = route;
