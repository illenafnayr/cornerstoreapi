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
    static associate({ Payment, Address, PhoneNumber }) {
      // define association here
      this.hasMany(Payment, { foreignKey: 'userId', as: 'payments' })
      this.hasMany(Address, { foreignKey: 'userId', as: 'addresses' })
      this.hasMany(PhoneNumber, { foreignKey: 'userId', as: 'phonenumbers' })
    }

    toJSON(){
      return { ...this.get(), id:undefined }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'email field must be provided'
          },
          notEmpty: {
            msg: 'email field must not be empty'
          }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'email field must be provided'
          },
          notEmpty: {
            msg: 'email field must not be empty'
          }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'email field must be provided'
          },
          notEmpty: {
            msg: 'email field must not be empty'
          },
          isEmail: {
            msg: 'must be a valid email address'
          }
        }
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'password field must be provided'
          },
          notEmpty: {
            msg: 'password field must not be empty'
          }
        }
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'ip field must be provided'
          },
          notEmpty: {
            msg: 'ip field must not be empty'
          }
        }
    },
  }, 
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    // timestamps: false
  });
  return User;
};