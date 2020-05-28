const model = require('../models');

const writeOne = async (req, res, next) => {
  try {
    const { title, content, hospitalId } = req.body;
    const findUserId = req.findUserId;
    const userType = req.userType;
    if (userType !== 'user') {
      const err = new Error('사용자가 아닙니다');
      next(err);
    }
    const author = findUserId;
    const createInquireBoard = await model.InquireBoard.create({
      title,
      content,
      hospital: hospitalId,
      author,
    });
    res.json({ result: createInquireBoard });
  } catch (err) {
    next(err);
  }
};

const readOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getInquireBoard = await model.InquireBoard.findOne({
      where: { id },
    });
    res.json({ result: getInquireBoard });
  } catch (err) {
    next(err);
  }
};

module.exports = { writeOne, readOne };
