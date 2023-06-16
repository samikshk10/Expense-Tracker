'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Tag, {
        as: "UserTagRelation",
        foreignKey: "user_id"
      });

      User.hasMany(models.Category, {
        as: "UserCategoryRelation",
        foreignKey: "created_by"
      });
      User.hasMany(models.Expense, {
        as: "UserExpenseRelation",
        foreignKey: "user_id"
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("user", "admin")
    },
    status: {
      type: DataTypes.ENUM("verified", "pending", "blocked")
    },
    soft_delete: {
      type: DataTypes.BOOLEAN
    },
    budget: {
      type: DataTypes.FLOAT
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};