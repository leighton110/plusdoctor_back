const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV];
// const board = require("./Board");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// const Board = require("./Board")(sequelize, Sequelize);

// db.Board = Board;
db.User = require('./User')(sequelize, Sequelize);
db.Doctor = require('./Doctor')(sequelize, Sequelize);
db.Hospital = require('./Hospital')(sequelize, Sequelize);
db.Subject = require('./Subject')(sequelize, Sequelize);

db.Hospital.hasMany(db.Doctor, { foreignKey: 'hospital', sourceKey: 'id' });
db.Subject.hasMany(db.Doctor, { foreignKey: 'subject', sourceKey: 'id' });
// Board.belongsTo(User, { foreignKey: 'author', targetKey: 'id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
