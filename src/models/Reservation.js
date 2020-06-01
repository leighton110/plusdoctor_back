module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reservation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      symptom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      date: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('T', 'P', 'F'),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
};
