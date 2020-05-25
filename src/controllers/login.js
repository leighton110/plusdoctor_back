const model = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const hospital = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findHospital = await model.Hospital.findOne({
      where: { username },
    });
    if (!findHospital) {
      console.log('err');
      //아이디없음
    }
    console.log();
    if (bcrypt.compareSync(password, findHospital.password)) {
      console.log('비밀번호 같음');
      //여기서부터 jwt로 토큰만들기
      const options = {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 30,
      };

      const payload = {
        iss: 'myDomain',
        username,
        type: 'hospital',
        name: findHospital.title,
      };
      console.log(payload);
      const token = await jwt.sign(payload, config.jwtSecretKey, options);
      console.log('token' + token);
      res.cookie('Authorization', `Bearer ${token}`);
      res.status(200).json({
        result: '로그인 성공',
      });
    } else {
      res.json({ result: '비밀번호 틀렸어' });
    }
  } catch (err) {
    console.log(err);
  }
};

const user = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findUser = await model.User.findOne({
      where: { username },
    });
    if (!findUser) {
      console.log('err');
      //아이디없음
    }
    if (bcrypt.compareSync(password, findUser.password)) {
      console.log('비밀번호 같음');
      //여기서부터 jwt로 토큰만들기
      const options = {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 30,
      };

      const payload = {
        iss: 'myDomain',
        username,
        type: 'user',
        name: findUser.name,
      };
      const token = await jwt.sign(payload, config.jwtSecretKey, options);
      console.log('token' + token);
      res.cookie('Authorization', `Bearer ${token}`);
      res.status(200).json({
        result: '로그인 성공',
      });
    } else {
      res.json({ result: '비밀번호 틀렸어' });
    }
  } catch (err) {}
};

module.exports = {
  hospital,
  user,
};
