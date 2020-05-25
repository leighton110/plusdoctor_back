const model = require('../models');

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
