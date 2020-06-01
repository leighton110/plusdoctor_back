const express = require('express');
const methodOverride = require('method-override');
const app = express();
const route = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const sequdbelize = require('./models').sequelize;
const db = require('./models');
const swaggerDoc = require('../swaggerDoc');
const subjectList = [
  '내과',
  '안과',
  '피부과',
  '정형외과',
  '이비인후과',
  '산부인과',
  '치과',
  '한의원',
  '성형외과',
  '신경외과',
  '재활의학과',
  '비뇨기과',
  '소아청소년과',
  '신경과',
  '가정의학과',
  '마취통증의학과',
  '대장항문외과',
  '정신건강의학과',
  '종합병원',
];
const timeList = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
//글쓰기
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
const init = async () => {
  await db.sequelize.sync();
  // await db.sequelize.sync({ force: true });
  // await initSubject();
  // await initReservationTime();
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use('/', route);
  app.use('/api-docs', swaggerDoc);
  // 404에러
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });

  //모든 에러처리
  app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      errMessage: err.message,
      success: false,
    });
  });
  app.listen(4000, () => {
    console.log('server is running on 4000 port');
  });
};

const initSubject = async () => {
  for (let subject of subjectList) {
    await db.Subject.findOrCreate({
      defaults: {
        title: subject,
      },
      where: {
        title: subject,
      },
    });
  }
};

const initReservationTime = async () => {
  for (let time of timeList) {
    await db.ReservationTime.findOrCreate({
      defaults: {
        time,
      },
      where: {
        time,
      },
    });
  }
};
init();
