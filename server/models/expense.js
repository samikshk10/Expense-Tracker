'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User, {
        as: "UserExpensesRelation",
        foreignKey: "user_id"
      });

      Expense.hasMany(models.Category, {
        as: "CategoryExpenseRelation",
        foreignKey: "category_id"

      })
    }
  }
  Expense.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expensesDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    soft_delete: {
      type: DataTypes.BOOLEAN,
    },
    archived: {
      type: DataTypes.BOOLEAN
    }

  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};