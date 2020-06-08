const express = require('express');
const route = express.Router();
const loginController = require('../controllers/login');

//hospital 로그인
route.post('/hospital', loginController.hospital);

//user 로그인
route.post('/user', loginController.user);

module.exports = route;
