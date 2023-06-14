'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Tag.belongsTo(models.User, {
        as: "TagUserRelation",
        foreignKey: "user_id"
      });
      Tag.hasMany(models.ExpensesTag, {
        as: "TagExpensesTagRelation",
        foreignKey: "tag_id"
      })
    }
  }
  Tag.init({
    tag_title: DataTypes.STRING,
    color: DataTypes.STRING,
    archived: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};