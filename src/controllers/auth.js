const model = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const jwtCheck = async (req, res, next) => {
  const authHeader = req.cookies['Authorization'];
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const { type, username } = jwt.verify(token, config.jwtSecretKey);
    return { userType: type, username };
  } else {
    return { userType: null, username: null };
  }
};

const authCheck = async (req, res, next) => {
  const { userType, username } = await jwtCheck(req, res, next);
  let findUser;
  if (userType === 'user') {
    findUser = await model.User.findOne({
      where: { username },
    });
  } else if (userType === 'hospital') {
    findUser = await model.Hospital.findOne({
      where: { username },
    });
  } else {
    res.json({ result: '로그인을 해주세요' });
  }

  if (findUser) {
    req.findUserId = findUser.id;
    req.userType = userType;
    next();
  } else {
    res.json({ result: '해당 아이디가 없습니다.' });
  }
};

module.exports = {
  authCheck,
};
