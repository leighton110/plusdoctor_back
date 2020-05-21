// const model = require('../models');

const hospital = async (req, res, next) => {
  try {
    console.log('병원 로그인요청을 받았습니다.');
    const { username, pwd } = req.body;
    console.log(username, pwd);
    res.status(200).json({ username });
  } catch (error) {
    console.log(error);
  }
};
const user = async (req, res, next) => {
  try {
    console.log('유저 로그인요청을 받았습니다.');
    const { username, pwd } = req.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hospital,
  user,
};
