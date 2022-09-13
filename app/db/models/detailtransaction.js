"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // DetailTransaction.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  DetailTransaction.init(
    {
      transactionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      titleBook: DataTypes.STRING,
      imageBook: DataTypes.TEXT,
      priceBook: DataTypes.INTEGER,
      quantityBook: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailTransaction",
    }
  );
  return DetailTransaction;
};
