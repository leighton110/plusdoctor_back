const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV];
// const board = require("./Board");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// const Board = require("./Board")(sequelize, Sequelize);
const User = require('./User')(sequelize, Sequelize);

// db.Board = Board;
db.User = User;

// User.hasMany(Board, { foreignKey: 'author', sourceKey: 'id' });
// Board.belongsTo(User, { foreignKey: 'author', targetKey: 'id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
