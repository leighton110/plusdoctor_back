const express = require('express');
const route = express.Router();
const hospitalController = require('../controllers/hospital');
const inquireBoardController = require('../controllers/inquireBoard');
//const reviewBoardController = require('../controllers/reviewBoard');
const auth = require('../controllers/auth');

route.post('/doctor', auth.authCheck, hospitalController.registerDoctor);
route.post('/inquire', auth.authCheck, inquireBoardController.writeOne);
route.get('/inquire/one/:id', inquireBoardController.readOne);
// route.get('/inquire/one/:id', (req, res, next) => {
//     try {
//             const id = req.params.id;
//             const getInquireBoard = await model.InquireBoard.findOne({
//                 where: { id },
//             });
//             res.json({ result: getInquireBoard });
//         } catch (err) {
//             next(err);
//         }
// });
//route.post('/review', reviewBoardController);
route.get('/reservation', hospitalController.checkReservation);

module.exports = route;
