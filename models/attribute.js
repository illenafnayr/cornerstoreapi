'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, AttributeValue }) {
      // define association here
      this.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
      this.hasMany(AttributeValue, { foreignKey: 'attributeId', as: 'attributeValue' })
    }
  };
  Attribute.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'attributes',
    modelName: 'Attribute',
    timestamps: false
  });
  return Attribute;
};