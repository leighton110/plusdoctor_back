const model = require('../models');
const moment = require('moment');

const reservation = async (req, res, next) => {
  try {
    const { reservationDate, hospitalId } = req.body;
    const findHospital = await model.Hospital.findOne({
      where: { id: hospitalId },
    });
    const operationTimes = findHospital.operation_time.split(';');
    const date = moment(reservationDate);
    const dow = date.day();
    const operationTime = operationTimes[dow].split('~');
    const startDate = moment(reservationDate).set({ hour: operationTime[0], minute: 00 });
    const endDate = moment(reservationDate).set({ hour: operationTime[1], minutes: 00 });

    // const dateTime = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
    // console.log(dateTime);

    // console.log(startDate + ', ' + endDate);
    // console.log('시간 차이1: ', moment.duration(startDate.diff(date)).asHours());
    // console.log('시간 차이2: ', moment.duration(endDate.diff(date)).asHours());
    if (
      moment.duration(startDate.diff(date)).asHours() <= 0 &&
      moment.duration(endDate.diff(date)).asHours() > 0
    ) {
      //영업가능
      const availableDoctor = await model.Reservation.findAll({
        where: { 'model.Doctor.hospitalId': hospitalId },
        include: [{ model: model.Doctor }],
      });
      console.log(JSON.stringify(availableDoctor));
      console.log('영업가능');
    } else {
      console.log('영업불가능');
      //영업 불가능
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  reservation,
};
