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
      this.hasMany(Product, {foreignKey: 'categoryId'})
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
    },
    imgsrc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'imgsrc field must be provided'
        },
        notEmpty: {
          msg: 'imgsrc field must not be empty'
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