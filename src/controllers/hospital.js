const model = require('../models');
const moment = require('moment');

const registerDoctor = async (req, res, next) => {
  try {
    const { name, phone, subjectTitle } = req.body;
    const findUserId = req.findUserId;
    const userType = req.userType;
    if (userType !== 'hospital') {
      const err = new Error('잘못된 접근입니다.');
      next(err);
    }
    const subject = await model.Subject.findOne({
      where: { title: subjectTitle },
    });
    const createDoctor = await model.Doctor.create({
      name,
      phone,
      hospital: findUserId,
      subject: subject.id,
    });
    res.json({ result: createDoctor });
  } catch (err) {
    next(err);
  }
};

const checkReservation = async (req, res, next) => {
  try {
    const { reservationDate, hospitalId } = req.query;
    console.log(reservationDate);
    console.log(hospitalId);
    const findHospital = await model.Hospital.findOne({
      where: { id: hospitalId },
    });
    const operationTimes = findHospital.operation_time.split(';');
    const date = moment(reservationDate);
    const dow = date.day();
    const operationTime = operationTimes[dow].split('~');
    const startDate = moment(reservationDate).set({ hour: operationTime[0], minute: 00 });
    const endDate = moment(reservationDate).set({ hour: operationTime[1], minutes: 00 });

    if (
      moment.duration(startDate.diff(date)).asHours() <= 0 &&
      moment.duration(endDate.diff(date)).asHours() > 0
    ) {
      const findDoctors = await getAllDoctors(hospitalId);
      const findReservations = await getReservations(findDoctors);
      let doctorsId = findDoctors.map((v) => {
        return v.id;
      });
      findReservations.forEach((reservation) => {
        const reservationTime = moment(reservation.date).isSame(date);
        const checkStatus = reservation.status !== 'T' ? false : true;
        if (reservationTime && checkStatus) {
          doctorsId = doctorsId.filter((doctorId) => {
            return doctorId !== reservation.doctor;
          });
        }
      });
      const availableDoctors = await getDoctorsDetail(doctorsId);
      res.status(200).json({ result: availableDoctors });
      return availableDoctors;
    } else {
      res.json({ result: '영업시간이 아닙니다' });
    }
  } catch (err) {
    next(err);
  }
};

const getDoctorsDetail = (doctors) => {
  return new Promise((resolve, reject) => {
    const doctorList = [];
    doctors.forEach((id, k) => {
      model.Doctor.findOne({
        where: { id },
        include: ['Subject'],
      }).then((doctor) => {
        doctorList.push({
          id: doctor.id,
          name: doctor.name,
          phone: doctor.phone,
          hospital: doctor.hospital,
          subjectName: doctor.Subject.title,
        });
        if (doctors.length === k + 1) {
          resolve(doctorList);
        }
      });
    });
  });
};

const getReservations = (doctors) => {
  return new Promise((resolve, reject) => {
    const reservationsList = [];
    doctors.forEach((v, k) => {
      model.Reservation.findAll({
        where: { doctor: v.id },
      }).then((reservations) => {
        reservations.forEach((val) => {
          reservationsList.push({
            id: val.id,
            date: val.date,
            status: val.status,
            doctor: val.doctor,
          });
        });
        if (doctors.length === k + 1) {
          resolve(reservationsList);
        }
      });
    });
  });
};

const getAllDoctors = async (hospitalId) => {
  const getDoctors = await model.Doctor.findAll({
    where: { hospital: hospitalId },
  });
  return getDoctors;
};

module.exports = { registerDoctor, checkReservation };
