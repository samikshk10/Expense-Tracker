'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Income.init({
    income_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    income_note: {
      type: DataTypes.STRING,
      allowNull: false
    },
    income_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    income_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    income_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};