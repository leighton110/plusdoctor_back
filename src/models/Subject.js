module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'subject',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
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
