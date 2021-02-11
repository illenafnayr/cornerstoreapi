'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributeValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Attribute }) {
      // define association here
      this.belongsTo(Attribute, { foreignKey: 'attributeId', as: 'attributeValues'})
    }
    toJSON(){
      return { ...this.get(), id: undefined, attributeId: undefined, createdAt: undefined, updatedAt: undefined }
    }
  };
  AttributeValue.init({
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
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price field must be provided'
        },
        notEmpty: {
          msg: 'price field must not be empty'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'qty field must be provided'
        },
        notEmpty: {
          msg: 'qty field must not be empty'
        }
      }
    }
  }, 
  {
    sequelize,
    tableName: 'attribute_values',
    modelName: 'AttributeValue',
  });
  return AttributeValue;
};