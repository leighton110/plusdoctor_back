const model = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const passwordToHash = async (password) => {
  const genSalt = bcrypt.genSaltSync(10);
  const hashPassowrd = bcrypt.hash(password, genSalt);
  return hashPassowrd;
};

const join = async (req, res, next) => {
  try {
    const { username, password, name, phone, address, gender, age } = req.body;
    const hashedPassword = await passwordToHash(password);
    // await model.User.create({
    //   ...req.body,
    //   password: hashedPassword,
    // });
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

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findUser = await model.User.findOne({
      where: { username },
    });
    if (!findUser) {
      //아이디없음
    }
    if (bcrypt.compareSync(password, findUser.password)) {
      //여기서부터 jwt로 토큰만들기
      const options = {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 30,
      };

      const payload = {
        iss: 'myDomain',
        username,
        name: findUser.name,
      };
      const token = await jwt.sign(payload, config.jwtSecretKey, options);
      res.cookie('Authorization', `Bearer ${token}`);
      // res.cookie("Authorization","Bearer" + token)
      res.status(200).json({
        result: '로그인 성공',
      });
    } else {
      res.json({ result: '비밀번호 틀렸어' });
    }
  } catch (err) {}
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
  } catch (err) {}
};

const authCheck = async (req, res, next) => {
  const authHeader = req.cookies['Authorization'];
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const { username } = jwt.verify(token, config.jwtSecretKey);
    const findUser = await model.User.findOne({
      where: { username },
    });
    if (findUser) {
      req.findUserId = findUser.id;
      next();
    } else {
      res.json({ result: '해당 아이디가 없습니다.' });
    }
  } else {
    res.json({ result: '로그인을 해주세요' });
  }
};

module.exports = {
  login,
  join,
  duplicateCheck,
  authCheck,
};
