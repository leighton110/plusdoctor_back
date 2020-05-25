const model = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

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
  authCheck,
};
