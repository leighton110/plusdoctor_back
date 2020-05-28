const express = require('express');
const route = express.Router();
const hospitalController = require('../controllers/hospital');
const inquireBoardController = require('../controllers/inquireBoard');
//const reviewBoardController = require('../controllers/reviewBoard');
const auth = require('../controllers/auth');

route.post('/doctor', auth.authCheck, hospitalController.registerOne);
route.post('/inquire', auth.authCheck, inquireBoardController.writeOne);
route.get('/inquire/one/:id', inquireBoardController.readOne);
//route.post('/review', reviewBoardController);

module.exports = route;
