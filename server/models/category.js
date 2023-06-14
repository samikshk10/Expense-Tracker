'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User, {
        as: "UserCategoryRelation",
        foreignKey: "created_by"
      });

      Category.belongsTo(models.Expense, {
        as: "CategoryExpenseRelation",
        foreignKey: "category_id"
      });

    }
  }
  Category.init({
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false

    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};