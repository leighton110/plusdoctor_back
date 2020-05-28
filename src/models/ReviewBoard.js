module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'review_board',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
};
