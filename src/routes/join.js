const express = require('express');
const route = express.Router();
const joinController = require('../controllers/join');

route.post('/hospital', joinController.hospital);
route.post('/user', joinController.user);

module.exports = route;
