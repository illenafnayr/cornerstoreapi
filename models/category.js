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
    static associate({ Product }) {
      // define association here
      this.belongsToMany(Product, {through: 'productId'} )
    }
  };
  Category.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name field must be provided'
        },
        notEmpty: {
          msg: 'name field must not be empty'
        }
      }
    }
  }, 
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: false
  });
  return Category;
};