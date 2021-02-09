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
    static associate({ Payment }) {
      // define association here
      this.hasMany(Payment, { foreignKey: 'userId', as: 'payments' })
    }

    toJSON(){
      return { ...this.get(), id:undefined, passwd: undefined }
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
  // User.associate = (models) => {
  //       //One to many with address
  //       User.hasMany(models.Address, {
  //           foreignKey: 'user_id'
  //       });
  //       //One to many with phoneNumber
  //       User.hasMany(models.PhoneNumber, {
  //           foreignKey: 'user_id'
  //       });
  //       //One to many with payment
  //       User.hasMany(models.Payment, {
  //           foreignKey: 'user_id'
  //       });
  //   }
  return User;
};