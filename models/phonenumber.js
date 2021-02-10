'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }
  };
  PhoneNumber.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    areaCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'areacode field must be provided'
        },
        notEmpty: {
          msg: 'areacode field must not be empty'
        }
      }
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'number field must be provided'
        },
        notEmpty: {
          msg: 'number field must not be empty'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, 
  {
    sequelize,
    tableName: 'phone_numbers',
    modelName: 'PhoneNumber',
  });
  return PhoneNumber;
};