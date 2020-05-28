const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

db.User = require('./User')(sequelize, Sequelize);
db.Doctor = require('./Doctor')(sequelize, Sequelize);
db.Hospital = require('./Hospital')(sequelize, Sequelize);
db.Subject = require('./Subject')(sequelize, Sequelize);
db.InquireBoard = require('./InquireBoard')(sequelize, Sequelize);
db.ReviewBoard = require('./ReviewBoard')(sequelize, Sequelize);

db.Hospital.hasMany(db.Doctor, { foreignKey: 'hospital', sourceKey: 'id' });
db.Subject.hasMany(db.Doctor, { foreignKey: 'subject', sourceKey: 'id' });
db.Hospital.hasMany(db.InquireBoard, { foreignKey: 'hospital', sourceKey: 'id' });
db.Hospital.hasMany(db.ReviewBoard, { foreignKey: 'hospital', sourceKey: 'id' });
db.User.hasMany(db.InquireBoard, { foreignKey: 'author', sourceKey: 'id' });
db.User.hasMany(db.ReviewBoard, { foreignKey: 'author', sourceKey: 'id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
