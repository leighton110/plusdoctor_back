const model = require('../models');
const bcrypt = require('bcryptjs');

const passwordToHash = async (password) => {
  const genSalt = bcrypt.genSaltSync(10);
  const hashPassowrd = bcrypt.hash(password, genSalt);
  return hashPassowrd;
};

const user = async (req, res, next) => {
  try {
    const { username, password, name, phone, address, gender, age } = req.body;
    const hashedPassword = await passwordToHash(password);
    await model.User.create({
      username,
      password: hashedPassword,
      name,
      phone,
      address,
      gender,
      age,
    });
    res.json({ result: '회원가입성공' });
  } catch (err) {
    next(err);
  }
};

const hospital = async (req, res, next) => {
  try {
    const { username, password, title, address, phone, operation_time } = req.body;
    const hashedPassword = await passwordToHash(password);
    await model.Hospital.create({
      username,
      password: hashedPassword,
      title,
      address,
      phone,
      operation_time,
    });
    res.json({ result: '회원가입성공' });
  } catch (err) {
    next(err);
  }
};

const duplicateCheck = async (req, res, next) => {
  try {
    const { username } = req.body;
    const findUser = await model.User.findOne({
      where: { username },
    });
    if (!findUser) {
      res.json({ result: '사용가능한 아이디입니다.' });
    } else {
      res.json({ result: '중복된 아이디입니다.' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { user, hospital, duplicateCheck };
