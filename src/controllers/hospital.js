const model = require('../models');

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

module.exports = { registerDoctor };
