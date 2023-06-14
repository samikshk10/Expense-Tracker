'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpensesTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExpensesTag.hasMany(models.Expense, {
        as: "ExpensewithExpenseTagRelation",
        foreignKey: "expenses_id"
      });
      ExpensesTag.hasMany(models.Tag, {
        as: "TagExpensewithTagRelation",
        foreignKey: "tag_id"
      })

    }
  }
  ExpensesTag.init({
    expenses_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExpensesTag',
  });
  return ExpensesTag;
};