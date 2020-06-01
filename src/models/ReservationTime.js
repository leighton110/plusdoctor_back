module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reservation_time',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      time: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
    },
  );
};
