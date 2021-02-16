'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Attribute, OrderDetail }) {
      // define association here
      this.belongsTo(Category, {foreignKey: 'categoryId', as: 'category'})
      this.hasMany(Attribute, { foreignKey: 'productId'})
      // this.belongsTo(OrderDetail, {foreignKey: 'productId'})
    }
    toJSON(){
      return { ...this.get(), categoryId:undefined, id:undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  Product.init({
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
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
  });
  return Product;
};